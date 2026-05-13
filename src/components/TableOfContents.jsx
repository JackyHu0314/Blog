import { useEffect, useState } from 'react'

export default function TableOfContents({ headings = [] }) {
  const [active, setActive] = useState('')

  useEffect(() => {
    if (headings.length === 0) return
    const els = headings
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)
    if (els.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-10% 0px -80% 0px' }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="toc-nav" aria-label="目录">
      <p className="toc-label">目录</p>
      <ul className="toc-list">
        {headings.map((h, i) => (
          <li key={i} className={`toc-item toc-level-${h.level}`}>
            <button className={`toc-btn ${active === h.id ? 'toc-active' : ''}`} onClick={() => scrollTo(h.id)}>
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
