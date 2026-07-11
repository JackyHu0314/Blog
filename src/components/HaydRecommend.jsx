import { useLanguage } from '../context/LanguageContext'

export default function HaydRecommend({ song }) {
  const { lang } = useLanguage()

  if (!song) return null

  return (
    <aside className="article-soundtrack" aria-label={lang === 'zh' ? '本文配乐' : 'Article soundtrack'}>
      {song.cover ? <img src={song.cover} alt="" className="article-soundtrack-cover" /> : null}
      <div className="article-soundtrack-copy">
        <p className="article-soundtrack-label">
          {lang === 'zh' ? '本文配乐' : 'Soundtrack'} · {song.artist ?? 'Hayd'}
        </p>
        <p className="article-soundtrack-title">{song.title}</p>
        <p className="article-soundtrack-note">{song.vibe}</p>
      </div>
      {song.bilibiliUrl ? (
        <a className="article-soundtrack-link" href={song.bilibiliUrl} target="_blank" rel="noopener noreferrer">
          {lang === 'zh' ? '去 B 站听' : 'Listen on Bilibili'} <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </aside>
  )
}
