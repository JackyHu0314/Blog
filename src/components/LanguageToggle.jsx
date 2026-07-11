import { useLanguage } from '../context/LanguageContext'

export default function LanguageToggle() {
  const { lang, toggleLang, t } = useLanguage()

  return (
    <button
      onClick={toggleLang}
      className="language-toggle"
      title={t('lang.label')}
      aria-label={t('lang.label')}
    >
      <span className={`transition-opacity ${lang === 'zh' ? 'opacity-100' : 'opacity-40'}`}>中</span>
      <span className="mx-1 opacity-40">/</span>
      <span className={`transition-opacity ${lang === 'en' ? 'opacity-100' : 'opacity-40'}`}>EN</span>
    </button>
  )
}
