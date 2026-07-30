import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { commentsConfig } from '../config/comments'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

let turnstileScriptPromise

const copy = {
  eyebrow: { zh: 'Comments', en: 'Comments' },
  title: { zh: '留言', en: 'Comments' },
  introduction: {
    zh: '欢迎留言。',
    en: 'Leave a comment.',
  },
  countLoading: { zh: '读取中', en: 'Loading' },
  countUnavailable: { zh: '— 条', en: '— comments' },
  loading: { zh: '正在取回评论…', en: 'Retrieving comments…' },
  loadErrorTitle: { zh: '评论暂时没有加载出来', en: 'Comments could not be loaded' },
  loadErrorBody: {
    zh: '可能是网络短暂波动，稍后重试即可。',
    en: 'This may be a brief network interruption. Please try again.',
  },
  retry: { zh: '重新加载', en: 'Try again' },
  emptyTitle: { zh: '暂无留言', en: 'No comments yet' },
  emptyBody: {
    zh: '可以从这里开始。',
    en: 'Start here.',
  },
  formTitle: { zh: '写下回应', en: 'Write a response' },
  formIntroduction: {
    zh: '昵称与正文为必填项。',
    en: 'A nickname and message are required.',
  },
  nicknameLabel: { zh: '昵称', en: 'Nickname' },
  nicknamePlaceholder: { zh: '如何称呼你', en: 'How should you be addressed?' },
  contentLabel: { zh: '评论内容', en: 'Comment' },
  contentPlaceholder: { zh: '写下你想说的话…', en: 'Share what is on your mind…' },
  required: { zh: '必填', en: 'Required' },
  verificationLabel: { zh: '人机验证', en: 'Verification' },
  verificationLoading: { zh: '正在载入验证组件…', en: 'Loading verification…' },
  verificationError: { zh: '验证组件暂时不可用。', en: 'Verification is temporarily unavailable.' },
  retryVerification: { zh: '重新载入验证', en: 'Reload verification' },
  moderationTitle: { zh: '审核与隐私', en: 'Moderation & privacy' },
  moderationNote: {
    zh: '评论默认在审核后公开；本站不收集邮箱。为防止滥用，系统会处理经哈希的网络标识及基础浏览器信息。',
    en: 'Comments are normally published after moderation. No email is collected. To prevent abuse, the service processes a hashed network identifier and basic browser information.',
  },
  submit: { zh: '提交评论', en: 'Submit comment' },
  submitting: { zh: '正在提交…', en: 'Submitting…' },
  published: { zh: '评论已发布。', en: 'Your comment is now published.' },
  pending: { zh: '评论已提交，审核通过后会显示。', en: 'Your comment was submitted and will appear after moderation.' },
  unavailableTitle: { zh: '评论暂时不可用', en: 'Comments are temporarily unavailable' },
  unavailableBody: {
    zh: '评论服务正在准备中，请稍后再来。',
    en: 'The comment service is being prepared. Please check back later.',
  },
  devConfigTitle: { zh: '开发环境缺少配置：', en: 'Missing development configuration:' },
  errors: {
    requiredFields: { zh: '请填写昵称和评论内容。', en: 'Please enter a nickname and comment.' },
    contentTooShort: { zh: '评论至少需要 2 个字符。', en: 'Your comment must contain at least 2 characters.' },
    verificationRequired: { zh: '请先完成人机验证。', en: 'Please complete the verification first.' },
    rate_limited: { zh: '提交太频繁了，请稍后再试。', en: 'Too many comments were submitted. Please wait and try again.' },
    turnstile_failed: { zh: '人机验证失败，请重新验证。', en: 'Verification failed. Please complete it again.' },
    invalid_payload: { zh: '提交内容无效，请检查后重试。', en: 'The submitted content is invalid. Please review it and try again.' },
    invalid_json: { zh: '提交格式无效，请刷新页面后重试。', en: 'The submission format is invalid. Refresh the page and try again.' },
    content_too_short: { zh: '评论至少需要 2 个字符。', en: 'Your comment must contain at least 2 characters.' },
    payload_too_large: { zh: '提交内容过长，请精简后重试。', en: 'The submission is too large. Please shorten it and try again.' },
    origin_not_allowed: { zh: '当前页面无法提交评论。', en: 'Comments cannot be submitted from this page.' },
    invalid_article_id: { zh: '当前文章无法使用评论。', en: 'Comments are unavailable for this article.' },
    service_unavailable: { zh: '评论服务暂时不可用，请稍后再试。', en: 'The comment service is temporarily unavailable.' },
    internal_error: { zh: '服务器遇到问题，请稍后再试。', en: 'The server encountered a problem. Please try again later.' },
    invalid_response: { zh: '服务器返回了无法识别的响应。', en: 'The server returned an unreadable response.' },
    network_error: { zh: '网络连接失败，请检查网络后重试。', en: 'The network request failed. Check your connection and try again.' },
    generic: { zh: '评论提交失败，请稍后再试。', en: 'The comment could not be submitted. Please try again later.' },
  },
}

