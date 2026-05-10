import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import GradientBackground from '../components/GradientBackground'
import ThemeToggle from '../components/ThemeToggle'
import LanguageToggle from '../components/LanguageToggle'
import BouncingBallLoader from '../components/BouncingBallLoader'
import { journals } from '../data/journals'

const SITE_BIRTH = new Date('2025-12-30')

function HeatMap({ journals }) {
  const { weeks, monthLabels } = useMemo(() => {
    const postDates = new Set(journals.map(j => j.date))
    const today = new Date()
    const start = new Date(today)
    start.setDate(today.getDate() - 364)
    start.setDate(start.getDate() - start.getDay())

    const result = []
    const months = []
    let cur = new Date(start)
    let lastMonth = -1
    let wi = 0
    while (cur <= today) {
      const week = []
      for (let d = 0; d < 7; d++) {
        const iso = cur.toISOString().slice(0, 10)
        const m = cur.getMonth()
        if (d === 0 && m !== lastMonth) {
          months.push({ col: wi, label: cur.toLocaleString('default', { month: 'short' }) })
          lastMonth = m
        }
        week.push({ date: iso, active: postDates.has(iso), future: cur > today })
        cur.setDate(cur.getDate() + 1)
      }
      result.push(week)
      wi++
    }
    const totalWeeks = wi
    return { weeks: result, monthLabels: months.map(m => ({ ...m, pct: (m.col / totalWeeks) * 100 })) }
  }, [journals])

  return (
    <div className="heatmap-wrap">
      <div style={{ position: 'relative' }}>
        <div className="heatmap-months">
          {monthLabels.map((m, i) => (
            <span key={i} className="heatmap-month" style={{ left: `${m.pct}%` }}>{m.label}</span>
          ))}
        </div>
        <div className="heatmap-grid" style={{ marginTop: 18 }}>
          {weeks.map((week, wi) => (
            <div key={wi} className="heatmap-col">
              {week.map(cell => (
                <div
                  key={cell.date}
                  className={`heatmap-cell${cell.future ? ' future' : cell.active ? ' active' : ''}`}
                  title={cell.date}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Landing() {
  const { t, lang } = useLanguage()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const stats = useMemo(() => {
    const now = new Date()
    const days = Math.floor((now - SITE_BIRTH) / 86400000)
    const words = journals.reduce((acc, j) => {
      const text = j.body?.zh || ''
      return acc + text.replace(/\s+/g, '').length
    }, 0)
    const lastUpdated = journals
      .map(j => j.date)
      .sort()
      .reverse()[0] || ''
    return { days, words, posts: journals.length, lastUpdated }
  }, [])

  function handleEnter() {
    if (loading) return
    setLoading(true)
    setTimeout(() => navigate('/journal'), 1200)
  }

  return (
    <div className="min-h-screen text-text-primary relative overflow-x-hidden">
      <GradientBackground />

      <div className="absolute top-6 right-6 z-20 flex items-center gap-1">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      {loading ? (
        <div className="min-h-screen flex flex-col items-center justify-center relative z-10">
          <BouncingBallLoader />
          <p className="mt-20 text-sm text-text-secondary text-center tracking-widest">
            {t('landing.entering')}
          </p>
        </div>
      ) : (
        <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 animate-fade-in-up">

          {/* Profile */}
          <div className="flex items-center gap-6 mb-10">
            <img src="/avatar.jpg" alt="Jacky" className="w-20 h-20 rounded-full object-cover border-2 border-card-border flex-shrink-0" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-1">
                {lang === 'zh' ? '你好，我是 Jacky' : "Hi, I'm Jacky"}
              </h1>
              <p className="text-text-secondary text-base leading-relaxed">
                {lang === 'zh'
                  ? '西安交通大学数学学院在读 · 关注具身智能与机器人'
                  : 'Math student at XJTU · Interested in Embodied AI & Robotics'}
              </p>
              <div className="flex gap-3 mt-3">
                <a href="https://github.com/JackyHu0314" target="_blank" rel="noopener noreferrer" className="social-pill">
                  <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/></svg>
                  GitHub
                </a>
                <a href="mailto:jackyhu2008.03.14@gmail.com" className="social-pill">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  Email
                </a>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2 className="section-label">{lang === 'zh' ? '教育经历' : 'Education'}</h2>
            <a href="https://math.xjtu.edu.cn/" target="_blank" rel="noopener noreferrer" className="edu-card">
              <div className="edu-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>
              </div>
              <div className="edu-info">
                <div className="edu-school">{lang === 'zh' ? '西安交通大学' : "Xi'an Jiaotong University"}</div>
                <div className="edu-dept">{lang === 'zh' ? '数学学院 · 本科在读' : 'School of Mathematics · Undergraduate'}</div>
              </div>
              <div className="edu-year">2023 –</div>
            </a>
          </div>

          {/* Stats */}
          <div className="mb-6">
            <h2 className="section-label">{lang === 'zh' ? '博客统计' : 'Blog Stats'}</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-num">{stats.days}</div>
                <div className="stat-label">{lang === 'zh' ? '在线天数' : 'Days Online'}</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">{stats.lastUpdated}</div>
                <div className="stat-label">{lang === 'zh' ? '最后更新' : 'Last Updated'}</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">{stats.words.toLocaleString()}</div>
                <div className="stat-label">{lang === 'zh' ? '总字数' : 'Total Words'}</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">{stats.posts}</div>
                <div className="stat-label">{lang === 'zh' ? '总文章数' : 'Total Posts'}</div>
              </div>
            </div>
          </div>

          {/* Heatmap */}
          <div className="mb-6">
            <h2 className="section-label">{lang === 'zh' ? '博客活跃度' : 'Blog Activity'}</h2>
            <HeatMap journals={journals} />
          </div>

          {/* Enter button */}
          <div className="flex justify-center mt-10">
            <button onClick={handleEnter} className="enter-btn">
              {t('landing.enter')}
            </button>
          </div>
        </div>
      )}

      <style>{`
        .social-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid var(--color-card-border);
          background: var(--color-card-bg);
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color 0.2s, border-color 0.2s;
        }
        .social-pill:hover { color: var(--color-text-primary); border-color: var(--color-text-secondary); }
        .section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text-secondary);
          margin-bottom: 10px;
        }
        .edu-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          border-radius: 14px;
          border: 1px solid var(--color-card-border);
          background: var(--color-card-bg);
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .edu-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(0,0,0,0.1);
          border-color: var(--color-text-secondary);
        }
        .dark .edu-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.4); }
        .edu-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: rgba(139,26,26,0.1);
          color: #8b1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .dark .edu-icon { background: rgba(220,80,80,0.12); color: #e07070; }
        .edu-info { flex: 1; }
        .edu-school { font-size: 15px; font-weight: 700; color: var(--color-text-primary); }
        .edu-dept { font-size: 13px; color: var(--color-text-secondary); margin-top: 2px; }
        .edu-year { font-size: 13px; color: var(--color-text-secondary); font-weight: 600; flex-shrink: 0; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        @media (max-width: 560px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
        .stat-card {
          padding: 16px;
          border-radius: 14px;
          border: 1px solid var(--color-card-border);
          background: var(--color-card-bg);
          text-align: center;
        }
        .stat-num { font-size: 22px; font-weight: 800; color: var(--color-text-primary); line-height: 1; }
        .stat-label { font-size: 11px; color: var(--color-text-secondary); margin-top: 6px; font-weight: 600; }
        .heatmap-wrap {
          padding: 16px;
          border-radius: 14px;
          border: 1px solid var(--color-card-border);
          background: var(--color-card-bg);
          overflow-x: auto;
        }
        .heatmap-months { position: relative; height: 16px; }
        .heatmap-month {
          position: absolute;
          font-size: 10px;
          color: var(--color-text-secondary);
          font-weight: 600;
        }
        .heatmap-grid { display: flex; gap: 3px; width: 100%; }
        .heatmap-col { display: flex; flex-direction: column; gap: 3px; flex: 1; }
        .heatmap-cell {
          aspect-ratio: 1;
          width: 100%;
          border-radius: 2px;
          background: var(--color-card-border);
          flex-shrink: 0;
        }
        .heatmap-cell.active { background: #4ade80; }
        .heatmap-cell.future { background: transparent; }
        .dark .heatmap-cell.active { background: #22c55e; }
        .enter-btn {
          padding: 12px 36px;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 700;
          border: 1.5px solid var(--color-card-border);
          background: var(--color-card-bg);
          color: var(--color-text-primary);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
          letter-spacing: 0.03em;
        }
        .enter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(0,0,0,0.12);
          border-color: var(--color-text-secondary);
        }
      `}</style>
    </div>
  )
}
