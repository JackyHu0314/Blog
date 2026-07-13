import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function TableOfContents({ headings = [] }) {
  const [active, setActive] = useState('')
  const { lang } = useLanguage()

  useEffect(() => {
    if (headings.length === 0) return undefined
    const elements = headings.map(({ id }) => document.getElementById(id)).filter(Boolean)
    if (elements.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-10% 0px -80% 0px' },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="toc-nav" aria-label={lang === 'zh' ? '目录' : 'Table of contents'}>
      <p className="toc-label">{lang === 'zh' ? '目录' : 'On this page'}</p>
      <ul className="toc-list">
        {headings.map((heading) => (
          <li key={heading.id} className={`toc-item toc-level-${heading.level}`}>
            <button
              type="button"
              className={active === heading.id ? 'toc-active' : ''}
              onClick={() => document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
