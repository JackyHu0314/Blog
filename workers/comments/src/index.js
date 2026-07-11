const MAX_ARTICLE_ID_LENGTH = 80
const MAX_NICKNAME_LENGTH = 30
const MAX_CONTENT_LENGTH = 500
const MAX_REQUEST_BODY_BYTES = 16 * 1024
const RATE_LIMIT_WINDOW_SECONDS = 60
const RATE_LIMIT_MAX_COMMENTS = 3
const SITEVERIFY_TIMEOUT_MS = 5000
const TURNSTILE_ACTION = 'comment'

const DEFAULT_ALLOWED_ORIGINS = [
  'https://www.jackyhu.top',
  'https://jackyhu.top',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]

const DEFAULT_TURNSTILE_ALLOWED_HOSTNAMES = [
  'www.jackyhu.top',
  'jackyhu.top',
  'localhost',
  '127.0.0.1',
]

export default {
  async fetch(request, env) {
    const corsHeaders = getCorsHeaders(request, env)

    if (request.method === 'POST' && !isRequestOriginAllowed(request, env)) {
      return json({ error: 'origin_not_allowed' }, 403, corsHeaders)
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders })
    }

    try {
      const url = new URL(request.url)

      if (url.pathname === '/health' && request.method === 'GET') {
        return await healthCheck(env, corsHeaders)
      }

      if (url.pathname === '/comments' && request.method === 'GET') {
        return await listComments(url, env, corsHeaders)
      }

      if (url.pathname === '/comments' && request.method === 'POST') {
        return await createComment(request, env, corsHeaders)
      }

      if (url.pathname === '/admin/comments' && request.method === 'GET') {
        return await listAdminComments(request, url, env, corsHeaders)
      }

      const approveMatch = url.pathname.match(/^\/admin\/comments\/([^/]+)\/approve$/)
      if (approveMatch && request.method === 'POST') {
        return await updateCommentStatus(request, env, corsHeaders, approveMatch[1], 'approved')
      }

      const rejectMatch = url.pathname.match(/^\/admin\/comments\/([^/]+)\/reject$/)
      if (rejectMatch && request.method === 'POST') {
        return await updateCommentStatus(request, env, corsHeaders, rejectMatch[1], 'rejected')
      }

      const deleteMatch = url.pathname.match(/^\/admin\/comments\/([^/]+)$/)
      if (deleteMatch && request.method === 'DELETE') {
        return await deleteComment(request, env, corsHeaders, deleteMatch[1])
      }

      return json({ error: 'not_found' }, 404, corsHeaders)
    } catch (error) {
      console.error(JSON.stringify({
        message: 'comments_worker_error',
        error: error instanceof Error ? error.message : String(error),
      }))
      return json({ error: 'internal_error' }, 500, corsHeaders)
    }
  },
}

async function healthCheck(env, corsHeaders) {
  const checks = {
    database: Boolean(env.DB?.prepare),
    turnstile: env.DISABLE_TURNSTILE === 'true' || Boolean(env.TURNSTILE_SECRET_KEY),
    turnstileHostnames: env.DISABLE_TURNSTILE === 'true' || parseAllowedHostnames(env.TURNSTILE_ALLOWED_HOSTNAMES).length > 0,
    ipHashSalt: Boolean(env.IP_HASH_SALT),
    admin: env.COMMENTS_REQUIRE_APPROVAL === 'false' || Boolean(env.ADMIN_TOKEN),
  }

  if (checks.database) {
    try {
      await env.DB.prepare(`
        SELECT id, article_id, nickname, content, status, ip_hash, user_agent, created_at, updated_at
        FROM comments
        LIMIT 1
      `).first()
      checks.database = true
    } catch (error) {
      checks.database = false
      console.error(JSON.stringify({
        message: 'comments_health_db_error',
        error: error instanceof Error ? error.message : String(error),
      }))
    }
  }

  const ok = Object.values(checks).every(Boolean)
  return json({ ok, checks }, ok ? 200 : 503, corsHeaders)
}

async function listComments(url, env, corsHeaders) {
  const articleId = normalizeArticleId(url.searchParams.get('articleId'))

  if (!articleId) {
    return json({ error: 'invalid_article_id' }, 400, corsHeaders)
  }

  const { results } = await env.DB.prepare(`
    SELECT id, article_id AS articleId, nickname, content, created_at AS createdAt
    FROM comments
    WHERE article_id = ? AND status = 'approved'
    ORDER BY created_at ASC
    LIMIT 100
  `).bind(articleId).all()

  return json({ comments: results ?? [] }, 200, corsHeaders)
}

