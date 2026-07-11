import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import GradientBackground from '../components/GradientBackground'
import PageLoader from '../components/PageLoader'
import SocialLinks from '../components/SocialLinks'
import { useLanguage } from '../context/LanguageContext'

export default function MainLayout() {
  const { lang } = useLanguage()

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
          <p className="site-footer-copy">
            {lang === 'zh'
              ? 'Jacky Hu · 记录技术、研究与内心天气'
              : 'Jacky Hu · Systems, research, and inner weather'}
          </p>
          <SocialLinks />
        </div>
      </footer>
    </div>
  )
}
