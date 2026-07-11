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

  return (
    <div>
      <header className="page-heading">
        <div>
          <p className="eyebrow">Archive / Writing</p>
          <h1 className="page-title">{lang === 'zh' ? '随记' : 'Field notes'}</h1>
        </div>
        <p className="page-lede">
          {lang === 'zh'
            ? '写技术的弯路，也写情绪的潮汐。每一篇都是当时的我，留给未来的一份现场记录。'
            : 'Notes on technical detours and emotional tides—each entry a field record left for a future self.'}
        </p>
      </header>

      <div className="journal-filters" aria-label={lang === 'zh' ? '按分类筛选' : 'Filter by category'}>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className="journal-filter"
            onClick={() => setSelected(category)}
            aria-pressed={selected === category}
          >
            {t('journal.categories.' + category)}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <ol className="journal-list">
          {filtered.map((journal, index) => (
            <li key={journal.id}>
              <Link to={'/journal/' + journal.id} className="journal-entry">
                <span className="journal-entry-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="journal-entry-copy">
                  <div className="journal-entry-meta">
                    <span className="journal-entry-category">{t('journal.categories.' + journal.category)}</span>
                    <span>{journal.date}</span>
                  </div>
                  <h2 className="journal-entry-title">{tr(journal.title)}</h2>
                  <p className="journal-entry-excerpt">{tr(journal.excerpt)}</p>
                </div>
                <div className="journal-entry-image">
                  {journal.cover ? <img src={journal.cover} alt="" loading="lazy" /> : null}
                </div>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p className="page-lede">{lang === 'zh' ? '这个分类还没有文章。' : 'Nothing in this category yet.'}</p>
      )}
    </div>
  )
}
