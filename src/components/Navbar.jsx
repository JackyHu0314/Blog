import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import SearchBox from './SearchBox'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()

  const links = [
    { to: '/journal', key: 'nav.journal' },
    { to: '/about', key: 'nav.about' },
    { to: '/projects', key: 'nav.projects' },
    { to: '/research', key: 'nav.research' },
  ]

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-nav-bg border-b border-card-border">
      <div className="max-w-[1024px] mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink
          to="/"
          className="brand-link text-2xl font-bold tracking-tight text-text-primary"
        >
          Jacky's Blog
        </NavLink>

        <div className="hidden md:flex items-center gap-1">
          {links.map(({ to, key }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `pearl-nav-btn ${isActive ? 'pearl-nav-active' : ''}`
              }
            >
              <div className="pearl-wrap">
                <p>
                  <span>✧</span>
                  <span>✦</span>
                  {t(key)}
                </p>
              </div>
            </NavLink>
          ))}

          <div className="mx-2"><SearchBox /></div>
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-text-secondary hover:text-text-primary"
            aria-label="menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              {open ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-card-border bg-nav-bg px-6 py-4 space-y-3">
          {links.map(({ to, key }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `nav-link block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'is-active' : 'text-text-secondary'
                }`
              }
            >
              <span className="nav-link-text">{t(key)}</span>
            </NavLink>
          ))}
          <div className="pt-3">
            <SearchBox />
          </div>
        </div>
      )}
    </nav>
  )
}
