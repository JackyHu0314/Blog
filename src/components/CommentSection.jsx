import { useEffect, useRef, useState } from 'react'
import { commentsConfig } from '../config/comments'

let turnstileScriptPromise

function loadTurnstileScript() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('window_unavailable'))
  }

  if (window.turnstile) {
    return Promise.resolve(window.turnstile)
  }

  if (!turnstileScriptPromise) {
    turnstileScriptPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector('script[data-turnstile-script="true"]')

      if (existingScript) {
        existingScript.addEventListener('load', () => resolve(window.turnstile), { once: true })
        existingScript.addEventListener('error', reject, { once: true })
        return
      }

      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.dataset.turnstileScript = 'true'
      script.onload = () => resolve(window.turnstile)
      script.onerror = reject
      document.head.appendChild(script)
    })
  }

  return turnstileScriptPromise
}

function formatDate(value) {
  if (!value) return ''

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export default function CommentSection({ articleId }) {
  const turnstileRef = useRef(null)
  const widgetIdRef = useRef(null)
  const [comments, setComments] = useState([])
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const isConfigured = Boolean(commentsConfig.apiBaseUrl && commentsConfig.turnstileSiteKey)

  useEffect(() => {
    if (!isConfigured || !articleId) return

    const controller = new AbortController()

    async function fetchComments() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(
          `${commentsConfig.apiBaseUrl}/comments?articleId=${encodeURIComponent(articleId)}`,
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error('load_failed')
        }

        const data = await response.json()
        setComments(Array.isArray(data.comments) ? data.comments : [])
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError('评论加载失败，请稍后刷新重试。')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchComments()

    return () => controller.abort()
  }, [articleId, isConfigured])

  useEffect(() => {
    if (!isConfigured || !turnstileRef.current) return undefined

    let cancelled = false

    loadTurnstileScript()
      .then((turnstile) => {
        if (cancelled || !turnstileRef.current || widgetIdRef.current != null) return

        widgetIdRef.current = turnstile.render(turnstileRef.current, {
          sitekey: commentsConfig.turnstileSiteKey,
          callback: (token) => setTurnstileToken(token),
          'expired-callback': () => setTurnstileToken(''),
          'error-callback': () => {
            setTurnstileToken('')
            setError('验证组件加载失败，请刷新后再试。')
          },
        })
      })
      .catch(() => setError('验证组件加载失败，请检查网络后刷新。'))

    return () => {
      cancelled = true
      if (window.turnstile && widgetIdRef.current != null) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [isConfigured])

  const resetTurnstile = () => {
    setTurnstileToken('')
    if (window.turnstile && widgetIdRef.current != null) {
      window.turnstile.reset(widgetIdRef.current)
    }
  }

  const submit = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')

    const trimmedNickname = nickname.trim()
    const trimmedEmail = email.trim()
    const trimmedContent = content.trim()

    if (!trimmedNickname || !trimmedContent) {
      setError('请填写昵称和评论内容。')
      return
    }

    if (!turnstileToken) {
      setError('请先完成人机验证。')
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch(`${commentsConfig.apiBaseUrl}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleId: String(articleId),
          nickname: trimmedNickname,
          email: trimmedEmail,
          content: trimmedContent,
          turnstileToken,
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'submit_failed')
      }

      if (data.comment) {
        setComments((current) => [...current, data.comment])
        setMessage('评论已发布。')
      } else {
        setMessage('评论已提交，审核通过后会显示。')
      }

      setNickname('')
      setEmail('')
      setContent('')
      resetTurnstile()
    } catch (submitError) {
      if (submitError.message === 'rate_limited') {
        setError('提交太频繁了，请稍后再试。')
      } else if (submitError.message === 'turnstile_failed') {
        setError('人机验证失败，请重新验证。')
        resetTurnstile()
      } else {
        setError('评论提交失败，请稍后再试。')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="comment-section" aria-label="评论区">
      <h2 className="comment-title">评论</h2>

      {!isConfigured && (
        <p className="comment-empty">
          评论服务还没有配置。设置 VITE_COMMENTS_API_BASE_URL 和 VITE_TURNSTILE_SITE_KEY 后启用。
        </p>
      )}

      {isConfigured && loading && (
        <p className="comment-empty">评论加载中…</p>
      )}

      {isConfigured && !loading && comments.length === 0 && (
        <p className="comment-empty">还没有评论，来说点什么吧。</p>
      )}

      {isConfigured && comments.length > 0 && (
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <div className="comment-header">
                <span className="comment-name">{comment.nickname}</span>
                <span className="comment-date">{formatDate(comment.createdAt)}</span>
              </div>
              <p className="comment-text">{comment.content}</p>
            </li>
          ))}
        </ul>
      )}

      {isConfigured && (
        <form className="comment-form" onSubmit={submit}>
          <input
            className="comment-input"
            placeholder="你的昵称"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            maxLength={30}
          />
          <input
            className="comment-input"
            placeholder="邮箱，可选，不公开"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            maxLength={120}
            type="email"
          />
          <textarea
            className="comment-textarea"
            placeholder="写下你的想法…"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={4}
            maxLength={500}
          />
          <div className="comment-meta">
            <span>{content.length}/500</span>
            <span>评论默认需要审核后显示</span>
          </div>
          <div ref={turnstileRef} className="comment-turnstile" />
          {message && <p className="comment-message">{message}</p>}
          {error && <p className="comment-error">{error}</p>}
          <button type="submit" className="comment-submit" disabled={submitting}>
            {submitting ? '发布中…' : '发布评论'}
          </button>
        </form>
      )}

      <style>{`
        .comment-section {
          margin-top: 56px;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid var(--color-card-border);
          background: var(--color-card-bg);
        }
        .comment-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--color-text-primary);
          margin: 0 0 10px 0;
        }
        .comment-empty {
          font-size: 14px;
          color: var(--color-text-secondary);
          margin: 0 0 24px 0;
        }
        .comment-list {
          list-style: none;
          padding: 0;
          margin: 0 0 28px 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .comment-item {
          padding: 16px;
          border-radius: 10px;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-card-border);
        }
        .comment-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .comment-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-text-primary);
        }
        .comment-date {
          font-size: 12px;
          color: var(--color-text-secondary);
          flex: 1;
          text-align: right;
        }
        .comment-text {
          font-size: 14px;
          color: var(--color-text-primary);
          line-height: 1.7;
          margin: 0;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .comment-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .comment-input, .comment-textarea {
          width: 100%;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid var(--color-card-border);
          background: var(--color-card-bg);
          color: var(--color-text-primary);
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
          resize: vertical;
        }
        .comment-input:focus, .comment-textarea:focus {
          border-color: var(--color-text-secondary);
        }
        .comment-meta {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          color: var(--color-text-secondary);
          font-size: 12px;
        }
        .comment-turnstile {
          min-height: 65px;
        }
        .comment-message {
          margin: 0;
          color: #16a34a;
          font-size: 13px;
        }
        .comment-error {
          margin: 0;
          color: #ef4444;
          font-size: 13px;
        }
        .comment-submit {
          align-self: flex-start;
          padding: 8px 20px;
          border-radius: 8px;
          border: 1px solid var(--color-card-border);
          background: var(--color-text-primary);
          color: var(--color-page-bg);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .comment-submit:hover { opacity: 0.8; }
        .comment-submit:disabled {
          cursor: not-allowed;
          opacity: 0.55;
        }
      `}</style>
    </section>
  )
}
