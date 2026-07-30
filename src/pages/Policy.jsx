import { useLanguage } from '../context/LanguageContext'
import './Policy.css'

export default function Policy() {
  const { lang } = useLanguage()

  return (
    <article className="policy-page">
      <header className="page-intro animate-block">
        <p className="page-kicker">Site · Policy</p>
        <h1 className="page-title">Policy</h1>
        <p className="page-description">{lang === 'zh' ? '版权与隐私说明。' : 'Copyright and privacy.'}</p>
      </header>

      <div className="policy-content animate-block animate-block--delay">
        <section>
          <p className="section-index">01</p>
          <h2>Copyright</h2>
          <p>
            {lang === 'zh'
              ? '除特别说明外，本站原创文字采用 CC BY-NC-SA 4.0 许可。你可以在署名、附上原文链接、注明改动且仅限非商业用途的前提下转载或改编；改编内容须继续采用相同协议。'
              : 'Unless noted otherwise, original writing on this site is licensed under CC BY-NC-SA 4.0. You may share or adapt it with attribution, a source link, and an indication of changes for noncommercial purposes; adaptations must use the same license.'}
          </p>
          <p>
            {lang === 'zh'
              ? '第三方图片、音乐、视频、商标与引用内容归各自权利人所有，不在上述许可范围内。'
              : 'Third-party images, music, video, trademarks, and quoted material remain with their respective rights holders and are excluded from this license.'}
          </p>
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">
            CC BY-NC-SA 4.0 ↗
          </a>
        </section>

        <section id="privacy">
          <p className="section-index">02</p>
          <h2>Comments</h2>
          <p>
            {lang === 'zh'
              ? '评论区保存你提交的昵称和正文。系统会处理经哈希的网络标识与基础浏览器信息，用于限流和防止滥用。本站不收集评论者邮箱。'
              : 'The comment system stores the nickname and message you submit. It processes a hashed network identifier and basic browser information for rate limiting and abuse prevention. It does not collect commenter email addresses.'}
          </p>
          <p>
            {lang === 'zh'
              ? 'Cloudflare Turnstile 用于人机验证。评论审核通过后公开。'
              : 'Cloudflare Turnstile provides verification. Comments become public after approval.'}
          </p>
        </section>

        <section>
          <p className="section-index">03</p>
          <h2>Preferences</h2>
          <p>
            {lang === 'zh'
              ? '主题与语言偏好保存在你的浏览器中。'
              : 'Theme and language preferences are stored in your browser.'}
          </p>
        </section>

        <section>
          <p className="section-index">04</p>
          <h2>External links</h2>
          <p>
            {lang === 'zh'
              ? '友链头像由对应网站提供，加载时会向该网站发起请求。本站还包含 Apple Music、Bilibili、GitHub 与其他个人网站的外部链接。'
              : 'Friend avatars are loaded from their respective sites. This site also links to Apple Music, Bilibili, GitHub, and other personal sites.'}
          </p>
        </section>
      </div>
    </article>
  )
}
