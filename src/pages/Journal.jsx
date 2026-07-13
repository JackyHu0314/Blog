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
        <p className="page-kicker">Archive · Writing</p>
        <h1 className="page-title">{lang === 'zh' ? '随记' : 'Field Notes'}</h1>
        <p className="page-description">
          {lang === 'zh'
            ? '写技术的弯路，也写情绪的潮汐。每一篇都是留给未来的一份现场记录。'
            : 'Technical detours and emotional tides—each entry a field record for a future self.'}
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
                      <span className="journal-read-more">{lang === 'zh' ? '继续阅读' : 'Read note'} →</span>
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
            <h2>{lang === 'zh' ? '归档' : 'Archive'}</h2>
            <div className="archive-summary">
              <div><span>{lang === 'zh' ? '文章' : 'Notes'}</span><strong>{journals.length}</strong></div>
              <div><span>{lang === 'zh' ? '年份' : 'Years'}</span><strong>{years.length}</strong></div>
            </div>
          </section>
          <section>
            <h2>{lang === 'zh' ? '分类' : 'Collections'}</h2>
            <ul className="collection-list">
              {categories.slice(1).map((category) => {
                const count = journals.filter((journal) => journal.category === category).length
                return <li key={category}><span>{t(`journal.categories.${category}`)}</span><small>{count}</small></li>
              })}
            </ul>
          </section>
          <p className="sidebar-quiet-note">{lang === 'zh' ? '有些文字只是为了记住当时的天气。' : 'Some notes exist only to remember the weather of that moment.'}</p>
        </aside>
      </div>
    </article>
  )
}
