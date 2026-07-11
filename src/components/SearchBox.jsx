import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { journals } from '../data/journals'
import { useLanguage } from '../context/LanguageContext'

export default function SearchBox() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const triggerRef = useRef(null)
  const containerRef = useRef(null)
  const navigate = useNavigate()
  const { lang, tr } = useLanguage()

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase()
    const ordered = [...journals].sort((a, b) => b.date.localeCompare(a.date))

    if (!normalized) return ordered.slice(0, 4)

    return ordered.filter((journal) => {
      const searchable = [
        tr(journal.title),
        tr(journal.excerpt),
        tr(journal.body),
        journal.category,
      ].join(' ').toLocaleLowerCase()
      return searchable.includes(normalized)
    }).slice(0, 6)
  }, [query, tr])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    function onPointerDown(event) {
      if (!containerRef.current?.contains(event.target)) setOpen(false)
    }

    function onKeyDown(event) {
      if (event.key === 'Escape' && open) {
        event.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function openJournal(id) {
    setOpen(false)
    setQuery('')
    navigate('/journal/' + id)
  }

  return (
    <div ref={containerRef} className="search-box">
      <button
        ref={triggerRef}
        type="button"
        className="icon-button"
        onClick={() => setOpen((current) => !current)}
        aria-label={lang === 'zh' ? '搜索文章' : 'Search writing'}
        aria-expanded={open}
        aria-controls="site-search-panel"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m16.2 16.2 4 4" />
        </svg>
      </button>

      {open && (
        <div id="site-search-panel" className="search-panel" role="dialog" aria-label={lang === 'zh' ? '文章搜索' : 'Writing search'}>
          <div className="search-input-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="17" height="17" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m16.2 16.2 4 4" />
            </svg>
            <label className="visually-hidden" htmlFor="site-search-input">
              {lang === 'zh' ? '搜索标题或正文' : 'Search titles or text'}
            </label>
            <input
              id="site-search-input"
              ref={inputRef}
              className="search-input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && results[0]) openJournal(results[0].id)
              }}
              placeholder={lang === 'zh' ? '搜索标题、句子或主题…' : 'Search a title, line, or topic…'}
              autoComplete="off"
            />
          </div>

          {results.length > 0 ? (
            <ul className="search-results">
              {results.map((journal, index) => (
                <li key={journal.id}>
                  <button type="button" className="search-result" onClick={() => openJournal(journal.id)}>
                    <span className="search-result-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="search-result-title">{tr(journal.title)}</span>
                    <span className="search-result-date">{journal.date.slice(0, 4)}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="search-empty">{lang === 'zh' ? '没有找到相关文字。' : 'No matching writing found.'}</p>
          )}
        </div>
      )}
    </div>
  )
}