class ApiError extends Error {
  constructor(code, status = 0) {
    super(code)
    this.name = 'ApiError'
    this.code = code
    this.status = status
  }
}

const responseErrorByStatus = {
  400: 'invalid_payload',
  403: 'origin_not_allowed',
  413: 'payload_too_large',
  429: 'rate_limited',
  500: 'internal_error',
  503: 'service_unavailable',
}

function loadTurnstileScript() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('window_unavailable'))
  }

  if (window.turnstile) {
    return Promise.resolve(window.turnstile)
  }

  if (!turnstileScriptPromise) {
    const pending = new Promise((resolve, reject) => {
      let script = document.querySelector('script[data-turnstile-script="true"]')

      if (script?.dataset.turnstileState === 'failed') {
        script.remove()
        script = null
      }

      const handleLoad = () => {
        if (window.turnstile) {
          script.dataset.turnstileState = 'loaded'
          resolve(window.turnstile)
          return
        }

        script.dataset.turnstileState = 'failed'
        script.remove()
        reject(new Error('turnstile_api_unavailable'))
      }

      const handleError = () => {
        script.dataset.turnstileState = 'failed'
        script.remove()
        reject(new Error('turnstile_script_failed'))
      }

      if (script) {
        script.addEventListener('load', handleLoad, { once: true })
        script.addEventListener('error', handleError, { once: true })

        if (script.dataset.turnstileState === 'loaded') {
          queueMicrotask(handleLoad)
        }
        return
      }

      script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.dataset.turnstileScript = 'true'
      script.dataset.turnstileState = 'loading'
      script.addEventListener('load', handleLoad, { once: true })
      script.addEventListener('error', handleError, { once: true })
      document.head.appendChild(script)
    })

    turnstileScriptPromise = pending.catch((error) => {
      turnstileScriptPromise = undefined
      throw error
    })
  }

  return turnstileScriptPromise
}

async function readApiResponse(response) {
  let payload = null

  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok) {
    const code = typeof payload?.error === 'string'
      ? payload.error
      : responseErrorByStatus[response.status] ?? 'generic'
    throw new ApiError(code, response.status)
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new ApiError('invalid_response', response.status)
  }

  return payload
}

