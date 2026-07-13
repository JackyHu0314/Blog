import { useLanguage } from '../context/LanguageContext'

export default function CategoryBadge({ label, active = false }) {
  const { t } = useLanguage()

  return (
    <span className="category-badge" data-active={active ? 'true' : 'false'}>
      {t(`journal.categories.${label}`) || label}
    </span>
  )
}
