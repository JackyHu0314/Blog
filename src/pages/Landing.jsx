import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/useLanguage'
import GradientBackground from '../components/GradientBackground'
import ThemeToggle from '../components/ThemeToggle'
import LanguageToggle from '../components/LanguageToggle'
import BouncingBallLoader from '../components/BouncingBallLoader'
import ActivityHeatMap from '../components/landing/ActivityHeatMap'
import BlogStats from '../components/landing/BlogStats'
import EducationCard from '../components/landing/EducationCard'
import EnterButton from '../components/landing/EnterButton'
import ProfileIntro from '../components/landing/ProfileIntro'
import { getJournalStats, journalMeta } from '../data/journalMeta'

export default function Landing() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const timeoutRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const stats = useMemo(() => getJournalStats(), [])

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }, [])

  function handleEnter() {
    if (loading) return
    setLoading(true)
    timeoutRef.current = setTimeout(() => navigate('/about'), 1200)
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
          <ProfileIntro />

          <section className="mb-6">
            <h2 className="section-label">{t('landing.sections.education')}</h2>
            <EducationCard />
          </section>

          <section className="mb-6">
            <h2 className="section-label">{t('landing.sections.stats')}</h2>
            <BlogStats stats={stats} />
          </section>

          <section className="mb-6">
            <h2 className="section-label">{t('landing.sections.activity')}</h2>
            <ActivityHeatMap posts={journalMeta} />
          </section>

          <div className="flex justify-center mt-10">
            <EnterButton onEnter={handleEnter} />
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
