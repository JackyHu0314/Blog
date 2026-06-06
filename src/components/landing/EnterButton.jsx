import { useLanguage } from '../../context/useLanguage'

export default function EnterButton({ onEnter }) {
  const { t } = useLanguage()

  return (
    <button onClick={onEnter} className="enter-btn">
      {t('landing.enter')}
    </button>
  )
}
