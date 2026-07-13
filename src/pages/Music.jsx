import { useLanguage } from '../context/LanguageContext'
import { musicPlaylists, musicTracks } from '../data/music'

const copy = {
  archiveLabel: { zh: '私人听觉档案 · 001', en: 'Private listening archive · 001' },
  title: { zh: '音乐空间', en: 'Listening Room' },
  introduction: {
    zh: '不做评分，也不急着给一首歌下结论。这里只留下最近反复播放的声音，以及它们经过生活时留下的一点痕迹。',
    en: 'No ratings and no rush to reach a verdict—just the sounds on repeat and the traces they leave behind.',
  },
  featured: { zh: '本期收录', en: 'Featured record' },
  recent: { zh: '最近播放', en: 'Recent rotation' },
  playlists: { zh: '四份歌单', en: 'Four playlists' },
  playlistsNote: {
    zh: '分类不是严格的边界，更像四种不同的夜晚。名称与顺序会继续变化。',
    en: 'Not strict genre boundaries, but four different kinds of night. Names and order may keep changing.',
  },
  openPlaylist: { zh: '在 Apple Music 打开', en: 'Open in Apple Music' },
  openTrack: { zh: '打开歌曲', en: 'Open track' },
  tracks: { zh: '首', en: 'tracks' },
}

function ExternalArrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M5 3h8v8M13 3 3 13" />
    </svg>
  )
}

export default function Music() {
  const { tr } = useLanguage()
  const featuredTrack = musicTracks.find((track) => track.featured)
  const recentTracks = musicTracks.filter((track) => !track.featured)

  return (
    <article className="music-page">
      <header className="page-intro animate-block">
        <p className="page-kicker">{tr(copy.archiveLabel)}</p>
        <h1 className="page-title">{tr(copy.title)}</h1>
        <p className="page-description">{tr(copy.introduction)}</p>
      </header>

      {featuredTrack && (
        <section className="music-overview animate-block animate-block--delay" aria-labelledby={`track-${featuredTrack.id}`}>
          <article className="featured-track">
            <img
              className="featured-track__cover"
              src={featuredTrack.cover}
              alt={`${tr(featuredTrack.title)} — ${tr(featuredTrack.artist)}`}
            />
            <div className="featured-track__copy">
              <div className="meta-line">
                <span>{tr(copy.featured)}</span>
                <span>{tr(featuredTrack.status)}</span>
              </div>
              <h2 id={`track-${featuredTrack.id}`}>{tr(featuredTrack.title)}</h2>
              <p className="featured-track__artist">{tr(featuredTrack.artist)}</p>
              <p className="featured-track__note">{tr(featuredTrack.note)}</p>
              <a className="external-link" href={featuredTrack.bilibiliUrl} target="_blank" rel="noopener noreferrer">
                <span>Bilibili · {tr(featuredTrack.linkLabel)}</span>
                <ExternalArrow />
              </a>
            </div>
          </article>

          <aside className="listening-aside" aria-label="Listening note">
            <p className="listening-aside__label">Current mood</p>
            <p className="listening-aside__quote">“quiet enough to hear what stayed.”</p>
            <dl>
              <div><dt>Tracks</dt><dd>{musicTracks.length}</dd></div>
              <div><dt>Playlists</dt><dd>{musicPlaylists.length}</dd></div>
            </dl>
          </aside>
        </section>
      )}

      <section className="content-section" aria-labelledby="recent-tracks-title">
        <div className="section-heading-row">
          <div>
            <p className="section-index">02—04</p>
            <h2 id="recent-tracks-title">{tr(copy.recent)}</h2>
          </div>
          <p>{tr({ zh: '几首还没有听腻的歌。', en: 'A few songs that have not worn out yet.' })}</p>
        </div>

        <div className="track-list">
          {recentTracks.map((track, index) => (
            <article className="track-row" key={track.id}>
              <span className="track-row__index">{String(index + 2).padStart(2, '0')}</span>
              <img src={track.cover} alt="" loading="lazy" />
              <div className="track-row__copy">
                <div className="meta-line"><span>{tr(track.status)}</span></div>
                <h3>{tr(track.title)}</h3>
                <p className="track-row__artist">{tr(track.artist)}</p>
                <p className="track-row__note">{tr(track.note)}</p>
              </div>
              <a className="icon-external-link" href={track.bilibiliUrl} target="_blank" rel="noopener noreferrer" aria-label={tr(track.linkLabel)}>
                <ExternalArrow />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section playlist-section" aria-labelledby="playlist-title">
        <div className="section-heading-row">
          <div>
            <p className="section-index">00—03</p>
            <h2 id="playlist-title">{tr(copy.playlists)}</h2>
          </div>
          <p>{tr(copy.playlistsNote)}</p>
        </div>

        <ol className="playlist-list">
          {musicPlaylists.map((playlist) => (
            <li key={playlist.id}>
              <article className={`playlist-row${playlist.featured ? ' is-featured' : ''}`}>
                <div className="playlist-row__identity">
                  <div className="meta-line">
                    <span>{playlist.index}</span>
                    <span>{playlist.trackCount} {tr(copy.tracks)}</span>
                  </div>
                  <h3>{tr(playlist.title)}</h3>
                  <p className="playlist-row__source">{playlist.sourceTitle} · {tr(playlist.duration)}</p>
                  <p className="playlist-row__class">{tr(playlist.classification)}</p>
                </div>

                <div className="playlist-row__description">
                  <p>{tr(playlist.description)}</p>
                  <a className="external-link" href={playlist.appleMusicUrl} target="_blank" rel="noopener noreferrer">
                    <span>{tr(copy.openPlaylist)}</span>
                    <ExternalArrow />
                  </a>
                </div>

                <ol className="playlist-tracks" aria-label={tr({ zh: '歌单节选', en: 'Playlist preview' })}>
                  {playlist.previewTracks.slice(0, 3).map((track, index) => (
                    <li key={track.url}>
                      <a href={track.url} target="_blank" rel="noopener noreferrer" aria-label={`${track.title} · ${tr(copy.openTrack)}`}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <span><strong>{track.title}</strong><small>{track.artist}</small></span>
                      </a>
                    </li>
                  ))}
                </ol>
              </article>
            </li>
          ))}
        </ol>
      </section>
    </article>
  )
}
