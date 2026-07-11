const links = [
  {
    key: 'github',
    label: 'GitHub',
    href: 'https://github.com/JackyHu0314',
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
      </svg>
    ),
  },
  {
    key: 'xiaohongshu',
    label: 'JackyUnique',
    href: 'https://www.xiaohongshu.com/search_result?keyword=JackyUnique',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="4" />
        <path d="M7 9h10M7 13h6M7 17h4" />
      </svg>
    ),
  },
  {
    key: 'email',
    label: 'Email',
    href: 'mailto:jackyhu2008.03.14@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
]

export default function SocialLinks() {
  return (
    <ul className="social-links" aria-label="Social links">
      {links.map((item) => (
        <li key={item.key}>
          <a
            className="social-link"
            href={item.href}
            target={item.key === 'email' ? undefined : '_blank'}
            rel={item.key === 'email' ? undefined : 'noopener noreferrer'}
            aria-label={item.key === 'xiaohongshu' ? '小红书 JackyUnique' : item.label}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
