import { useLanguage } from '../../context/useLanguage'

export default function EducationCard() {
  const { t } = useLanguage()

  return (
    <a
      href="https://math.xjtu.edu.cn/"
      target="_blank"
      rel="noopener noreferrer"
      className="edu-card"
    >
      <div className="edu-icon">
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
        </svg>
      </div>
      <div className="edu-info">
        <div className="edu-school">{t('landing.education.school')}</div>
        <div className="edu-dept">{t('landing.education.department')}</div>
      </div>
      <div className="edu-year">2023 –</div>
    </a>
  )
}
