import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import GradientBackground from '../components/GradientBackground'
import PageLoader from '../components/PageLoader'

export default function MainLayout() {
  return (
    <div className="min-h-screen text-text-primary relative">
      <GradientBackground />
      <PageLoader />

      <Navbar />

      <div className="px-4 md:px-8 py-8 md:py-10">
        <main
          className="
            mx-auto max-w-[1024px] w-full
            bg-page-bg
            rounded-2xl
            border border-card-border
            px-6 md:px-10 py-10 md:py-14
            animate-fade-in-up
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
