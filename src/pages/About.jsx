import { useLanguage } from '../context/LanguageContext'

const skills = ['Python', 'C++', 'C', 'Bash', 'Git', 'PyTorch', 'Deep Learning', 'React', 'Adobe Premiere Pro']

const links = [
  { label: 'GitHub', detail: 'JackyHu0314', href: 'https://github.com/JackyHu0314' },
  { label: 'Hugging Face', detail: 'hax404', href: 'https://huggingface.co/hax404' },
  { label: '小红书', detail: 'JackyUnique', href: 'https://www.xiaohongshu.com/search_result?keyword=JackyUnique' },
  { label: 'Email', detail: 'jackyhu2008.03.14@gmail.com', href: 'mailto:jackyhu2008.03.14@gmail.com' },
]

export default function About() {
  const { t, lang } = useLanguage()

  return (
    <article className="about-page">
      <header className="page-intro animate-block">
        <p className="page-kicker">Profile · Jacky Hu</p>
        <h1 className="page-title">{t('about.title')}</h1>
        <p className="page-description">{t('about.tagline')}</p>
      </header>

      <div className="about-content animate-block animate-block--delay">
        <section className="about-profile-card">
          <img src="/avatar.jpg" alt="Jacky" />
          <div>
            <p className="info-card-meta">Xi’an · China</p>
            <h2>Jacky Hu</h2>
            <p>{lang === 'zh' ? '西安交通大学数学学院 · 本科在读' : 'School of Mathematics, Xi’an Jiaotong University'}</p>
          </div>
          <span className="status-dot"><i aria-hidden="true" />Video Generation</span>
        </section>

        <section className="about-section" aria-labelledby="about-intro-title">
          <h2 id="about-intro-title">{t('about.intro')}</h2>
          <div>
            <p>{t('about.introBody')}</p>
          </div>
        </section>

        <section className="about-section" aria-labelledby="about-interest-title">
          <h2 id="about-interest-title">{t('about.interests')}</h2>
          <div>
            <p>{t('about.interestsBody')}</p>
          </div>
        </section>

        <section className="about-section" aria-labelledby="about-skills-title">
          <h2 id="about-skills-title">{t('about.skills')}</h2>
          <div className="skill-grid">
            {skills.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        </section>

        <section className="about-section" aria-labelledby="about-links-title">
          <h2 id="about-links-title">Elsewhere</h2>
          <div className="contact-links">
            {links.map((link) => (
              <a key={link.label} href={link.href} target={link.href.startsWith('mailto:') ? undefined : '_blank'} rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}>
                <span>{link.label}</span>
                <strong>{link.detail}</strong>
                <i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
        </section>

        <section className="about-section" aria-labelledby="about-scan-title">
          <h2 id="about-scan-title">Contact</h2>
          <div className="qr-links">
            <figure className="qr-contact-card qr-contact-card--wechat">
              <img src="/wechat-qr.jpg" alt={t('about.wechatHint')} loading="lazy" />
              <figcaption><small>Scan</small><strong>WeChat</strong><span>{t('about.wechatHint')}</span></figcaption>
            </figure>
            <figure className="qr-contact-card qr-contact-card--qq">
              <img src="/qq-qr.jpg" alt={t('about.qqHint')} loading="lazy" />
              <figcaption><small>Scan</small><strong>QQ</strong><span>{t('about.qqHint')}</span></figcaption>
            </figure>
          </div>
        </section>
      </div>
    </article>
  )
}
