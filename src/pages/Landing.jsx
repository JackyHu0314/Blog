import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { journals } from '../data/journals'
import { musicTracks } from '../data/music'

// Chooses the journal whose photo opens the home page as a full-bleed still.
// `entries` is the journals array; each may carry `image: { src, alt, width, height }`.
// Return one journal object, or null to fall back to the featured record cover.
const HERO_MIN_WIDTH = 1200

const byNewest = (a, b) => b.date.localeCompare(a.date)

// Newest journal whose photo is wide enough to stay sharp at full bleed.
function pickHeroJournal(entries) {
  return [...entries].sort(byNewest).find((entry) => entry.image?.width >= HERO_MIN_WIDTH) ?? null
}

export default function Landing() {
  const { lang, tr, t } = useLanguage()

  const hero = useMemo(() => pickHeroJournal(journals), [])
  const featuredTrack = musicTracks.find((track) => track.featured) ?? musicTracks[0]

  const recent = useMemo(
    () => [...journals].sort(byNewest).filter((journal) => journal.id !== hero?.id).slice(0, 3),
    [hero],
  )

  const still = hero
    ? {
        src: hero.image.src,
        alt: tr(hero.image.alt),
        kicker: `Journal · ${hero.date.replaceAll('-', '.')}`,
        title: tr(hero.title),
        to: `/journal/${hero.id}`,
      }
    : {
        src: featuredTrack.cover,
        alt: '',
        kicker: `Now playing · ${tr(featuredTrack.artist)}`,
        title: tr(featuredTrack.title),
        to: '/music',
      }

  return (
    <article className="home-page home-page--cinema">
      <Link className="cine-hero animate-block" to={still.to}>
        <img src={still.src} alt={still.alt} fetchPriority="high" />
        <div className="cine-hero-caption">
          <p className="cine-kicker">{still.kicker}</p>
          <h1>{still.title}</h1>
        </div>
      </Link>

      <header className="cine-intro animate-block animate-block--delay">
        <p className="cine-kicker">Jacky Hu · Mathematics, XJTU</p>
        <p className="cine-intro-text">{t('about.introBody')}</p>
        <div className="cine-links" aria-label={lang === 'zh' ? '个人链接' : 'Profile links'}>
          <a href="https://github.com/JackyHu0314" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.xiaohongshu.com/search_result?keyword=JackyUnique" target="_blank" rel="noopener noreferrer">JackyUnique</a>
          <a href="mailto:jackyhu2008.03.14@gmail.com">Email</a>
          <Link to="/about">About</Link>
        </div>
      </header>

      <div className="cine-columns animate-block animate-block--delay">
        <section aria-labelledby="home-journal-title">
          <h2 id="home-journal-title" className="cine-kicker">Journal</h2>
          <div className="cine-posts">
            {recent.map((journal) => (
              <Link className="cine-post" to={`/journal/${journal.id}`} key={journal.id}>
                <h3>{tr(journal.title)}</h3>
                <p>
                  <time dateTime={journal.date}>{journal.date.replaceAll('-', '.')}</time>
                  <span aria-hidden="true"> · </span>
                  {tr(journal.excerpt)}
                </p>
              </Link>
            ))}
          </div>
          <Link className="cine-more" to="/journal">{lang === 'zh' ? '全部随记' : 'All notes'} →</Link>
        </section>

        <section aria-labelledby="home-listening-title">
          <h2 id="home-listening-title" className="cine-kicker">Listening room</h2>
          <Link className="cine-listening" to="/music">
            {lang === 'zh' ? `这阵子一直在听 ${tr(featuredTrack.artist)} 的 ${tr(featuredTrack.title)}` : `Lately I keep playing ${tr(featuredTrack.title)} by ${tr(featuredTrack.artist)}`}
            <span aria-hidden="true"> →</span>
          </Link>
          <p className="cine-now">
            <span className="cine-kicker">Now</span>
            {lang === 'zh' ? '机器人学习（WAM / VLA）、视频生成、图像生成' : 'Robot learning (WAM / VLA), video generation, image generation'}
          </p>
        </section>
      </div>
    </article>
  )
}
