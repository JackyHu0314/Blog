import { useLanguage } from '../context/LanguageContext'
import { research } from '../data/research'

const covers = [
  '/476777263_1172193671576886_484753037395174061_n.jpg',
  '/590403149_18545600473063026_1403862960695336920_n.jpg',
  '/604069869_18545600443063026_695876252491310582_n.jpg',
  '/604444198_18545600464063026_3288618535915015183_n.jpg',
  '/476439329_1169534361842817_5942725893209506020_n.jpg',
]

const statusOrder = { '进行中': 0, '规划中': 1, '已完成': 2 }

export default function Research() {
  const { t, tr, lang } = useLanguage()
  const ordered = [...research].sort(
    (a, b) => (statusOrder[a.status] ?? 1) - (statusOrder[b.status] ?? 1),
  )
  const tags = [...new Set(research.flatMap((item) => item.tags))]

  return (
    <article className="listing-page research-page">
      <header className="page-intro animate-block">
        <p className="page-kicker">Research map · In progress</p>
        <h1 className="page-title">{t('research.title')}</h1>
        <p className="page-description">{t('research.subtitle')}</p>
      </header>

      <div className="listing-layout animate-block animate-block--delay">
        <main className="post-card-list">
          {ordered.map((item, index) => (
            <article className="post-card research-card" key={item.id}>
              <div className="post-card__copy">
                <div className="meta-line">
                  <span className={`research-status status-${item.status}`}>{t(`research.status.${item.status}`)}</span>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h2>{tr(item.title)}</h2>
                <p>{tr(item.abstract)}</p>
                <div className="tag-list">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
              <div className="post-card__cover" aria-hidden="true">
                <img src={covers[index]} alt="" loading="lazy" />
              </div>
            </article>
          ))}
        </main>

        <aside className="listing-sidebar">
          <section>
            <h2>{lang === 'zh' ? '学习路径' : 'Study path'}</h2>
            <ol className="sidebar-steps">
              <li><span>01</span>{lang === 'zh' ? '深度学习与生成基础' : 'Deep learning and generation'}</li>
              <li><span>02</span>{lang === 'zh' ? '3D 表示与重建' : '3D representations and reconstruction'}</li>
              <li><span>03</span>{lang === 'zh' ? '3D 生成模型' : '3D generative models'}</li>
            </ol>
          </section>
          <section>
            <h2>{lang === 'zh' ? '主题' : 'Topics'}</h2>
            <div className="sidebar-tags">
              {tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </section>
        </aside>
      </div>
    </article>
  )
}