async function createComment(request, env, corsHeaders) {
  const bodyResult = await readJson(request)

  if (!bodyResult.ok) {
    return json({ error: bodyResult.error }, bodyResult.status, corsHeaders)
  }

  const body = bodyResult.value
  const articleId = normalizeArticleId(body.articleId)
  const nickname = normalizeText(body.nickname, MAX_NICKNAME_LENGTH)
  const content = normalizeText(body.content, MAX_CONTENT_LENGTH)
  const turnstileToken = normalizeText(body.turnstileToken, 2048)

  if (!articleId || !nickname || !content) {
    return json({ error: 'invalid_payload' }, 400, corsHeaders)
  }

  if (content.length < 2) {
    return json({ error: 'content_too_short' }, 400, corsHeaders)
  }

  if (!env.IP_HASH_SALT) {
    return json({ error: 'service_unavailable' }, 503, corsHeaders)
  }

  if (env.DISABLE_TURNSTILE !== 'true') {
    const turnstileResult = await verifyTurnstile(turnstileToken, request, env)
    if (!turnstileResult.success) {
      return json({ error: 'turnstile_failed' }, 400, corsHeaders)
    }
  }

  const ipHash = await hashValue(getClientIp(request), env.IP_HASH_SALT)
  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  const rateLimitSince = new Date(Date.now() - RATE_LIMIT_WINDOW_SECONDS * 1000).toISOString()
  const status = env.COMMENTS_REQUIRE_APPROVAL === 'false' ? 'approved' : 'pending'
  const userAgent = normalizeText(request.headers.get('User-Agent') ?? '', 200)

  const insertResult = await env.DB.prepare(`
    INSERT INTO comments (
      id, article_id, nickname, content, status, ip_hash, user_agent, created_at, updated_at
    )
    SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?
    WHERE ? = '' OR (
      SELECT COUNT(*)
      FROM comments
      WHERE ip_hash = ? AND created_at >= ?
    ) < ?
  `).bind(
    id,
    articleId,
    nickname,
    content,
    status,
    ipHash,
    userAgent,
    now,
    now,
    ipHash,
    ipHash,
    rateLimitSince,
    RATE_LIMIT_MAX_COMMENTS,
  ).run()

  if (Number(insertResult.meta?.changes ?? 0) === 0) {
    return json({ error: 'rate_limited' }, 429, corsHeaders)
  }

  const comment = status === 'approved'
    ? { id, articleId, nickname, content, createdAt: now }
    : null

  return json({ status, comment }, 201, corsHeaders)
}

async function listAdminComments(request, url, env, corsHeaders) {
  const authResult = await requireAdmin(request, env)

  if (!authResult.ok) {
    return json({ error: authResult.error }, authResult.status, corsHeaders)
  }

  const status = normalizeText(url.searchParams.get('status') ?? 'pending', 20)
  const allowedStatuses = new Set(['pending', 'approved', 'rejected'])

  if (!allowedStatuses.has(status)) {
    return json({ error: 'invalid_status' }, 400, corsHeaders)
  }

  const { results } = await env.DB.prepare(`
    SELECT id, article_id AS articleId, nickname, content, status, created_at AS createdAt
    FROM comments
    WHERE status = ?
    ORDER BY created_at DESC
    LIMIT 100
  `).bind(status).all()

  return json({ comments: results ?? [] }, 200, corsHeaders)
}

async function updateCommentStatus(request, env, corsHeaders, id, status) {
  const authResult = await requireAdmin(request, env)

  if (!authResult.ok) {
    return json({ error: authResult.error }, authResult.status, corsHeaders)
  }

  const commentId = normalizeText(id, 80)

  if (!commentId) {
    return json({ error: 'invalid_comment_id' }, 400, corsHeaders)
  }

  const now = new Date().toISOString()
  const result = await env.DB.prepare(`
    UPDATE comments
    SET status = ?, updated_at = ?
    WHERE id = ?
  `).bind(status, now, commentId).run()

  if (result.meta.changes === 0) {
    return json({ error: 'not_found' }, 404, corsHeaders)
  }

  return json({ ok: true }, 200, corsHeaders)
}

async function deleteComment(request, env, corsHeaders, id) {
  const authResult = await requireAdmin(request, env)

  if (!authResult.ok) {
    return json({ error: authResult.error }, authResult.status, corsHeaders)
  }

  const commentId = normalizeText(id, 80)

  if (!commentId) {
    return json({ error: 'invalid_comment_id' }, 400, corsHeaders)
  }

  const result = await env.DB.prepare('DELETE FROM comments WHERE id = ?').bind(commentId).run()

  if (result.meta.changes === 0) {
    return json({ error: 'not_found' }, 404, corsHeaders)
  }

  return json({ ok: true }, 200, corsHeaders)
}

