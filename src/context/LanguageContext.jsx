import { createContext, useContext, useState, useCallback } from 'react'
import { dict, pick } from '../i18n/dictionary'

const LanguageContext = createContext()

function getInitialLang() {
  const stored = localStorage.getItem('lang')
  if (stored === 'zh' || stored === 'en') return stored
  const nav = typeof navigator !== 'undefined' ? navigator.language : 'zh'
  return nav && nav.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang)

  const setLang = useCallback((next) => {
    setLangState(next)
    localStorage.setItem('lang', next)
  }, [])

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === 'zh' ? 'en' : 'zh'
      localStorage.setItem('lang', next)
      return next
    })
  }, [])

  const t = useCallback(
    (path) => {
      const keys = path.split('.')
      let node = dict[lang]
      for (const k of keys) {
        if (node == null) return path
        node = node[k]
      }
      return node ?? path
    },
    [lang]
  )

  const tr = useCallback((value) => pick(value, lang), [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, tr }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
