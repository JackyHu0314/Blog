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
    { to: '/music', key: 'nav.music' },
    { to: '/projects', key: 'nav.projects' },
    { to: '/research', key: 'nav.research' },
    { to: '/about', key: 'nav.about' },
  ]

  const navClass = ({ isActive }) => 'nav-link' + (isActive ? ' is-active' : '')

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <div className="nav-inner">
        <NavLink to="/" className="brand-link" aria-label="Jacky's Field Notes home" onClick={() => setOpen(false)}>
          <span className="brand-name brand-name-full">Jacky’s Field Notes</span>
          <span className="brand-name brand-name-short">J / Notes</span>
          <span className="brand-meta">XJTU · EST. 2025</span>
        </NavLink>

        <div className="nav-desktop">
          {links.map(({ to, key }) => (
            <NavLink key={to} to={to} className={navClass} onClick={() => setOpen(false)}>
              {t(key)}
            </NavLink>
          ))}
        </div>

        <div className="nav-actions">
          <SearchBox />
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="19" height="19" aria-hidden="true">
              {open ? <path d="M5 5l14 14M19 5 5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-navigation" className="mobile-panel">
          {links.map(({ to, key }) => (
            <NavLink key={to} to={to} className={navClass} onClick={() => setOpen(false)}>
              {t(key)}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}
