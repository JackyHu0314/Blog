import { useState } from 'react'
import CommentSection from '../components/CommentSection'
import { useLanguage } from '../context/LanguageContext'
import { friends } from '../data/friends'
import './Links.css'

const siteInfo = [
  { key: 'name', label: 'Name', value: "Jacky's Blog" },
  { key: 'description', label: 'Desc', value: '窗外下雨了' },
  { key: 'link', label: 'Link', value: 'https://www.jackyhu.top/' },
  { key: 'avatar', label: 'Avatar', value: 'https://www.jackyhu.top/avatar.jpg' },
]

function FriendAvatar({ friend }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className="friend-card__fallback" aria-hidden="true">
        {Array.from(friend.name.trim())[0]?.toUpperCase() ?? '?'}
      </span>
    )
  }

  return (
    <img
      src={friend.avatar}
      alt=""
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  )
}

export default function Links() {
  const { lang } = useLanguage()
  const [copied, setCopied] = useState('')

  const copyValue = async (key, value) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(key)
    } catch {
      setCopied('')
    }
  }

  const copyAll = () => copyValue(
    'all',
    siteInfo.map((item) => `${item.label}: ${item.value}`).join('\n'),
  )

  return (
    <article className="links-page">
      <header className="page-intro animate-block">
        <p className="page-kicker">Friends · Links</p>
        <h1 className="page-title">Links</h1>
        <p className="page-description">{lang === 'zh' ? '朋友们的网站。' : 'Friends on the web.'}</p>
      </header>

      <section className="links-section animate-block animate-block--delay" aria-labelledby="friends-title">
        <div className="section-heading-row">
          <div>
            <p className="section-index">01</p>
            <h2 id="friends-title">Friends</h2>
          </div>
        </div>

        <div className="friends-grid">
          {friends.map((friend, index) => (
            <a
              className="friend-card"
              href={friend.url}
              key={friend.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="friend-card__index">{String(index + 1).padStart(2, '0')}</span>
              <span className="friend-card__avatar">
                <FriendAvatar friend={friend} />
              </span>
              <span className="friend-card__copy">
                <strong>{friend.name}</strong>
                <small>{friend.description}</small>
              </span>
              <span className="friend-card__arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="links-section apply-section" aria-labelledby="apply-title">
        <div className="section-heading-row">
          <div>
            <p className="section-index">02</p>
            <h2 id="apply-title">Apply</h2>
          </div>
          <div className="apply-heading-action">
            <p>{lang === 'zh' ? '添加本站后，在下方留言。' : 'Add this site, then leave a comment below.'}</p>
            <button type="button" onClick={copyAll}>
              {copied === 'all' ? (lang === 'zh' ? '已复制' : 'Copied') : (lang === 'zh' ? '复制全部' : 'Copy all')}
            </button>
          </div>
        </div>

        <div className="apply-grid">
          <div className="site-info-list" aria-label={lang === 'zh' ? '本站友链信息' : 'Link information'}>
            {siteInfo.map((item) => (
              <button
                type="button"
                className="site-info-row"
                key={item.key}
                onClick={() => copyValue(item.key, item.value)}
              >
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <small>{copied === item.key ? (lang === 'zh' ? '已复制' : 'Copied') : (lang === 'zh' ? '复制' : 'Copy')}</small>
              </button>
            ))}
          </div>

          <div className="apply-rules">
            <p className="apply-rules__label">Before applying</p>
            <ol>
              <li>{lang === 'zh' ? '请先添加本站。' : 'Add this site first.'}</li>
              <li>{lang === 'zh' ? '网站可以正常访问。' : 'Keep your site accessible.'}</li>
              <li>{lang === 'zh' ? '内容合法，无恶意跳转。' : 'Keep the content legal and free of malicious redirects.'}</li>
            </ol>
            <p className="apply-rules__template">Name / Desc / Link / Avatar</p>
          </div>
        </div>
      </section>

      <CommentSection articleId="links:applications" />
    </article>
  )
}