async function verifyTurnstile(token, request, env) {
  if (!env.TURNSTILE_SECRET_KEY || !token) {
    return { success: false }
  }

  const formData = new FormData()
  formData.append('secret', env.TURNSTILE_SECRET_KEY)
  formData.append('response', token)

  const clientIp = getClientIp(request)
  if (clientIp) {
    formData.append('remoteip', clientIp)
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), SITEVERIFY_TIMEOUT_MS)

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    })

    if (!response.ok) {
      return { success: false }
    }

    const result = await response.json()
    const hostname = normalizeHostname(result.hostname)
    const allowedHostnames = parseAllowedHostnames(env.TURNSTILE_ALLOWED_HOSTNAMES)

    return {
      ...result,
      success: Boolean(
        result.success
        && result.action === TURNSTILE_ACTION
        && hostname
        && allowedHostnames.includes(hostname)
      ),
    }
  } catch {
    return { success: false }
  } finally {
    clearTimeout(timeoutId)
  }
}

async function requireAdmin(request, env) {
  if (!env.ADMIN_TOKEN) {
    return { ok: false, status: 503, error: 'admin_not_configured' }
  }

  const authHeader = request.headers.get('Authorization') ?? ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''

  if (!token || !(await timingSafeEqual(token, env.ADMIN_TOKEN))) {
    return { ok: false, status: 401, error: 'unauthorized' }
  }

  return { ok: true }
}

async function timingSafeEqual(value, expected) {
  const encoder = new TextEncoder()
  const valueBytes = encoder.encode(value)
  const expectedBytes = encoder.encode(expected)

  if (valueBytes.length !== expectedBytes.length) {
    return false
  }

  let diff = 0
  for (let i = 0; i < valueBytes.length; i += 1) {
    diff |= valueBytes[i] ^ expectedBytes[i]
  }

  return diff === 0
}

async function readJson(request) {
  const contentType = request.headers.get('Content-Type') ?? ''

  if (!contentType.includes('application/json')) {
    return { ok: false, status: 400, error: 'invalid_payload' }
  }

  const declaredLength = Number(request.headers.get('Content-Length'))
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BODY_BYTES) {
    return { ok: false, status: 413, error: 'payload_too_large' }
  }

  if (!request.body) {
    return { ok: false, status: 400, error: 'invalid_json' }
  }

  const reader = request.body.getReader()
  const chunks = []
  let totalBytes = 0

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    totalBytes += value.byteLength
    if (totalBytes > MAX_REQUEST_BODY_BYTES) {
      await reader.cancel()
      return { ok: false, status: 413, error: 'payload_too_large' }
    }

    chunks.push(value)
  }

  const bytes = new Uint8Array(totalBytes)
  let offset = 0
  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.byteLength
  }

  try {
    const value = JSON.parse(new TextDecoder().decode(bytes))
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return { ok: false, status: 400, error: 'invalid_payload' }
    }
    return { ok: true, value }
  } catch {
    return { ok: false, status: 400, error: 'invalid_json' }
  }
}

function isRequestOriginAllowed(request, env) {
  const origin = request.headers.get('Origin')
  return !origin || parseAllowedOrigins(env.ALLOWED_ORIGINS).includes(origin)
}

function getCorsHeaders(request, env) {
  const origin = request.headers.get('Origin') ?? ''
  const allowedOrigins = parseAllowedOrigins(env.ALLOWED_ORIGINS)
  const headers = {
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Max-Age': '86400',
  }

  if (origin && allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin
    headers.Vary = 'Origin'
  }

  return headers
}

function parseAllowedOrigins(value) {
  const configured = String(value ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  return configured.length > 0 ? configured : DEFAULT_ALLOWED_ORIGINS
}

function parseAllowedHostnames(value) {
  const configured = String(value ?? '')
    .split(',')
    .map(normalizeHostname)
    .filter(Boolean)

  return configured.length > 0 ? configured : DEFAULT_TURNSTILE_ALLOWED_HOSTNAMES
}

function normalizeHostname(value) {
  return String(value ?? '').trim().toLowerCase().replace(/\.$/, '')
}

function json(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...headers,
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

function normalizeArticleId(value) {
  const articleId = normalizeText(value, MAX_ARTICLE_ID_LENGTH)
  return articleId && /^[a-zA-Z0-9:_-]+$/.test(articleId) ? articleId : ''
}

function normalizeText(value, maxLength) {
  let normalized = ''

  for (const character of String(value ?? '')) {
    const codePoint = character.codePointAt(0)
    if ((codePoint >= 0x20 && codePoint !== 0x7f) || codePoint > 0x7f) {
      normalized += character
    }
  }

  return normalized.trim().slice(0, maxLength)
}

function getClientIp(request) {
  return request.headers.get('CF-Connecting-IP') ?? ''
}

async function hashValue(value, salt) {
  if (!value) {
    return ''
  }

  const encoder = new TextEncoder()
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(`${salt}:${value}`))
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}
