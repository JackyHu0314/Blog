import { useLanguage } from '../context/LanguageContext'

const colors = {
  '情感': {
    light: { bg: 'rgba(244, 114, 182, 0.15)', fg: '#be185d', border: '#be185d' },
    dark:  { bg: 'rgba(244, 114, 182, 0.18)', fg: '#fbcfe8', border: '#f472b6' },
  },
  '学业': {
    light: { bg: 'rgba(59, 130, 246, 0.12)', fg: '#1d4ed8', border: '#1d4ed8' },
    dark:  { bg: 'rgba(59, 130, 246, 0.18)', fg: '#bfdbfe', border: '#60a5fa' },
  },
  '科研': {
    light: { bg: 'rgba(139, 92, 246, 0.12)', fg: '#6d28d9', border: '#6d28d9' },
    dark:  { bg: 'rgba(139, 92, 246, 0.18)', fg: '#ddd6fe', border: '#a78bfa' },
  },
  '生活': {
    light: { bg: 'rgba(34, 197, 94, 0.12)', fg: '#15803d', border: '#15803d' },
    dark:  { bg: 'rgba(34, 197, 94, 0.18)', fg: '#bbf7d0', border: '#4ade80' },
  },
  '技术': {
    light: { bg: 'rgba(245, 158, 11, 0.15)', fg: '#b45309', border: '#b45309' },
    dark:  { bg: 'rgba(245, 158, 11, 0.18)', fg: '#fde68a', border: '#fbbf24' },
  },
  '全部': {
    light: { bg: 'rgba(0, 0, 0, 0.07)', fg: '#000000', border: '#000000' },
    dark:  { bg: 'rgba(255, 255, 255, 0.10)', fg: '#ffffff', border: '#ffffff' },
  },
}

export default function CategoryBadge({ label, active = false }) {
  const { t } = useLanguage()
  const palette = colors[label] || colors['全部']
  const text = t(`journal.categories.${label}`) || label

  return (
    <span
      className="category-badge"
      data-active={active ? 'true' : 'false'}
      style={{
        '--cb-light-bg': palette.light.bg,
        '--cb-light-fg': palette.light.fg,
        '--cb-light-border': palette.light.border,
        '--cb-dark-bg': palette.dark.bg,
        '--cb-dark-fg': palette.dark.fg,
        '--cb-dark-border': palette.dark.border,
      }}
    >
      {text}
      <style>{`
        .category-badge {
          display: inline-flex;
          align-items: center;
          padding: 2px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.02em;
          background: var(--cb-light-bg);
          color: var(--cb-light-fg);
          border: 1.5px solid var(--cb-light-border);
          transition: background 0.25s var(--ease-silk), border-color 0.25s var(--ease-silk);
          white-space: nowrap;
        }
        .dark .category-badge {
          background: var(--cb-dark-bg);
          color: var(--cb-dark-fg);
          border-color: var(--cb-dark-border);
        }
        .category-badge[data-active="true"] {
          background: var(--cb-light-fg);
          color: #fff;
          border-color: var(--cb-light-fg);
        }
        .dark .category-badge[data-active="true"] {
          background: var(--cb-dark-fg);
          color: #000;
          border-color: var(--cb-dark-fg);
        }
      `}</style>
    </span>
  )
}
