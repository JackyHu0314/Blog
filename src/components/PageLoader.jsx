import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageLoader() {
  const location = useLocation()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const firstRender = useRef(true)
  const timerRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }

    setProgress(0)
    setVisible(true)

    let current = 0
    const tick = () => {
      current += (90 - current) * 0.08
      setProgress(current)
      if (current < 89) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    timerRef.current = setTimeout(() => {
      cancelAnimationFrame(rafRef.current)
      setProgress(100)
      setTimeout(() => setVisible(false), 300)
    }, 500)

    return () => {
      clearTimeout(timerRef.current)
      cancelAnimationFrame(rafRef.current)
    }
  }, [location.pathname])

  if (!visible) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #a855f7, #ec4899, #06b6d4)',
          transition: progress === 100 ? 'width 0.15s ease, opacity 0.3s ease' : 'width 0.1s linear',
          opacity: progress === 100 ? 0 : 1,
          boxShadow: '0 0 8px rgba(168,85,247,0.8)',
        }}
      />
    </div>
  )
}
