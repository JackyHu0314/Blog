/**
 * SocialLinks — 导航栏底部/Footer 用的社交图标组件
 *
 * 设计：静默状态全部灰度 + 半透，hover 恢复品牌色 + 上浮 + tooltip
 */
const links = [
  {
    key: 'github',
    label: 'GitHub',
    href: 'https://github.com/JackyHu0314',
    color: '#24262a',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
      </svg>
    ),
  },
  {
    key: 'email',
    label: 'Email',
    href: 'mailto:jackyhu2008.03.14@gmail.com',
    color: 'linear-gradient(135deg, #0ed2da, #5f29c7)',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
      </svg>
    ),
  },
]

export default function SocialLinks({ size = 38 }) {
  return (
    <ul className="social-links" style={{ '--sl-size': `${size}px` }}>
      {links.map((item) => (
        <li key={item.key} className="social-item">
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            data-social={item.key}
            style={{ '--brand': item.color }}
          >
            <div className="filled" />
            <span className="svg-wrap">{item.svg}</span>
          </a>
          <div className="tooltip">{item.label}</div>
        </li>
      ))}
      <style>{`
        .social-links {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0;
          margin: 0;
        }
        .social-item { position: relative; }
        .social-item a {
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          width: var(--sl-size);
          height: var(--sl-size);
          border-radius: 50%;
          color: var(--color-text-secondary);
          background-color: var(--color-bg-secondary);
          transition: color 0.3s ease-in-out, transform 0.3s var(--ease-silk), box-shadow 0.3s ease-in-out, filter 0.4s var(--ease-silk);
          filter: grayscale(1);
          opacity: 0.65;
        }
        .social-item a:hover {
          filter: grayscale(0);
          opacity: 1;
          color: #fff;
          transform: translateY(-5px);
          box-shadow: 0 10px 20px -8px rgba(0,0,0,0.25);
        }
        .social-item a .svg-wrap { position: relative; z-index: 1; display: flex; }
        .social-item a .filled {
          position: absolute;
          left: 0; bottom: 0;
          width: 100%; height: 0;
          background: var(--brand);
          transition: height 0.3s ease-in-out;
        }
        .social-item a:hover .filled { height: 100%; }

        .social-item .tooltip {
          position: absolute;
          top: -30px; left: 50%;
          transform: translateX(-50%);
          color: #fff;
          padding: 4px 8px;
          border-radius: 5px;
          opacity: 0;
          visibility: hidden;
          font-size: 12px;
          white-space: nowrap;
          transition: all 0.3s ease;
          background: var(--brand);
        }
        .social-item a:hover ~ .tooltip {
          opacity: 1;
          visibility: visible;
          top: -38px;
        }
      `}</style>
    </ul>
  )
}
