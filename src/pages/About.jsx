import { useLanguage } from '../context/LanguageContext'
import DynamicCard from '../components/DynamicCard'
import QRCard from '../components/QRCard'

const skills = ['Python', 'C++ (greenhand)', 'Bash', 'Git', 'Deep Learning', 'Basketball']

const siteLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/JackyHu0314',
    desc: '代码仓库',
    color: '#24262a',
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" width="22" height="22">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
      </svg>
    ),
  },
  {
    name: '云服务器',
    url: '#',
    desc: '自托管部署',
    color: '#0f4c81',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
      </svg>
    ),
  },
  {
    name: 'GitHub Pages',
    url: 'https://pages.github.com',
    desc: '静态托管',
    color: '#24262a',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
      </svg>
    ),
  },
  {
    name: '西安交通大学数学学院',
    url: 'https://math.xjtu.edu.cn/',
    desc: '我的学院',
    color: '#8b1a1a',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
      </svg>
    ),
  },
]

const GitHubIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
  </svg>
)

const EmailIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{fill:'none'}}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

const WeChatIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.601-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.063-6.122zm-3.74 2.632c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm5.4 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
  </svg>
)

const QQIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
    <path fill="currentColor" d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 258.4 447.9c-28.4 70.8-46.7 113.8-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.1 79.8-110 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.4-46.3-14.6-155.8z"/>
  </svg>
)

export default function About() {
  const { t } = useLanguage()

  return (
    <div>
      <div className="text-center mb-12">
        <img
          src="/avatar.jpg"
          alt="Jacky"
          className="w-28 h-28 rounded-full mx-auto mb-6 object-cover border-2 border-card-border"
        />
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('about.title')}</h1>
        <p className="text-text-secondary">{t('about.tagline')}</p>
      </div>

      <div className="space-y-10 text-left">
        <section>
          <h2 className="text-xl font-bold mb-3 text-text-primary">{t('about.intro')}</h2>
          <p className="text-text-secondary leading-relaxed">{t('about.introBody')}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-text-primary">{t('about.interests')}</h2>
          <p className="text-text-secondary leading-relaxed">{t('about.interestsBody')}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 text-text-primary">{t('about.skills')}</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill} className="px-3.5 py-1.5 rounded-full text-sm font-semibold tracking-wide bg-bg-secondary text-text-primary border border-card-border">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-text-primary">网页分发</h2>
          <p className="text-text-secondary text-sm mb-5">本站部署于以下平台</p>
          <div className="site-links">
            {siteLinks.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="site-link-item" style={{ '--sl-color': s.color }}>
                <div className="sl-filled" />
                <span className="sl-icon">{s.icon}</span>
                <div className="sl-info">
                  <span className="sl-name">{s.name}</span>
                  <span className="sl-desc">{s.desc}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-5 text-text-primary">{t('about.contact')}</h2>
          <p className="text-text-secondary text-sm mb-6">{t('about.contactHint')}</p>
          <div className="flex flex-wrap gap-6 justify-start">
            <DynamicCard label="GitHub" icon={GitHubIcon} href="https://github.com/JackyHu0314" description="Code Repository" />
            <DynamicCard label="Email" icon={EmailIcon} href="mailto:jackyhu2008.03.14@gmail.com" description="Contact Me" />
            <QRCard label="WeChat" icon={WeChatIcon} src="/wechat-qr.jpg" />
            <QRCard label="QQ" icon={QQIcon} src="/qq-qr.jpg" />
          </div>
        </section>
      </div>

      <style>{`
        .site-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .site-link-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 18px;
          border-radius: 12px;
          border: 1px solid var(--color-card-border);
          background: var(--color-card-bg);
          text-decoration: none;
          color: var(--color-text-primary);
          overflow: hidden;
          transition: color 0.3s, border-color 0.3s;
          min-width: 160px;
        }
        .sl-filled {
          position: absolute;
          inset: 0;
          background: var(--sl-color);
          height: 0;
          transition: height 0.3s ease-in-out;
        }
        .site-link-item:hover .sl-filled { height: 100%; }
        .site-link-item:hover { color: #ffffff; border-color: transparent; }
        .sl-icon {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .sl-info {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .sl-name { font-size: 14px; font-weight: 600; }
        .sl-desc { font-size: 11px; opacity: 0.7; }
      `}</style>
    </div>
  )
}
