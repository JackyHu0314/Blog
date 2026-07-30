import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { journals } from '../data/journals'
import { useLanguage } from '../context/LanguageContext'

const categories = ['全部', '情感', '学业', '科研', '生活', '技术']

export default function Journal() {
  const [selected, setSelected] = useState('全部')
  const { lang, t, tr } = useLanguage()

  const filtered = useMemo(() => {
    const list = selected === '全部'
      ? journals
      : journals.filter((journal) => journal.category === selected)
    return [...list].sort((a, b) => b.date.localeCompare(a.date))
  }, [selected])

  const years = [...new Set(journals.map((journal) => journal.date.slice(0, 4)))]

  return (
    <article className="listing-page journal-page">
      <header className="page-intro animate-block">
        <p className="page-kicker">Journal · Archive</p>
        <h1 className="page-title">Journal</h1>
        <p className="page-description">
          {lang === 'zh'
            ? '技术、生活与近况。'
            : 'Notes on tech and life.'}
        </p>
      </header>

      <div className="listing-layout animate-block animate-block--delay">
        <main>
          <div className="journal-filters" aria-label={lang === 'zh' ? '按分类筛选' : 'Filter by category'}>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className="journal-filter"
                onClick={() => setSelected(category)}
                aria-pressed={selected === category}
              >
                {t(`journal.categories.${category}`)}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <ol className="journal-list">
              {filtered.map((journal) => (
                <li key={journal.id}>
                  <Link to={`/journal/${journal.id}`} className="journal-entry">
                    <div className="journal-entry-copy">
                      <div className="meta-line">
                        <span>{t(`journal.categories.${journal.category}`)}</span>
                        <time dateTime={journal.date}>{journal.date}</time>
                      </div>
                      <h2>{tr(journal.title)}</h2>
                      <p>{tr(journal.excerpt)}</p>
                      <span className="journal-read-more">Read →</span>
                    </div>
                    {journal.cover ? (
                      <div className="journal-entry-cover" aria-hidden="true">
                        <img src={journal.cover} alt="" loading="lazy" />
                      </div>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ol>
          ) : (
            <p className="empty-state">{lang === 'zh' ? '这个分类还没有文章。' : 'Nothing in this category yet.'}</p>
          )}
        </main>

        <aside className="listing-sidebar journal-sidebar">
          <section>
            <h2>Archive</h2>
            <div className="archive-summary">
              <div><span>Notes</span><strong>{journals.length}</strong></div>
              <div><span>Years</span><strong>{years.length}</strong></div>
            </div>
          </section>
          <section>
            <h2>Collections</h2>
            <ul className="collection-list">
              {categories.slice(1).map((category) => {
                const count = journals.filter((journal) => journal.category === category).length
                return <li key={category}><span>{t(`journal.categories.${category}`)}</span><small>{count}</small></li>
              })}
            </ul>
          </section>
        </aside>
      </div>
    </article>
  )
}
