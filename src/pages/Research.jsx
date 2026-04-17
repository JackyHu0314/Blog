import { useLanguage } from '../context/LanguageContext'
import { research } from '../data/research'

const covers = [
  '/586834157_18540090169063026_3893446045643101660_n.jpg',
  '/590403149_18545600473063026_1403862960695336920_n.jpg',
  '/604069869_18545600443063026_695876252491310582_n.jpg',
]

const statusColors = {
  '进行中': { bg: 'rgba(34,197,94,0.12)', fg: '#15803d', border: '#15803d' },
  '已完成': { bg: 'rgba(59,130,246,0.12)', fg: '#1d4ed8', border: '#1d4ed8' },
  '规划中': { bg: 'rgba(245,158,11,0.12)', fg: '#b45309', border: '#b45309' },
}
const statusColorsDark = {
  '进行中': { bg: 'rgba(34,197,94,0.18)', fg: '#4ade80', border: '#4ade80' },
  '已完成': { bg: 'rgba(59,130,246,0.18)', fg: '#60a5fa', border: '#60a5fa' },
  '规划中': { bg: 'rgba(245,158,11,0.18)', fg: '#fbbf24', border: '#fbbf24' },
}

export default function Research() {
  const { t, tr } = useLanguage()

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('research.title')}</h1>
      <p className="text-text-secondary mb-8">{t('research.subtitle')}</p>

      <div className="rcard-list">
        {research.map((item, i) => {
          const sc = statusColors[item.status] || statusColors['规划中']
          const scd = statusColorsDark[item.status] || statusColorsDark['规划中']
          return (
            <div key={item.id} className="rcard">
              <div className="rcard-text">
                <div className="rcard-meta">
                  <span className="rcard-status" style={{
                    background: sc.bg, color: sc.fg, border: `1.5px solid ${sc.border}`
                  }}>
                    {t(`research.status.${item.status}`)}
                  </span>
                </div>
                <h2 className="rcard-title">{tr(item.title)}</h2>
                <p className="rcard-abstract">{tr(item.abstract)}</p>
                <div className="rcard-tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="rcard-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="rcard-img-wrap">
                <img src={covers[i % covers.length]} alt="" className="rcard-img" loading="lazy" />
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        .rcard-list { display: flex; flex-direction: column; gap: 20px; }
        .rcard {
          display: flex;
          align-items: stretch;
          gap: 24px;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid var(--color-card-border);
          background: var(--color-card-bg);
          overflow: hidden;
          transition: transform 0.25s var(--ease-silk), box-shadow 0.25s var(--ease-silk), border-color 0.25s var(--ease-silk);
        }
        .rcard:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          border-color: var(--color-text-secondary);
        }
        .dark .rcard:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.5); }
        .rcard-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 0;
        }
        .rcard-meta { display: flex; align-items: center; gap: 10px; }
        .rcard-status {
          padding: 2px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
        }
        .rcard-title {
          font-size: 20px;
          font-weight: 700;
          color: #000000;
          line-height: 1.35;
          margin: 0;
        }
        .dark .rcard-title { color: #e8eaed; }
        .rcard-abstract {
          font-size: 14px;
          color: var(--color-text-secondary);
          line-height: 1.7;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .rcard-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .rcard-tag {
          padding: 2px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          background: var(--color-bg-secondary);
          color: var(--color-text-secondary);
          border: 1px solid var(--color-card-border);
        }
        .rcard-img-wrap {
          flex-shrink: 0;
          width: 160px;
          height: 120px;
          border-radius: 10px;
          overflow: hidden;
          align-self: center;
        }
        .rcard-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s var(--ease-silk);
        }
        .rcard:hover .rcard-img { transform: scale(1.06); }
        @media (max-width: 560px) {
          .rcard { flex-direction: column; }
          .rcard-img-wrap { width: 100%; height: 160px; }
        }
      `}</style>
    </div>
  )
}
