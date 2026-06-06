const MAX_ARTICLE_ID_LENGTH = 80
const MAX_NICKNAME_LENGTH = 30
const MAX_EMAIL_LENGTH = 120
const MAX_CONTENT_LENGTH = 500
const RATE_LIMIT_WINDOW_SECONDS = 60
const RATE_LIMIT_MAX_COMMENTS = 3

const DEFAULT_ALLOWED_ORIGINS = [
  'https://www.jackyhu.top',
  'https://jackyhu.top',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]

export default {
  async fetch(request, env) {
    const corsHeaders = getCorsHeaders(request, env)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders })
    }

    try {
      const url = new URL(request.url)

      if (url.pathname === '/health' && request.method === 'GET') {
        return json({ ok: true }, 200, corsHeaders)
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
  const body = await readJson(request)
  const articleId = normalizeArticleId(body.articleId)
  const nickname = normalizeText(body.nickname, MAX_NICKNAME_LENGTH)
  const email = normalizeText(body.email ?? '', MAX_EMAIL_LENGTH).toLowerCase()
  const content = normalizeText(body.content, MAX_CONTENT_LENGTH)
  const turnstileToken = normalizeText(body.turnstileToken, 2048)

  if (!articleId || !nickname || !content) {
    return json({ error: 'invalid_payload' }, 400, corsHeaders)
  }

  if (content.length < 2) {
    return json({ error: 'content_too_short' }, 400, corsHeaders)
  }

  if (env.DISABLE_TURNSTILE !== 'true') {
    const turnstileResult = await verifyTurnstile(turnstileToken, request, env)
    if (!turnstileResult.success) {
      return json({ error: 'turnstile_failed' }, 400, corsHeaders)
    }
  }

  const ipHash = await hashValue(getClientIp(request), env.IP_HASH_SALT || env.TURNSTILE_SECRET_KEY || 'local-dev')
  const limited = await isRateLimited(env, ipHash)

  if (limited) {
    return json({ error: 'rate_limited' }, 429, corsHeaders)
  }

  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  const status = env.COMMENTS_REQUIRE_APPROVAL === 'false' ? 'approved' : 'pending'
  const emailHash = email ? await hashValue(email, env.IP_HASH_SALT || env.TURNSTILE_SECRET_KEY || 'local-dev') : null
  const userAgent = normalizeText(request.headers.get('User-Agent') ?? '', 200)

  await env.DB.prepare(`
    INSERT INTO comments (
      id, article_id, nickname, email_hash, content, status, ip_hash, user_agent, created_at, updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(id, articleId, nickname, emailHash, content, status, ipHash, userAgent, now, now).run()

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

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    return { success: false }
  }

  return await response.json()
}

async function isRateLimited(env, ipHash) {
  if (!ipHash) {
    return false
  }

  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_SECONDS * 1000).toISOString()
  const row = await env.DB.prepare(`
    SELECT COUNT(*) AS count
    FROM comments
    WHERE ip_hash = ? AND created_at >= ?
  `).bind(ipHash, since).first()

  return Number(row?.count ?? 0) >= RATE_LIMIT_MAX_COMMENTS
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
    return {}
  }

  return await request.json()
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