function formatDate(value, lang) {
  if (!value) return ''

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function getInitial(value) {
  const [initial = '?'] = Array.from(String(value ?? '').trim())
  return initial.toLocaleUpperCase()
}

export default function CommentSection({ articleId }) {
  const { lang, tr } = useLanguage()
  const { theme } = useTheme()
  const componentId = useId()
  const turnstileRef = useRef(null)
  const widgetIdRef = useRef(null)
  const submitControllerRef = useRef(null)
  const submitRequestIdRef = useRef(0)
  const articleKey = articleId == null ? '' : String(articleId)
  const activeArticleRef = useRef(articleKey)
  const isConfigured = Boolean(commentsConfig.apiBaseUrl && commentsConfig.turnstileSiteKey)
  const canComment = isConfigured && Boolean(articleKey)

  const [loadAttempt, setLoadAttempt] = useState(0)
  const [loadResult, setLoadResult] = useState({
    articleId: null,
    attempt: -1,
    status: 'idle',
    comments: [],
    errorCode: '',
  })
  const [draft, setDraft] = useState({ articleId: '', nickname: '', content: '' })
  const [submission, setSubmission] = useState({
    articleId: '',
    requestId: 0,
    status: 'idle',
  })
  const [feedbackResult, setFeedbackResult] = useState({
    articleId: '',
    type: '',
    message: '',
  })
  const [verificationAttempt, setVerificationAttempt] = useState(0)
  const verificationKey = `${articleKey}:${theme}:${lang}:${verificationAttempt}`
  const [verificationResult, setVerificationResult] = useState({
    key: '',
    status: 'idle',
    token: '',
  })

  const activeLoadResult = loadResult.articleId === articleKey && loadResult.attempt === loadAttempt
    ? loadResult
    : { status: 'loading', comments: [], errorCode: '' }
  const activeVerification = verificationResult.key === verificationKey
    ? verificationResult
    : { status: 'loading', token: '' }
  const comments = activeLoadResult.status === 'success' ? activeLoadResult.comments : []
  const activeDraft = draft.articleId === articleKey
    ? draft
    : { nickname: '', content: '' }
  const feedback = feedbackResult.articleId === articleKey
    ? feedbackResult
    : { type: '', message: '' }
  const nickname = activeDraft.nickname
  const content = activeDraft.content
  const submitting = submission.articleId === articleKey && submission.status === 'submitting'

  const titleId = `${componentId}-title`
  const formTitleId = `${componentId}-form-title`
  const nicknameId = `${componentId}-nickname`
  const contentId = `${componentId}-content`
  const contentHelpId = `${componentId}-content-help`
  const privacyNoteId = `${componentId}-privacy`

  const updateDraft = (field, value) => {
    setDraft((current) => {
      const currentDraft = current.articleId === articleKey
        ? current
        : { articleId: articleKey, nickname: '', content: '' }

      return { ...currentDraft, [field]: value }
    })
  }

  const setFeedback = ({ type, message }, targetArticleId = articleKey) => {
    setFeedbackResult({ articleId: targetArticleId, type, message })
  }

  useLayoutEffect(() => {
    activeArticleRef.current = articleKey

    return () => {
      submitControllerRef.current?.abort()
      submitControllerRef.current = null
      submitRequestIdRef.current += 1
    }
  }, [articleKey])

  useEffect(() => {
    if (!canComment) return undefined

    const controller = new AbortController()
    const requestedArticleId = articleKey
    const requestedAttempt = loadAttempt

    async function fetchComments() {
      try {
        const response = await fetch(
          `${commentsConfig.apiBaseUrl}/comments?articleId=${encodeURIComponent(requestedArticleId)}`,
          {
            signal: controller.signal,
            cache: 'no-store',
            headers: { Accept: 'application/json' },
          },
        )
        const data = await readApiResponse(response)

        if (!Array.isArray(data.comments)) {
          throw new ApiError('invalid_response', response.status)
        }

        setLoadResult({
          articleId: requestedArticleId,
          attempt: requestedAttempt,
          status: 'success',
          comments: data.comments,
          errorCode: '',
        })
      } catch (error) {
        if (error.name === 'AbortError') return

        setLoadResult({
          articleId: requestedArticleId,
          attempt: requestedAttempt,
          status: 'error',
          comments: [],
          errorCode: error instanceof ApiError ? error.code : 'network_error',
        })
      }
    }

    fetchComments()
    return () => controller.abort()
  }, [articleKey, canComment, loadAttempt])

  useEffect(() => {
    if (!canComment || !turnstileRef.current) return undefined

    let cancelled = false
    const currentVerificationKey = verificationKey

    const markVerification = (status, token = '') => {
      if (cancelled) return
      setVerificationResult({ key: currentVerificationKey, status, token })
    }

    loadTurnstileScript()
      .then((turnstile) => {
        if (cancelled || !turnstileRef.current) return

        const options = {
          sitekey: commentsConfig.turnstileSiteKey,
          action: 'comment',
          theme: theme === 'dark' ? 'dark' : 'light',
          language: lang === 'zh' ? 'zh-CN' : 'en',
          callback: (token) => {
            markVerification('verified', token)
          },
          'expired-callback': () => markVerification('ready'),
          'timeout-callback': () => markVerification('ready'),
          'error-callback': () => {
            markVerification('error')
          },
        }

        markVerification('ready')
        try {
          widgetIdRef.current = turnstile.render(turnstileRef.current, {
            ...options,
            size: 'flexible',
          })
        } catch {
          turnstileRef.current.replaceChildren()
          widgetIdRef.current = turnstile.render(turnstileRef.current, options)
        }

      })
      .catch(() => {
        markVerification('error')
      })

    return () => {
      cancelled = true
      if (window.turnstile && widgetIdRef.current != null) {
        window.turnstile.remove(widgetIdRef.current)
      }
      widgetIdRef.current = null
    }
  }, [canComment, lang, theme, verificationKey])

  const retryComments = () => {
    setLoadAttempt((current) => current + 1)
  }

  const retryVerification = () => {
    setVerificationAttempt((current) => current + 1)
  }

  const resetTurnstile = () => {
    if (window.turnstile && widgetIdRef.current != null) {
      window.turnstile.reset(widgetIdRef.current)
    }
    setVerificationResult({ key: verificationKey, status: 'ready', token: '' })
  }

  const submit = async (event) => {
    event.preventDefault()
    submitControllerRef.current?.abort()
    submitControllerRef.current = null

    const requestId = submitRequestIdRef.current + 1
    submitRequestIdRef.current = requestId
    const submittedArticleId = articleKey
    const submittedLoadAttempt = loadAttempt
    const submittedNickname = nickname.trim()
    const submittedContent = content.trim()
    const submittedTurnstileToken = activeVerification.token

    setSubmission({
      articleId: submittedArticleId,
      requestId,
      status: 'idle',
    })
    setFeedback({ type: '', message: '' })

    if (!submittedNickname || !submittedContent) {
      setFeedback({ type: 'error', message: tr(copy.errors.requiredFields) })
      return
    }

    if (submittedContent.length < 2) {
      setFeedback({ type: 'error', message: tr(copy.errors.contentTooShort) })
      return
    }

    if (!submittedTurnstileToken) {
      setFeedback({ type: 'error', message: tr(copy.errors.verificationRequired) })
      return
    }

    const controller = new AbortController()
    submitControllerRef.current = controller
    setSubmission({
      articleId: submittedArticleId,
      requestId,
      status: 'submitting',
    })

    const isCurrentSubmit = () => (
      submitRequestIdRef.current === requestId
      && activeArticleRef.current === submittedArticleId
      && !controller.signal.aborted
    )

    try {
      const response = await fetch(`${commentsConfig.apiBaseUrl}/comments`, {
        method: 'POST',
        signal: controller.signal,
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleId: submittedArticleId,
          nickname: submittedNickname,
          content: submittedContent,
          turnstileToken: submittedTurnstileToken,
        }),
      })
      const data = await readApiResponse(response)

      if (!isCurrentSubmit()) return

      if (data.comment) {
        setLoadResult((current) => {
          if (
            current.articleId !== submittedArticleId
            || current.attempt !== submittedLoadAttempt
            || current.status !== 'success'
          ) {
            return current
          }

          return { ...current, comments: [...current.comments, data.comment] }
        })
        setFeedback({ type: 'success', message: tr(copy.published) }, submittedArticleId)
      } else {
        setFeedback({ type: 'success', message: tr(copy.pending) }, submittedArticleId)
      }

      setDraft((current) => current.articleId === submittedArticleId
        ? { articleId: submittedArticleId, nickname: '', content: '' }
        : current)
      resetTurnstile()
    } catch (error) {
      if (error.name === 'AbortError' || !isCurrentSubmit()) return

      const errorCode = error instanceof ApiError ? error.code : 'network_error'
      const translatedError = copy.errors[errorCode] ?? copy.errors.generic
      setFeedback({ type: 'error', message: tr(translatedError) }, submittedArticleId)

      if (errorCode === 'turnstile_failed') {
        resetTurnstile()
      }
    } finally {
      if (submitControllerRef.current === controller) {
        submitControllerRef.current = null
      }

      if (isCurrentSubmit()) {
        setSubmission((current) => (
          current.articleId === submittedArticleId && current.requestId === requestId
            ? { ...current, status: 'idle' }
            : current
        ))
      }
    }
  }

  const commentCountLabel = !canComment || activeLoadResult.status === 'error'
    ? tr(copy.countUnavailable)
    : activeLoadResult.status === 'success'
      ? lang === 'zh'
        ? `${comments.length} 条`
        : `${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}`
      : tr(copy.countLoading)
  const loadErrorMessage = copy.errors[activeLoadResult.errorCode]
    ? tr(copy.errors[activeLoadResult.errorCode])
    : tr(copy.loadErrorBody)
  const missingConfigKeys = [
    !commentsConfig.apiBaseUrl && 'VITE_COMMENTS_API_BASE_URL',
    !commentsConfig.turnstileSiteKey && 'VITE_TURNSTILE_SITE_KEY',
  ].filter(Boolean)

  return (
    <section id="comments" className="comment-section" aria-labelledby={titleId}>
      <header className="comment-section__header">
        <div>
          <p className="comment-section__eyebrow">{tr(copy.eyebrow)}</p>
          <h2 id={titleId} className="comment-section__title">{tr(copy.title)}</h2>
          <p className="comment-section__introduction">{tr(copy.introduction)}</p>
        </div>
        <span className="comment-section__count" aria-label={commentCountLabel}>
          {commentCountLabel}
        </span>
      </header>

      {!canComment ? (
        <div className="comment-state comment-state--unavailable" role="status">
          <span className="comment-state__mark" aria-hidden="true">—</span>
          <div>
            <h3>{tr(copy.unavailableTitle)}</h3>
            <p>{tr(copy.unavailableBody)}</p>
            {import.meta.env.DEV && missingConfigKeys.length > 0 && (
              <div className="comment-state__dev-note">
                <strong>{tr(copy.devConfigTitle)}</strong>
                <code>{missingConfigKeys.join(', ')}</code>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            className="comment-stream"
            aria-busy={activeLoadResult.status === 'loading'}
          >
            {activeLoadResult.status === 'loading' ? (
              <div className="comment-state comment-state--loading" role="status">
                <span className="comment-state__pulse" aria-hidden="true" />
                <p>{tr(copy.loading)}</p>
              </div>
            ) : activeLoadResult.status === 'error' ? (
              <div className="comment-state comment-state--error" role="alert">
                <span className="comment-state__mark" aria-hidden="true">!</span>
                <div>
                  <h3>{tr(copy.loadErrorTitle)}</h3>
                  <p>{loadErrorMessage}</p>
                  <button type="button" className="comment-text-button" onClick={retryComments}>
                    {tr(copy.retry)}
                  </button>
                </div>
              </div>
            ) : comments.length === 0 ? (
              <div className="comment-state comment-state--empty" role="status">
                <span className="comment-state__mark" aria-hidden="true">0</span>
                <div>
                  <h3>{tr(copy.emptyTitle)}</h3>
                  <p>{tr(copy.emptyBody)}</p>
                </div>
              </div>
            ) : (
              <ol className="comment-list">
                {comments.map((comment, index) => (
                  <li key={comment.id} className="comment-item">
                    <div className="comment-item__avatar" aria-hidden="true">
                      {getInitial(comment.nickname)}
                    </div>
                    <article className="comment-item__body">
                      <header className="comment-item__header">
                        <div>
                          <span className="comment-item__index">#{String(index + 1).padStart(2, '0')}</span>
                          <strong className="comment-item__name">{comment.nickname}</strong>
                        </div>
                        <time className="comment-item__date" dateTime={comment.createdAt}>
                          {formatDate(comment.createdAt, lang)}
                        </time>
                      </header>
                      <p className="comment-item__text">{comment.content}</p>
                    </article>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <form
            className="comment-form"
            onSubmit={submit}
            aria-labelledby={formTitleId}
            aria-busy={submitting}
          >
            <div className="comment-form__heading">
              <div>
                <p className="comment-form__index">Response</p>
                <h3 id={formTitleId}>{tr(copy.formTitle)}</h3>
              </div>
              <p>{tr(copy.formIntroduction)}</p>
            </div>

            <div className="comment-field">
              <label htmlFor={nicknameId}>
                {tr(copy.nicknameLabel)}
                <span>{tr(copy.required)}</span>
              </label>
              <input
                id={nicknameId}
                className="comment-field__control"
                placeholder={tr(copy.nicknamePlaceholder)}
                value={nickname}
                onChange={(event) => updateDraft('nickname', event.target.value)}
                maxLength={30}
                autoComplete="name"
                required
              />
            </div>

            <div className="comment-field">
              <label htmlFor={contentId}>
                {tr(copy.contentLabel)}
                <span>{tr(copy.required)}</span>
              </label>
              <textarea
                id={contentId}
                className="comment-field__control comment-field__textarea"
                placeholder={tr(copy.contentPlaceholder)}
                value={content}
                onChange={(event) => updateDraft('content', event.target.value)}
                rows={5}
                minLength={2}
                maxLength={500}
                aria-describedby={contentHelpId}
                required
              />
              <div id={contentHelpId} className="comment-field__meta">
                <span>{content.length} / 500</span>
                <span>{tr(copy.moderationTitle)}</span>
              </div>
            </div>

            <fieldset className="comment-verification">
              <legend>{tr(copy.verificationLabel)}</legend>
              <div
                ref={turnstileRef}
                className="comment-verification__widget"
                aria-busy={activeVerification.status === 'loading'}
              />
              {activeVerification.status === 'loading' && (
                <p className="comment-verification__status">{tr(copy.verificationLoading)}</p>
              )}
              {activeVerification.status === 'error' && (
                <div className="comment-verification__error" role="alert" aria-live="polite">
                  <p>{tr(copy.verificationError)}</p>
                  <button type="button" className="comment-text-button" onClick={retryVerification}>
                    {tr(copy.retryVerification)}
                  </button>
                </div>
              )}
            </fieldset>

            <aside id={privacyNoteId} className="comment-form__notice">
              <span aria-hidden="true">i</span>
              <div>
                <strong>{tr(copy.moderationTitle)}</strong>
                <p>{tr(copy.moderationNote)}</p>
              </div>
            </aside>

            <div
              className={`comment-feedback ${feedback.type ? `comment-feedback--${feedback.type}` : ''}`}
              aria-live="polite"
              aria-atomic="true"
            >
              {feedback.message && (
                <p role={feedback.type === 'error' ? 'alert' : 'status'}>{feedback.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="comment-submit"
              disabled={submitting || activeVerification.status === 'loading'}
              aria-describedby={privacyNoteId}
            >
              <span>{submitting ? tr(copy.submitting) : tr(copy.submit)}</span>
              <span aria-hidden="true">↗</span>
            </button>
          </form>
        </>
      )}

      <style>{`
        .comment-section {
          --comment-accent: #557b8d;
          --comment-accent-soft: color-mix(in srgb, var(--comment-accent) 10%, transparent);
          --comment-rule: var(--color-card-border);
          margin-top: 3.5rem;
          padding-top: 2rem;
          color: var(--color-text-primary);
          border-top: 1px solid var(--comment-rule);
        }
        .dark .comment-section {
          --comment-accent: #b0e2ed;
          --comment-accent-soft: color-mix(in srgb, var(--comment-accent) 12%, transparent);
        }
        .comment-section__header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 32px;
          align-items: start;
          margin-bottom: 34px;
        }
        .comment-section__eyebrow,
        .comment-form__index {
          margin: 0 0 10px;
          color: var(--comment-accent);
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .comment-section__title {
          margin: 0;
          font-family: var(--font-sans);
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: -0.015em;
          line-height: 1.35;
        }
        .comment-section__introduction {
          max-width: 560px;
          margin: 16px 0 0;
          color: var(--color-text-secondary);
          font-size: 13px;
          line-height: 1.8;
        }
        .comment-section__count {
          min-width: 68px;
          padding: 7px 10px;
          color: var(--color-text-secondary);
          border-top: 1px solid var(--comment-rule);
          border-bottom: 1px solid var(--comment-rule);
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 10px;
          text-align: center;
          white-space: nowrap;
        }
        .comment-stream {
          min-height: 120px;
          border-top: 1px solid var(--comment-rule);
        }
        .comment-state {
          display: grid;
          grid-template-columns: 38px minmax(0, 1fr);
          gap: 18px;
          align-items: start;
          padding: 26px 0;
          color: var(--color-text-secondary);
          border-bottom: 1px solid var(--comment-rule);
        }
        .comment-state h3,
        .comment-state p {
          margin: 0;
        }
        .comment-state h3 {
          color: var(--color-text-primary);
          font-size: 14px;
          font-weight: 650;
        }
        .comment-state p {
          margin-top: 6px;
          font-size: 12px;
          line-height: 1.7;
        }
        .comment-state__mark {
          display: grid;
          width: 36px;
          height: 36px;
          place-items: center;
          color: var(--comment-accent);
          border: 1px solid var(--comment-rule);
          border-radius: 50%;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 11px;
        }
        .comment-state__pulse {
          width: 7px;
          height: 7px;
          margin: 7px 0 0 14px;
          border-radius: 50%;
          background: var(--comment-accent);
          box-shadow: 0 0 0 0 var(--comment-accent-soft);
          animation: comment-pulse 1.4s ease-out infinite;
        }
        .comment-state--unavailable {
          margin-top: 26px;
          border-top: 1px solid var(--comment-rule);
        }
        .comment-state__dev-note {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 12px;
          font-size: 11px;
        }
        .comment-state__dev-note strong {
          color: var(--comment-accent);
          font-weight: 650;
        }
        .comment-state__dev-note code {
          color: var(--color-text-primary);
          overflow-wrap: anywhere;
        }
        .comment-text-button {
          margin-top: 13px;
          padding: 0 0 3px;
          color: var(--comment-accent);
          border: 0;
          border-bottom: 1px solid currentColor;
          border-radius: 0;
          background: transparent;
          font: inherit;
          font-size: 11px;
          font-weight: 650;
          cursor: pointer;
        }
        .comment-text-button:hover {
          color: var(--color-text-primary);
        }
        .comment-text-button:focus-visible,
        .comment-submit:focus-visible,
        .comment-field__control:focus-visible {
          outline: 2px solid var(--comment-accent);
          outline-offset: 3px;
        }
        .comment-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .comment-item {
          display: grid;
          grid-template-columns: 42px minmax(0, 1fr);
          gap: 18px;
          padding: 26px 0 28px;
          border-bottom: 1px solid var(--comment-rule);
        }
        .comment-item__avatar {
          display: grid;
          width: 40px;
          height: 40px;
          place-items: center;
          color: var(--comment-accent);
          background: var(--comment-accent-soft);
          border: 1px solid color-mix(in srgb, var(--comment-accent) 35%, var(--comment-rule));
          border-radius: 50%;
          font-family: var(--font-sans);
          font-size: 17px;
          font-weight: 650;
        }
        .comment-item__body {
          min-width: 0;
        }
        .comment-item__header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 20px;
        }
        .comment-item__index {
          margin-right: 9px;
          color: var(--comment-accent);
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 9px;
          letter-spacing: 0.08em;
        }
        .comment-item__name {
          color: var(--color-text-primary);
          font-size: 13px;
          font-weight: 680;
        }
        .comment-item__date {
          color: var(--color-text-secondary);
          font-size: 10px;
          white-space: nowrap;
        }
        .comment-item__text {
          margin: 13px 0 0;
          color: var(--color-text-primary);
          font-size: 14px;
          line-height: 1.85;
          overflow-wrap: anywhere;
          white-space: pre-wrap;
        }
        .comment-form {
          margin-top: 3rem;
          padding: 1.25rem;
          background: var(--color-card-bg);
          border: 1px solid var(--comment-rule);
          border-radius: 0.75rem;
        }
        .comment-form__heading {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(180px, 0.6fr);
          gap: 28px;
          align-items: end;
          margin-bottom: 30px;
          padding-bottom: 22px;
          border-bottom: 1px solid var(--comment-rule);
        }
        .comment-form__heading h3 {
          margin: 0;
          font-family: var(--font-sans);
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: -0.015em;
        }
        .comment-form__heading > p {
          margin: 0;
          color: var(--color-text-secondary);
          font-size: 11px;
          line-height: 1.6;
          text-align: right;
        }
        .comment-field + .comment-field {
          margin-top: 22px;
        }
        .comment-field label,
        .comment-verification legend {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 8px;
          color: var(--color-text-primary);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
        }
        .comment-field label span {
          color: var(--comment-accent);
          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .comment-field__control {
          width: 100%;
          box-sizing: border-box;
          padding: 12px 13px;
          color: var(--color-text-primary);
          background: var(--color-card-bg);
          border: 1px solid var(--comment-rule);
          border-radius: 0.375rem;
          font: inherit;
          font-size: 13px;
          line-height: 1.5;
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }
        .comment-field__control::placeholder {
          color: var(--color-text-secondary);
          opacity: 0.7;
        }
        .comment-field__control:hover {
          border-color: color-mix(in srgb, var(--color-text-secondary) 55%, var(--comment-rule));
        }
        .comment-field__textarea {
          min-height: 132px;
          resize: vertical;
        }
        .comment-field__meta {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          margin-top: 7px;
          color: var(--color-text-secondary);
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 9px;
        }
        .comment-verification {
          min-width: 0;
          margin: 24px 0 0;
          padding: 0;
          border: 0;
        }
        .comment-verification legend {
          float: left;
        }
        .comment-verification__widget {
          clear: both;
          width: 100%;
          min-height: 65px;
          overflow: hidden;
        }
        .comment-verification__status,
        .comment-verification__error p {
          margin: 7px 0 0;
          color: var(--color-text-secondary);
          font-size: 11px;
        }
        .comment-verification__error p {
          color: var(--comment-accent);
        }
        .comment-form__notice {
          display: grid;
          grid-template-columns: 24px minmax(0, 1fr);
          gap: 12px;
          margin-top: 24px;
          padding: 13px 0;
          color: var(--color-text-secondary);
          border-top: 1px solid var(--comment-rule);
          border-bottom: 1px solid var(--comment-rule);
        }
        .comment-form__notice > span {
          display: grid;
          width: 20px;
          height: 20px;
          place-items: center;
          color: var(--comment-accent);
          border: 1px solid currentColor;
          border-radius: 50%;
          font-family: ui-serif, Georgia, serif;
          font-size: 11px;
          font-style: italic;
        }
        .comment-form__notice strong {
          display: block;
          margin-bottom: 3px;
          color: var(--color-text-primary);
          font-size: 11px;
          font-weight: 680;
        }
        .comment-form__notice p {
          margin: 0;
          font-size: 10px;
          line-height: 1.65;
        }
        .comment-feedback {
          min-height: 19px;
          margin-top: 14px;
        }
        .comment-feedback p {
          margin: 0;
          color: var(--color-text-secondary);
          font-size: 11px;
          line-height: 1.6;
        }
        .comment-feedback--success p {
          color: #397a54;
        }
        .dark .comment-feedback--success p {
          color: #77b98c;
        }
        .comment-feedback--error p,
        .comment-feedback--verification-error p {
          color: var(--comment-accent);
        }
        .comment-submit {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          min-width: 184px;
          min-height: 44px;
          margin-top: 5px;
          padding: 0 15px;
          color: var(--color-bg-primary);
          background: var(--comment-accent);
          border: 1px solid var(--comment-accent);
          border-radius: 0.375rem;
          font: inherit;
          font-size: 11px;
          font-weight: 720;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: transform 160ms ease, filter 160ms ease;
        }
        .comment-submit:hover:not(:disabled) {
          filter: brightness(0.92);
          transform: translateY(-1px);
        }
        .comment-submit:disabled {
          cursor: not-allowed;
          opacity: 0.52;
        }
        @keyframes comment-pulse {
          0% { box-shadow: 0 0 0 0 var(--comment-accent-soft); }
          75%, 100% { box-shadow: 0 0 0 11px transparent; }
        }
        @media (max-width: 600px) {
          .comment-section__header {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .comment-section__count {
            justify-self: start;
          }
          .comment-item {
            grid-template-columns: 34px minmax(0, 1fr);
            gap: 13px;
          }
          .comment-item__avatar {
            width: 32px;
            height: 32px;
            font-size: 14px;
          }
          .comment-item__header {
            flex-direction: column;
            gap: 5px;
          }
          .comment-item__date {
            white-space: normal;
          }
          .comment-form {
            padding: 21px 16px;
          }
          .comment-form__heading {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .comment-form__heading > p {
            text-align: left;
          }
          .comment-submit {
            width: 100%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .comment-section *,
          .comment-section *::before,
          .comment-section *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  )
}
