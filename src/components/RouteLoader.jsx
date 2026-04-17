import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import SpinnerRing from './SpinnerRing'

export default function RouteLoader() {
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  const firstRenderRef = useRef(true)

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    setVisible(true)
    const t = setTimeout(() => setVisible(false), 500)
    return () => clearTimeout(t)
  }, [location.pathname])

  if (!visible) return null

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
    >
      <div className="absolute inset-0 bg-page-bg/60 backdrop-blur-sm" />
      <div className="relative">
        <SpinnerRing />
      </div>
    </div>
  )
}
