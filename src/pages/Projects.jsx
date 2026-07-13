import { projects } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'

const covers = [
  '/470494883_18474095842063026_901716736404074832_n.jpg',
  '/485368670_1200446478751605_7891334092090508916_n.jpg',
  '/557670496_18528678928063026_781080253549595360_n.jpg',
  '/605389799_18545600452063026_1347790464670012594_n.jpg',
]

export default function Projects() {
  const { t, tr, lang } = useLanguage()
  const tags = [...new Set(projects.flatMap((project) => project.tags))]

  return (
    <article className="listing-page">
      <header className="page-intro animate-block">
        <p className="page-kicker">Build log · Selected work</p>
        <h1 className="page-title">{t('projects.title')}</h1>
        <p className="page-description">{t('projects.subtitle')}</p>
      </header>

      <div className="listing-layout animate-block animate-block--delay">
        <main className="post-card-list">
          {projects.map((project, index) => (
            <a key={project.id} href={project.link} className="post-card" target="_blank" rel="noopener noreferrer">
              <div className="post-card__copy">
                <div className="meta-line">
                  <span>{tr(project.date)}</span>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h2>{tr(project.title)}</h2>
                <p>{tr(project.description)}</p>
                <div className="tag-list">
                  {project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
              <div className="post-card__cover" aria-hidden="true">
                <img src={covers[index]} alt="" loading="lazy" />
              </div>
            </a>
          ))}
        </main>

        <aside className="listing-sidebar">
          <section>
            <h2>{lang === 'zh' ? '关于这些项目' : 'About the work'}</h2>
            <p>{lang === 'zh' ? '大多是学习阶段的完整小项目：先跑通，再复盘，最后留下可复现的代码。' : 'Mostly complete learning projects: make it work, review it, and leave reproducible code behind.'}</p>
          </section>
          <section>
            <h2>{lang === 'zh' ? '技术标签' : 'Technologies'}</h2>
            <div className="sidebar-tags">
              {tags.slice(0, 12).map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </section>
          <a className="sidebar-link-card" href="https://github.com/JackyHu0314" target="_blank" rel="noopener noreferrer">
            <span>GitHub</span><strong>{lang === 'zh' ? '查看全部仓库' : 'All repositories'} ↗</strong>
          </a>
        </aside>
      </div>
    </article>
  )
}
