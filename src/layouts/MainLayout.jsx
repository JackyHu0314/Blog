import { Link, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import GradientBackground from '../components/GradientBackground'
import PageLoader from '../components/PageLoader'
import SocialLinks from '../components/SocialLinks'

export default function MainLayout() {
  return (
    <div className="site-shell">
      <GradientBackground />
      <PageLoader />
      <Navbar />
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="site-footer-meta">
            <p className="site-footer-copy">© 2026 Jacky Hu</p>
            <span aria-hidden="true">·</span>
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">
              CC BY-NC-SA 4.0
            </a>
            <span aria-hidden="true">·</span>
            <Link to="/policy">Privacy</Link>
          </div>
          <SocialLinks />
        </div>
      </footer>
    </div>
  )
}
