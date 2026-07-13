import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { journals } from '../data/journals'

const SITE_BIRTH = new Date('2025-12-30T00:00:00+08:00')
const DAYS_ONLINE = Math.max(1, Math.floor((new Date().getTime() - SITE_BIRTH.getTime()) / 86400000))

export default function Landing() {
  const { lang, tr } = useLanguage()

  const recent = useMemo(
    () => [...journals].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3),
    [],
  )

  const stats = useMemo(() => {
    const words = journals.reduce((total, journal) => {
      const body = journal.body?.zh ?? ''
      return total + body.replace(/\s+/g, '').length
    }, 0)

    return {
      days: DAYS_ONLINE,
      posts: journals.length,
      words,
    }
  }, [])

  return (
    <article className="home-page">
      <header className="profile-header animate-block">
        <img className="profile-avatar" src="/avatar.jpg" alt="Jacky" />
        <div className="profile-copy">
          <p className="profile-kicker">Mathematics · XJTU</p>
          <h1>Jacky Hu</h1>
          <p className="profile-intro">
            {lang === 'zh'
              ? '在数学、人工智能与日常生活之间，保存一些认真想过的痕迹。'
              : 'Keeping thoughtful traces between mathematics, artificial intelligence, and everyday life.'}
          </p>
          <div className="profile-links" aria-label={lang === 'zh' ? '个人链接' : 'Profile links'}>
            <a href="https://github.com/JackyHu0314" target="_blank" rel="noopener noreferrer">GitHub <span>↗</span></a>
            <a href="https://www.xiaohongshu.com/search_result?keyword=JackyUnique" target="_blank" rel="noopener noreferrer">JackyUnique <span>↗</span></a>
            <a href="mailto:jackyhu2008.03.14@gmail.com">Email <span>↗</span></a>
          </div>
        </div>
      </header>

      <div className="home-content animate-block animate-block--delay">
        <section className="home-section" aria-labelledby="home-about-title">
          <h2 id="home-about-title" className="home-section-label">About</h2>
          <div className="home-section-body home-prose">
            <p>
              {lang === 'zh'
                ? '西安交通大学数学学院在读。现在主要学习 3D Generation 与相关生成模型，也会写下项目中的弯路、研究中的疑问和那些难以归类的情绪。'
                : 'A mathematics student at Xi’an Jiaotong University, currently studying 3D generation and related generative models—alongside notes on detours, questions, and harder-to-name feelings.'}
            </p>
            <Link className="inline-link" to="/about">
              {lang === 'zh' ? '更多关于我' : 'More about me'} <span>→</span>
            </Link>
          </div>
        </section>

        <section className="home-section" aria-labelledby="home-now-title">
          <h2 id="home-now-title" className="home-section-label">{lang === 'zh' ? '此刻' : 'Now'}</h2>
          <div className="home-section-body info-stack">
            <article className="info-card">
              <div>
                <p className="info-card-meta">Learning · 2026</p>
                <h3>3D Generation</h3>
                <p>{lang === 'zh' ? '从 3D 的来源与表示出发，学习重建、原生 3D 潜空间及扩散等生成路线，并理解每一代方法面对的瓶颈。' : 'Studying 3D representations, reconstruction, native 3D latent spaces, and diffusion-based generation through the bottlenecks that shaped each approach.'}</p>
              </div>
              <span className="status-dot"><i aria-hidden="true" />{lang === 'zh' ? '进行中' : 'Ongoing'}</span>
            </article>

            <Link className="info-card info-card--link" to="/music">
              <div>
                <p className="info-card-meta">Listening room · Side A</p>
                <h3>soft-spoken</h3>
                <p>{lang === 'zh' ? '轻柔唱作、深夜留白，以及四份仍在变化的私人歌单。' : 'Soft songwriting, late-night space, and four private playlists still taking shape.'}</p>
              </div>
              <span className="info-card-arrow" aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <section className="home-section" aria-labelledby="home-recent-title">
          <h2 id="home-recent-title" className="home-section-label">{lang === 'zh' ? '最近' : 'Recent'}</h2>
          <div className="home-section-body compact-post-list">
            {recent.map((journal) => (
              <Link className="compact-post" to={`/journal/${journal.id}`} key={journal.id}>
                <div>
                  <h3>{tr(journal.title)}</h3>
                  <p>{tr(journal.excerpt)}</p>
                </div>
                <time dateTime={journal.date}>{journal.date}</time>
              </Link>
            ))}
            <Link className="inline-link compact-post-more" to="/journal">
              {lang === 'zh' ? '查看全部随记' : 'View all notes'} <span>→</span>
            </Link>
          </div>
        </section>

        <section className="home-section" aria-labelledby="home-stats-title">
          <h2 id="home-stats-title" className="home-section-label">{lang === 'zh' ? '统计' : 'Stats'}</h2>
          <dl className="home-section-body home-stats">
            <div>
              <dt>{lang === 'zh' ? '随记' : 'Notes'}</dt>
              <dd>{stats.posts}</dd>
            </div>
            <div>
              <dt>{lang === 'zh' ? '运行天数' : 'Days online'}</dt>
              <dd>{stats.days}</dd>
            </div>
            <div>
              <dt>{lang === 'zh' ? '写下的字' : 'Characters'}</dt>
              <dd>{stats.words.toLocaleString()}</dd>
            </div>
          </dl>
        </section>
      </div>
    </article>
  )
}
