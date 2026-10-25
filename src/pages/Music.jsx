import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { musicPlaylists, musicTracks } from '../data/music'
import { journals } from '../data/journals'
import './Music.css'

const copy = {
  archiveLabel: { zh: 'Music / Selected by Jacky', en: 'Music / Selected by Jacky' },
  title: { zh: 'The listening room.', en: 'The listening room.' },
  introduction: { zh: '听歌，写字，慢慢来。', en: 'Listening, writing, taking my time.' },
  recent: { zh: 'In rotation', en: 'In rotation' },
  selectTrack: { zh: '查看歌曲', en: 'Select track' },
  openTrack: { zh: '在 B 站听', en: 'Listen on Bilibili' },
  searchTrack: { zh: '在 B 站搜索', en: 'Find on Bilibili' },
  playlists: { zh: 'Playlists', en: 'Playlists' },
  playlistsNote: { zh: '四种不同的心情', en: 'Four different moods' },
  openPlaylist: { zh: '在 Apple Music 打开', en: 'Open on Apple Music' },
  preview: { zh: '歌单节选', en: 'A few tracks' },
  tracks: { zh: '首', en: 'tracks' },
  fromJournal: { zh: 'From the journal', en: 'From the journal' },
}

const artwork = {
  'favorite-songs': { lines: ['saved', 'songs.'], caption: 'FAVORITES', genre: { zh: '华语流行', en: 'C-pop favorites' } },
  'hayd-style': { lines: ['soft', 'spoken.'], caption: 'GENTLE VOICES', genre: { zh: '轻柔唱作', en: 'Gentle voices' } },
  'quiet-with-u': { lines: ['quiet', 'hours.'], caption: 'SLOW DOWN', genre: { zh: 'Lo-fi / ambient', en: 'Lo-fi / ambient' } },
  'alternative-rnb': { lines: ['after', 'dark.'], caption: 'LATE NIGHTS', genre: { zh: '夜间 R&B', en: 'Late-night R&B' } },
}

function ExternalArrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M5 3h8v8M13 3 3 13" />
    </svg>
  )
}

function Playlist({ playlist, index }) {
  const { tr } = useLanguage()
  const art = artwork[playlist.id]

  return (
    <li className="music-playlist">
      <a className="music-playlist-link" href={playlist.appleMusicUrl} target="_blank" rel="noopener noreferrer" aria-label={`${tr(copy.openPlaylist)} · ${tr(playlist.title)}`}>
        <div className={`music-art music-art--${playlist.id}`} aria-hidden="true">
          <small>JACKY’S COLLECTION</small>
          <span>{art.lines.map((line) => <span key={line}>{line}</span>)}</span>
          <small>{String(index + 1).padStart(3, '0')} / {art.caption}</small>
        </div>
        <h3>{tr(playlist.title)} <ExternalArrow /></h3>
        <p>{tr(art.genre)} · {playlist.trackCount} {tr(copy.tracks)}</p>
      </a>
      <details className="music-playlist-details">
        <summary aria-label={`${tr(playlist.title)} · ${tr(copy.preview)}`}>{tr(copy.preview)} <span aria-hidden="true">+</span></summary>
        <div className="music-playlist-description">
          <p>{tr(playlist.description)}</p>
          <p>{playlist.sourceTitle} · {tr(playlist.duration)}</p>
        </div>
        <ol>
          {playlist.previewTracks.slice(0, 3).map((track) => (
            <li key={track.url}>
              <a href={track.url} target="_blank" rel="noopener noreferrer">
                <strong>{track.title}</strong>
                <small>{track.artist}</small>
              </a>
            </li>
          ))}
        </ol>
      </details>
    </li>
  )
}

export default function Music() {
  const { tr } = useLanguage()
  const [selectedId, setSelectedId] = useState(() => (musicTracks.find((track) => track.featured) ?? musicTracks[0]).id)
  const selectedTrack = musicTracks.find((track) => track.id === selectedId)

  return (
    <article className="music-page">
      <header className="music-intro animate-block">
        <div>
          <p className="page-kicker">{tr(copy.archiveLabel)}</p>
          <h1>{tr(copy.title)}</h1>
        </div>
        <p className="music-introduction">{tr(copy.introduction)}</p>
      </header>

      <div className="music-spread animate-block animate-block--delay">
        <section className="music-feature" aria-labelledby="selected-track-title" id="selected-track">
          <img
            className="music-feature-cover"
            src={selectedTrack.cover}
            alt={`${tr(selectedTrack.title)} — ${tr(selectedTrack.artist)}`}
            width="592"
            height="592"
            fetchPriority="high"
          />
          <div className="music-feature-caption">
            <h2 id="selected-track-title">{tr(selectedTrack.title)}</h2>
            <p>{tr(selectedTrack.artist)}</p>
          </div>
          <a className="music-outbound" href={selectedTrack.bilibiliUrl} target="_blank" rel="noopener noreferrer" aria-label={tr(selectedTrack.linkLabel)}>
            {tr(selectedTrack.bilibiliUrl.includes('search.bilibili.com') ? copy.searchTrack : copy.openTrack)}
            <ExternalArrow />
          </a>
        </section>

        <section className="music-rotation" aria-labelledby="rotation-title">
          <div className="music-section-heading">
            <h2 id="rotation-title">{tr(copy.recent)}</h2>
            <span>{String(musicTracks.length).padStart(2, '0')}</span>
          </div>
          <ol className="music-track-list">
            {musicTracks.map((track, index) => {
              const selected = track.id === selectedId
              return (
                <li key={track.id}>
                  <button
                    className="music-track"
                    type="button"
                    aria-pressed={selected}
                    aria-controls="selected-track"
                    aria-label={`${tr(copy.selectTrack)} · ${tr(track.title)} — ${tr(track.artist)}`}
                    onClick={() => setSelectedId(track.id)}
                  >
                    {selected ? (
                      <span className="music-track-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    ) : (
                      <img src={track.cover} alt="" width="44" height="44" />
                    )}
                    <span className="music-track-copy"><strong>{tr(track.title)}</strong><small>{tr(track.artist)}</small></span>
                    <span className="music-track-marker" aria-hidden="true" />
                  </button>
                </li>
              )
            })}
          </ol>
          <p className="music-listening-note" aria-live="polite" aria-atomic="true">{tr(selectedTrack.note)}</p>
        </section>
      </div>

      <section className="music-collection" aria-labelledby="playlist-title">
        <div className="music-section-heading">
          <h2 id="playlist-title">{tr(copy.playlists)}</h2>
          <p>{tr(copy.playlistsNote)}</p>
        </div>
        <ol className="music-playlists">
          {musicPlaylists.map((playlist, index) => <Playlist key={playlist.id} playlist={playlist} index={index} />)}
        </ol>
      </section>

      <aside className="music-journal" aria-labelledby="music-journal-title">
        <h2 id="music-journal-title">{tr(copy.fromJournal)}</h2>
        {journals.slice(0, 2).map((journal) => (
          <Link key={journal.id} to={`/journal/${journal.id}`}>
            <span>{tr(journal.title)}</span>
            <time dateTime={journal.date}>{journal.date.replaceAll('-', '.')}</time>
          </Link>
        ))}
      </aside>
    </article>
  )
}
