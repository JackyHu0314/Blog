import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { journals } from '../data/journals'
import { useLanguage } from '../context/LanguageContext'
import CategoryBadge from '../components/CategoryBadge'

const categories = ['全部', '情感', '学业', '科研', '生活', '技术']

export default function Journal() {
  const [selected, setSelected] = useState('全部')
  const { t, tr } = useLanguage()

  const filtered = useMemo(() => {
    const list = selected === '全部'
      ? journals
      : journals.filter(j => j.category === selected)
    return [...list].sort((a, b) => b.date.localeCompare(a.date))
  }, [selected])

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-text-primary">{t('journal.title')}</h1>
      <p className="text-text-secondary mb-8">{t('journal.subtitle')}</p>

      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className="cursor-pointer appearance-none border-0 bg-transparent p-0"
            aria-pressed={selected === cat}
          >
            <CategoryBadge label={cat} active={selected === cat} />
          </button>
        ))}
      </div>

      <div className="jcard-list">
        {filtered.map((journal) => (
          <Link key={journal.id} to={`/journal/${journal.id}`} className="jcard">
            <div className="jcard-text">
              <div className="jcard-meta">
                <CategoryBadge label={journal.category} />
                <span className="jcard-date">{journal.date}</span>
              </div>
              <h2 className="jcard-title">{tr(journal.title)}</h2>
              <p className="jcard-excerpt">{tr(journal.excerpt)}</p>
            </div>
            <div className="jcard-img-wrap">
              {journal.cover
                ? <img src={journal.cover} alt="" className="jcard-img" loading="lazy" />
                : <div className="jcard-img-placeholder" />
              }
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="text-text-secondary text-center py-12 text-sm">— 暂无文章 —</p>
        )}
      </div>

      <style>{`
        .jcard-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .jcard {
          display: flex;
          align-items: stretch;
          gap: 24px;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid var(--color-card-border);
          background: var(--color-card-bg);
          text-decoration: none;
          color: inherit;
          transition: transform 0.25s var(--ease-silk), box-shadow 0.25s var(--ease-silk), border-color 0.25s var(--ease-silk);
          overflow: hidden;
        }
        .jcard:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          border-color: var(--color-text-secondary);
        }
        .dark .jcard:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        .jcard-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 0;
        }
        .jcard-meta {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .jcard-date {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 12px;
          color: var(--color-text-secondary);
          letter-spacing: 0.04em;
        }
        .jcard-title {
          font-size: 20px;
          font-weight: 700;
          color: #000000;
          line-height: 1.35;
          margin: 0;
        }
        .dark .jcard-title { color: #e8eaed; }
        .jcard-excerpt {
          font-size: 14px;
          color: var(--color-text-secondary);
          line-height: 1.7;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .jcard-img-wrap {
          flex-shrink: 0;
          width: 160px;
          height: 120px;
          border-radius: 10px;
          overflow: hidden;
          align-self: center;
        }
        .jcard-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s var(--ease-silk);
        }
        .jcard:hover .jcard-img { transform: scale(1.06); }
        .jcard-img-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--color-bg-secondary), var(--color-card-border));
        }
        @media (max-width: 560px) {
          .jcard { flex-direction: column; }
          .jcard-img-wrap { width: 100%; height: 160px; }
        }
      `}</style>
    </div>
  )
}
