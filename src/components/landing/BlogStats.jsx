import { useLanguage } from '../../context/useLanguage'

export default function BlogStats({ stats }) {
  const { t } = useLanguage()

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-num">{stats.days}</div>
        <div className="stat-label">{t('landing.stats.days')}</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">{stats.lastUpdated}</div>
        <div className="stat-label">{t('landing.stats.lastUpdated')}</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">{stats.words.toLocaleString()}</div>
        <div className="stat-label">{t('landing.stats.words')}</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">{stats.posts}</div>
        <div className="stat-label">{t('landing.stats.posts')}</div>
      </div>
    </div>
  )
}
