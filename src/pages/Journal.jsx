import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { journals } from '../data/journals'
import { useLanguage } from '../context/LanguageContext'
import './JournalList.css'

const categories = ['全部', '情感', '学业', '科研', '生活', '技术']

const byNewest = (a, b) => b.date.localeCompare(a.date)

export default function Journal() {
  const [selected, setSelected] = useState('全部')
  const { lang, t, tr } = useLanguage()

  const counts = useMemo(() => {
    const result = { 全部: journals.length }
    journals.forEach((journal) => {
      result[journal.category] = (result[journal.category] ?? 0) + 1
    })
    return result
  }, [])

  const groups = useMemo(() => {
    const list = selected === '全部'
      ? journals
      : journals.filter((journal) => journal.category === selected)
    const byYear = new Map()
    ;[...list].sort(byNewest).forEach((journal) => {
      const year = journal.date.slice(0, 4)
      if (!byYear.has(year)) byYear.set(year, [])
      byYear.get(year).push(journal)
    })
    return [...byYear.entries()]
  }, [selected])

  const years = [...new Set(journals.map((journal) => journal.date.slice(0, 4)))].sort()
  const span = years.length > 1 ? `${years[0]} — ${years[years.length - 1]}` : years[0]
  const summary = lang === 'zh'
    ? `${journals.length} 篇 · ${span}`
    : `${journals.length} ${journals.length === 1 ? 'note' : 'notes'} · ${span}`

  return (
    <article className="jr-page">
      <header className="jr-intro animate-block">
        <p className="cine-kicker">Journal · Archive</p>
        <h1 className="jr-title">Journal</h1>
        <p className="jr-lede">
          {t('journal.subtitle')}
        </p>
        <p className="jr-summary">{summary}</p>
      </header>

      <div className="jr-filters animate-block animate-block--delay" role="group" aria-label={lang === 'zh' ? '按分类筛选' : 'Filter by category'}>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className="jr-filter"
            onClick={() => setSelected(category)}
            aria-pressed={selected === category}
          >
            {t(`journal.categories.${category}`)}
            <sup>{counts[category] ?? 0}</sup>
          </button>
        ))}
      </div>

      {groups.length > 0 ? (
        <div className="jr-groups animate-block animate-block--delay">
          {groups.map(([year, entries]) => (
            <section className="jr-year" key={year} aria-labelledby={`jr-year-${year}`}>
              <h2 id={`jr-year-${year}`} className="jr-year-label">{year}</h2>
              <ol className="jr-list">
                {entries.map((journal) => (
                  <li key={journal.id}>
                    <Link
                      to={`/journal/${journal.id}`}
                      className={`jr-entry${journal.image?.hideOnMobile ? ' jr-entry--desktop-thumb' : ''}`}
                    >
                      <div className="jr-entry-copy">
                        <p className="jr-entry-meta">
                          <time dateTime={journal.date}>{journal.date.slice(5).replace('-', '.')}</time>
                          <span aria-hidden="true">·</span>
                          <span>{t(`journal.categories.${journal.category}`)}</span>
                        </p>
                        <h3>{tr(journal.title)}</h3>
                        <p className="jr-entry-excerpt">{tr(journal.excerpt)}</p>
                      </div>
                      {journal.cover ? (
                        <div className="jr-entry-thumb" aria-hidden="true">
                          <img src={journal.cover} alt="" loading="lazy" />
                        </div>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      ) : (
        <p className="jr-empty">{lang === 'zh' ? '这个分类还没有文章。' : 'Nothing in this category yet.'}</p>
      )}
    </article>
  )
}
