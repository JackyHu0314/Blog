import { useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function StarField() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (theme !== 'dark') return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animId
    let stars = []

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function initStars() {
      const count = window.innerWidth < 768 ? 80 : 160
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    function draw(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const s of stars) {
        const opacity = 0.3 + 0.7 * ((Math.sin(time * s.twinkleSpeed + s.phase) + 1) / 2)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 210, 255, ${opacity})`
        ctx.fill()

        s.y -= s.speed
        if (s.y < -5) {
          s.y = canvas.height + 5
          s.x = Math.random() * canvas.width
        }
      }
      animId = requestAnimationFrame(draw)
    }

    resize()
    initStars()
    animId = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [theme])

  if (theme !== 'dark') return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  )
}
