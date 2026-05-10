import { useEffect, useState, useRef } from 'react'

export default function TableOfContents({ body }) {
  const [headings, setHeadings] = useState([])
  const [active, setActive] = useState('')
  const observerRef = useRef(null)

  useEffect(() => {
    if (!body) return
    const lines = body.split('\n')
    const found = []
    lines.forEach(line => {
      if (line.startsWith('## ')) found.push({ level: 2, text: line.slice(3).trim() })
      else if (line.startsWith('### ')) found.push({ level: 3, text: line.slice(4).trim() })
      else if (line.startsWith('#### ')) found.push({ level: 4, text: line.slice(5).trim() })
    })
    setHeadings(found)
  }, [body])

  useEffect(() => {
    if (headings.length === 0) return
    const els = document.querySelectorAll('.article-h2, .article-h3, .article-h4')
    if (els.length === 0) return

    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.textContent.trim())
        })
      },
      { rootMargin: '-10% 0px -80% 0px' }
    )
    els.forEach(el => observerRef.current.observe(el))
    return () => observerRef.current?.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  const scrollTo = (text) => {
    const els = document.querySelectorAll('.article-h2, .article-h3, .article-h4')
    for (const el of els) {
      if (el.textContent.trim() === text) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        break
      }
    }
  }

  return (
    <nav className="toc-nav" aria-label="目录">
      <p className="toc-label">目录</p>
      <ul className="toc-list">
        {headings.map((h, i) => (
          <li key={i} className={`toc-item toc-level-${h.level}`}>
            <button
              className={`toc-btn ${active === h.text ? 'toc-active' : ''}`}
              onClick={() => scrollTo(h.text)}
            >
              {h.text}
            </button>
          </li>
        ))}
      </ul>
      <style>{`
        .toc-nav {
          position: sticky;
          top: 88px;
          width: 200px;
          flex-shrink: 0;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid var(--color-card-border);
          background: var(--color-card-bg);
          max-height: calc(100vh - 120px);
          overflow-y: auto;
        }
        .toc-label {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--color-text-primary);
          margin: 0 0 10px 0;
        }
        .toc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .toc-item { margin: 0; }
        .toc-level-3 { padding-left: 10px; }
        .toc-level-4 { padding-left: 20px; }
        .toc-btn {
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          width: 100%;
          padding: 5px 8px;
          border-radius: 6px;
          font-size: 13px;
          line-height: 1.5;
          color: var(--color-text-primary);
          opacity: 0.5;
          transition: opacity 0.2s, background 0.2s;
        }
        .toc-btn:hover { opacity: 1; background: var(--color-bg-secondary); }
        .toc-active { opacity: 1 !important; font-weight: 700; }
        @media (max-width: 900px) { .toc-nav { display: none; } }
      `}</style>
    </nav>
  )
}
