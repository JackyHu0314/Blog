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
      updated: recent[0]?.date ?? '—',
    }
  }, [recent])

  return (
    <div className="home-root">
      <section className="home-hero" aria-labelledby="home-title">
        <div>
          <p className="eyebrow">Jacky Hu · Personal archive 01</p>
          <h1 id="home-title" className="home-title">
            {lang === 'zh' ? (
              <>在技术与生活之间，留下<em>真实的纹理</em>。</>
            ) : (
              <>Notes on systems, research, and the <em>inner weather</em>.</>
            )}
          </h1>
          <p className="home-intro">
            {lang === 'zh'
              ? '西安交通大学数学学院在读。这里收集我对具身智能、代码、学习与日常情绪的观察——不追求完美答案，只留下认真想过的痕迹。'
              : 'A mathematics student at Xi’an Jiaotong University, collecting observations on embodied AI, code, learning, and everyday life—less about perfect answers, more about honest traces.'}
          </p>

          <div className="home-actions">
            <Link to="/journal" className="primary-link">
              {lang === 'zh' ? '开始阅读' : 'Read the notes'}
            </Link>
            <Link to="/music" className="secondary-link">
              {lang === 'zh' ? '进入音乐空间' : 'Enter music room'}
            </Link>
          </div>

          <div className="home-socials" aria-label="Social profiles">
            <a className="home-social-link" href="https://github.com/JackyHu0314" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a className="home-social-link" href="https://www.xiaohongshu.com/search_result?keyword=JackyUnique" target="_blank" rel="noopener noreferrer">小红书 · JackyUnique ↗</a>
            <a className="home-social-link" href="mailto:jackyhu2008.03.14@gmail.com">Email ↗</a>
          </div>
        </div>

        <figure className="portrait-figure">
          <img className="portrait-image" src="/avatar.jpg" alt="Jacky's hand-drawn smile avatar" />
          <figcaption className="portrait-caption">
            <span>XJTU / Mathematics</span>
            <span>Xi’an, CN</span>
          </figcaption>
        </figure>
      </section>

      <section className="home-index-grid" aria-labelledby="recent-title">
        <div>
          <p className="eyebrow">Index / Recent</p>
          <h2 id="recent-title" className="home-section-title">
            {lang === 'zh' ? '最近写下' : 'Recent dispatches'}
          </h2>
          <div className="home-stats" aria-label={lang === 'zh' ? '博客统计' : 'Blog statistics'}>
            <div className="home-stat">
              <span className="home-stat-value">{stats.posts}</span>
              <span className="home-stat-label">{lang === 'zh' ? '篇随记' : 'Notes'}</span>
            </div>
            <div className="home-stat">
              <span className="home-stat-value">{stats.days}</span>
              <span className="home-stat-label">{lang === 'zh' ? '天在线' : 'Days online'}</span>
            </div>
            <div className="home-stat">
              <span className="home-stat-value">{stats.words.toLocaleString()}</span>
              <span className="home-stat-label">{lang === 'zh' ? '中文字' : 'Chinese chars'}</span>
            </div>
            <div className="home-stat">
              <span className="home-stat-value">{stats.updated.slice(5)}</span>
              <span className="home-stat-label">{lang === 'zh' ? '最后更新' : 'Last update'}</span>
            </div>
          </div>
        </div>

        <ol className="dispatch-list">
          {recent.map((journal, index) => (
            <li key={journal.id}>
              <Link className="dispatch-link" to={'/journal/' + journal.id}>
                <span className="dispatch-index">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="dispatch-title">{tr(journal.title)}</h3>
                <span className="dispatch-meta">{journal.category} · {journal.date}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-music" aria-labelledby="home-music-title">
        <div>
          <p className="eyebrow">Listening room / Side B</p>
          <h2 id="home-music-title" className="home-music-quote">
            {lang === 'zh' ? <>有些歌，先于语言<span>抵达</span>。</> : <>Some songs arrive <span>before the words do</span>.</>}
          </h2>
          <Link to="/music" className="text-link">
            {lang === 'zh' ? '查看听歌笔记与歌单' : 'Open listening notes and playlists'}
          </Link>
        </div>
        <div className="record-visual" aria-hidden="true" />
      </section>
    </div>
  )
}
