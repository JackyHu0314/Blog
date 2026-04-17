import { useTheme } from '../context/ThemeContext'

export default function GradientBackground() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const bgColor = isDark ? '#000000' : '#F3F3F3'
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.04)' : '#E1E1E1'

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        backgroundColor: bgColor,
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, ${gridColor} 25%, ${gridColor} 26%, transparent 27%, transparent 74%, ${gridColor} 75%, ${gridColor} 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, ${gridColor} 25%, ${gridColor} 26%, transparent 27%, transparent 74%, ${gridColor} 75%, ${gridColor} 76%, transparent 77%, transparent)
        `,
        backgroundSize: '55px 55px',
      }}
    />
  )
}
