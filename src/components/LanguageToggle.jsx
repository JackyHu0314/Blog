import { useLanguage } from '../context/LanguageContext'

export default function LanguageToggle() {
  const { lang, toggleLang, t } = useLanguage()

  return (
    <button
      onClick={toggleLang}
      className="px-2.5 py-1.5 rounded-lg text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors"
      title={t('lang.label')}
      aria-label={t('lang.label')}
    >
      <span className={`transition-opacity ${lang === 'zh' ? 'opacity-100' : 'opacity-40'}`}>中</span>
      <span className="mx-1 opacity-40">/</span>
      <span className={`transition-opacity ${lang === 'en' ? 'opacity-100' : 'opacity-40'}`}>EN</span>
    </button>
  )
}
