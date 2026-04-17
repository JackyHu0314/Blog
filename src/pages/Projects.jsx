import { projects } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'

const covers = [
  '/480504610_1175967434532843_8551302010516112648_n.jpg',
  '/485368670_1200446478751605_7891334092090508916_n.jpg',
  '/557670496_18528678928063026_781080253549595360_n.jpg',
]

export default function Projects() {
  const { t, tr } = useLanguage()

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('projects.title')}</h1>
      <p className="text-text-secondary mb-8">{t('projects.subtitle')}</p>

      <div className="pcard-list">
        {projects.map((project, i) => (
          <a key={project.id} href={project.link} className="pcard">
            <div className="pcard-text">
              <div className="pcard-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="pcard-tag">{tag}</span>
                ))}
              </div>
              <h2 className="pcard-title">{tr(project.title)}</h2>
              <p className="pcard-desc">{tr(project.description)}</p>
              <span className="pcard-link">{t('projects.viewDetail')}</span>
            </div>
            <div className="pcard-img-wrap">
              <img src={covers[i % covers.length]} alt="" className="pcard-img" loading="lazy" />
            </div>
          </a>
        ))}
      </div>

      <style>{`
        .pcard-list { display: flex; flex-direction: column; gap: 20px; }
        .pcard {
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
        .pcard:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          border-color: var(--color-text-secondary);
        }
        .dark .pcard:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.5); }
        .pcard-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 0;
        }
        .pcard-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .pcard-tag {
          padding: 2px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          background: var(--color-bg-secondary);
          color: var(--color-text-secondary);
          border: 1px solid var(--color-card-border);
        }
        .pcard-title {
          font-size: 20px;
          font-weight: 700;
          color: #000000;
          line-height: 1.35;
          margin: 0;
        }
        .dark .pcard-title { color: #e8eaed; }
        .pcard-desc {
          font-size: 14px;
          color: var(--color-text-secondary);
          line-height: 1.7;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pcard-link {
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-secondary);
          margin-top: auto;
        }
        .pcard:hover .pcard-link { color: var(--color-text-primary); }
        .pcard-img-wrap {
          flex-shrink: 0;
          width: 160px;
          height: 120px;
          border-radius: 10px;
          overflow: hidden;
          align-self: center;
        }
        .pcard-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s var(--ease-silk);
        }
        .pcard:hover .pcard-img { transform: scale(1.06); }
        @media (max-width: 560px) {
          .pcard { flex-direction: column; }
          .pcard-img-wrap { width: 100%; height: 160px; }
        }
      `}</style>
    </div>
  )
}
