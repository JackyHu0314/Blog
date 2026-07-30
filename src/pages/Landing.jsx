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
            Video Generation / Notes / Music
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
                ? '西安交通大学数学学院本科生。目前关注 Video Generation。'
                : 'Mathematics student at Xi’an Jiaotong University. Currently focused on video generation.'}
            </p>
            <Link className="inline-link" to="/about">
              About <span>→</span>
            </Link>
          </div>
        </section>

        <section className="home-section" aria-labelledby="home-now-title">
          <h2 id="home-now-title" className="home-section-label">Now</h2>
          <div className="home-section-body info-stack">
            <article className="info-card">
              <div>
                <p className="info-card-meta">Current · 2026</p>
                <h3>Video Generation</h3>
                <p>{lang === 'zh' ? '目前关注 Video Generation。' : 'Current focus.'}</p>
              </div>
              <span className="status-dot"><i aria-hidden="true" />Ongoing</span>
            </article>

            <Link className="info-card info-card--link" to="/music">
              <div>
                <p className="info-card-meta">Music · On repeat</p>
                <h3>On Repeat</h3>
                <p>{lang === 'zh' ? 'Hayd，以及四份 Apple Music 歌单。' : 'Hayd and four Apple Music playlists.'}</p>
              </div>
              <span className="info-card-arrow" aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <section className="home-section" aria-labelledby="home-recent-title">
          <h2 id="home-recent-title" className="home-section-label">Recent</h2>
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
              All notes <span>→</span>
            </Link>
          </div>
        </section>

        <section className="home-section" aria-labelledby="home-stats-title">
          <h2 id="home-stats-title" className="home-section-label">Stats</h2>
          <dl className="home-section-body home-stats">
            <div>
              <dt>Notes</dt>
              <dd>{stats.posts}</dd>
            </div>
            <div>
              <dt>Days online</dt>
              <dd>{stats.days}</dd>
            </div>
            <div>
              <dt>Characters</dt>
              <dd>{stats.words.toLocaleString()}</dd>
            </div>
          </dl>
        </section>
      </div>
    </article>
  )
}
