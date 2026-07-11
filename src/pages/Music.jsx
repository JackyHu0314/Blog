import { useLanguage } from '../context/LanguageContext'
import { musicPlaylists, musicTracks } from '../data/music'

const copy = {
  archiveLabel: { zh: '私人听觉档案 · 001', en: 'Private listening archive · 001' },
  title: { zh: '音乐空间', en: 'Listening Room' },
  introduction: {
    zh: '不做评分，也不急着给一首歌下结论。这里只留下最近反复播放的声音，以及它们经过生活时留下的一点痕迹。',
    en: 'No ratings, no rush to reach a verdict—just the sounds currently on repeat and the faint traces they leave behind.',
  },
  featured: { zh: '本期收录', en: 'Featured record' },
  shelf: { zh: '最近播放', en: 'Recent rotation' },
  shelfNote: { zh: '四首歌，四张独立的听感卡片。', en: 'Four tracks, each kept in its own listening note.' },
  playlists: { zh: '歌单书架', en: 'Playlist shelf' },
  playlistsNote: {
    zh: '从总收藏到三条更明确的声音线索。分类保留边界，也允许彼此重叠。',
    en: 'One broad library and three clearer listening threads—distinct enough to navigate, open enough to overlap.',
  },
  openingTracks: { zh: '开场曲目', en: 'Opening tracks' },
  playlistSnapshot: { zh: '公开快照', en: 'Public snapshot' },
  tracks: { zh: '首', en: 'tracks' },
  duration: { zh: '时长', en: 'Duration' },
  openPlaylist: { zh: '在 Apple Music 打开歌单', en: 'Open playlist on Apple Music' },
  openTrack: { zh: '在 Apple Music 打开', en: 'Open on Apple Music' },
  bilibili: { zh: 'BILIBILI', en: 'BILIBILI' },
  externalHint: { zh: '外部链接', en: 'External link' },
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
  const primaryPlaylist = musicPlaylists.find((playlist) => playlist.featured)
  const focusedPlaylists = musicPlaylists.filter((playlist) => !playlist.featured)

  return (
    <section className="music-archive" aria-labelledby="music-archive-title">
      <header className="music-archive__header">
        <div className="music-archive__masthead">
          <p className="music-archive__edition">{tr(copy.archiveLabel)}</p>
          <span className="music-archive__signal" aria-hidden="true" />
        </div>
        <h1 id="music-archive-title" className="music-archive__title">
          {tr(copy.title)}
        </h1>
        <p className="music-archive__introduction">{tr(copy.introduction)}</p>
      </header>

      {featuredTrack && (
        <article className="featured-record" aria-labelledby={`track-${featuredTrack.id}`}>
          <div className="featured-record__artwork">
            <img
              src={featuredTrack.cover}
              alt={`${tr(featuredTrack.title)} — ${tr(featuredTrack.artist)}`}
            />
            <span className="featured-record__number" aria-hidden="true">01</span>
          </div>

          <div className="featured-record__copy">
            <div className="featured-record__meta">
              <span>{tr(copy.featured)}</span>
              <span>{tr(featuredTrack.status)}</span>
            </div>
            <h2 id={`track-${featuredTrack.id}`} className="featured-record__title">
              {tr(featuredTrack.title)}
            </h2>
            <p className="featured-record__artist">{tr(featuredTrack.artist)}</p>
            <p className="featured-record__note">{tr(featuredTrack.note)}</p>
            <a
              className="music-link music-link--featured"
              href={featuredTrack.bilibiliUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${tr(featuredTrack.linkLabel)} · ${tr(copy.externalHint)}`}
            >
              <span>{tr(copy.bilibili)}</span>
              <span className="music-link__label">{tr(featuredTrack.linkLabel)}</span>
              <ExternalArrow />
            </a>
          </div>
        </article>
      )}

      <section className="record-shelf" aria-labelledby="record-shelf-title">
        <div className="music-section-heading">
          <div>
            <p className="music-section-heading__index">02—04</p>
            <h2 id="record-shelf-title">{tr(copy.shelf)}</h2>
          </div>
          <p>{tr(copy.shelfNote)}</p>
        </div>

        <div className="record-shelf__list">
          {recentTracks.map((track, index) => (
            <article className="track-entry" key={track.id} aria-labelledby={`track-${track.id}`}>
              <img
                className="track-entry__artwork"
                src={track.cover}
                alt={`${tr(track.title)} — ${tr(track.artist)}`}
                loading="lazy"
              />
              <div className="track-entry__body">
                <div className="track-entry__meta">
                  <span>{String(index + 2).padStart(2, '0')}</span>
                  <span>{tr(track.status)}</span>
                </div>
                <h3 id={`track-${track.id}`}>{tr(track.title)}</h3>
                <p className="track-entry__artist">{tr(track.artist)}</p>
                <p className="track-entry__note">{tr(track.note)}</p>
                <a
                  className="music-link music-link--quiet"
                  href={track.bilibiliUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${tr(track.linkLabel)} · ${tr(copy.externalHint)}`}
                >
                  <span>{tr(track.linkLabel)}</span>
                  <ExternalArrow />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="playlist-index" aria-labelledby="playlist-index-title">
        <div className="music-section-heading music-section-heading--playlists">
          <div>
            <p className="music-section-heading__index">00—03</p>
            <h2 id="playlist-index-title">{tr(copy.playlists)}</h2>
          </div>
          <p>{tr(copy.playlistsNote)}</p>
        </div>

        {primaryPlaylist && (
          <article className="playlist-feature" aria-labelledby={`playlist-${primaryPlaylist.id}`}>
            <div className="playlist-feature__identity">
              <div className="playlist-feature__meta">
                <span>Apple Music · {primaryPlaylist.sourceTitle}</span>
                <span>{primaryPlaylist.snapshot} · {tr(copy.playlistSnapshot)}</span>
              </div>
              <strong className="playlist-feature__count" aria-hidden="true">
                {primaryPlaylist.trackCount}
              </strong>
              <p className="playlist-feature__count-label">
                {primaryPlaylist.trackCount} {tr(copy.tracks)} · {tr(primaryPlaylist.duration)}
              </p>
              <p className="playlist-feature__classification">{tr(primaryPlaylist.classification)}</p>
              <h3 id={`playlist-${primaryPlaylist.id}`}>{tr(primaryPlaylist.title)}</h3>
              <p className="playlist-feature__description">{tr(primaryPlaylist.description)}</p>
              <a
                className="music-link music-link--apple"
                href={primaryPlaylist.appleMusicUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${tr(copy.openPlaylist)} · ${tr(copy.externalHint)}`}
              >
                <span>{tr(copy.openPlaylist)}</span>
                <ExternalArrow />
              </a>
            </div>

            <div className="playlist-feature__preview">
              <div className="playlist-preview__heading">
                <span>{tr(copy.openingTracks)}</span>
                <span>01—{String(primaryPlaylist.previewTracks.length).padStart(2, '0')}</span>
              </div>
              <ol className="playlist-preview__tracks">
                {primaryPlaylist.previewTracks.map((track, index) => (
                  <li key={track.url}>
                    <a
                      href={track.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${track.title} — ${track.artist} · ${tr(copy.openTrack)}`}
                    >
                      <span className="playlist-preview__number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="playlist-preview__track">
                        <strong>{track.title}</strong>
                        <span>{track.artist}</span>
                      </span>
                      <ExternalArrow />
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        )}

        <ol className="playlist-index__grid">
          {focusedPlaylists.map((playlist) => (
            <li className="playlist-card" key={playlist.id}>
              <article aria-labelledby={`playlist-${playlist.id}`}>
                <div className="playlist-card__meta">
                  <span className="playlist-card__index">{playlist.index}</span>
                  <span>Apple Music</span>
                </div>
                <p className="playlist-card__classification">{tr(playlist.classification)}</p>
                <h3 id={`playlist-${playlist.id}`}>{tr(playlist.title)}</h3>
                <p className="playlist-card__source">{playlist.sourceTitle} · {playlist.snapshot}</p>
                <p className="playlist-card__description">{tr(playlist.description)}</p>
                <p className="playlist-card__metrics">
                  {playlist.trackCount} {tr(copy.tracks)} <span aria-hidden="true">·</span>{' '}
                  {tr(copy.duration)} {tr(playlist.duration)}
                </p>
                <ol className="playlist-card__tracks">
                  {playlist.previewTracks.map((track, index) => (
                    <li key={track.url}>
                      <a
                        href={track.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${track.title} — ${track.artist} · ${tr(copy.openTrack)}`}
                      >
                        <span className="playlist-card__track-number">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="playlist-card__track-copy">
                          <strong>{track.title}</strong>
                          <span>{track.artist}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
                <a
                  className="music-link music-link--quiet playlist-card__link"
                  href={playlist.appleMusicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${tr(playlist.title)} · ${tr(copy.openPlaylist)} · ${tr(copy.externalHint)}`}
                >
                  <span>{tr(copy.openPlaylist)}</span>
                  <ExternalArrow />
                </a>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <style>{`
        .music-archive {
          --music-ink: #0b0e12;
          --music-panel: #11151a;
          --music-panel-raised: #171c22;
          --music-paper: #e8e6df;
          --music-muted: #969da4;
          --music-signal: #8195a6;
          --music-line: rgba(232, 230, 223, 0.14);
          position: relative;
          isolation: isolate;
          overflow: hidden;
          color: var(--music-paper);
          background:
            radial-gradient(circle at 88% 8%, rgba(129, 149, 166, 0.13), transparent 32%),
            linear-gradient(145deg, #12171c 0%, var(--music-ink) 58%, #101419 100%);
          border: 1px solid rgba(232, 230, 223, 0.12);
          border-radius: 10px;
          padding: clamp(28px, 6vw, 68px);
          box-shadow: 0 32px 90px rgba(3, 6, 9, 0.32);
        }
        .music-archive::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          opacity: 0.18;
          background-image: repeating-linear-gradient(
            105deg,
            transparent 0,
            transparent 4px,
            rgba(255, 255, 255, 0.018) 5px
          );
        }
        .music-archive__header {
          max-width: 760px;
          margin-bottom: clamp(42px, 8vw, 84px);
        }
        .music-archive__masthead {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
        }
        .music-archive__edition,
        .music-section-heading__index {
          margin: 0;
          color: var(--music-muted);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.19em;
          text-transform: uppercase;
        }
        .music-archive__signal {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--music-signal);
          box-shadow: 0 0 18px rgba(129, 149, 166, 0.52);
        }
        .music-archive__title {
          max-width: 680px;
          margin: 0;
          font-family: 'Iowan Old Style', 'Palatino Linotype', 'Noto Serif SC', 'Songti SC', serif;
          font-size: clamp(48px, 9vw, 96px);
          font-weight: 500;
          letter-spacing: -0.055em;
          line-height: 0.95;
          text-wrap: balance;
        }
        .music-archive__introduction {
          max-width: 610px;
          margin: 28px 0 0;
          color: var(--music-muted);
          font-size: clamp(14px, 1.7vw, 17px);
          line-height: 1.9;
        }
        .featured-record {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(260px, 0.95fr);
          gap: clamp(30px, 6vw, 68px);
          align-items: center;
          padding-bottom: clamp(52px, 9vw, 96px);
          border-bottom: 1px solid var(--music-line);
        }
        .featured-record__artwork {
          position: relative;
          overflow: hidden;
          aspect-ratio: 1;
          background: var(--music-panel-raised);
          border: 1px solid var(--music-line);
          box-shadow: 0 28px 65px rgba(0, 0, 0, 0.35);
        }
        .featured-record__artwork::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
        }
        .featured-record__artwork img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          filter: saturate(0.86) contrast(1.04);
          transition: transform 700ms cubic-bezier(.2, .75, .25, 1), filter 700ms ease;
        }
        .featured-record:hover .featured-record__artwork img {
          transform: scale(1.025);
          filter: saturate(1) contrast(1.03);
        }
        .featured-record__number {
          position: absolute;
          right: 14px;
          bottom: 12px;
          color: rgba(240, 231, 213, 0.86);
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
        }
        .featured-record__copy {
          min-width: 0;
        }
        .featured-record__meta,
        .track-entry__meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          color: var(--music-signal);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .featured-record__title {
          margin: 22px 0 2px;
          font-family: 'Iowan Old Style', 'Palatino Linotype', 'Noto Serif SC', 'Songti SC', serif;
          font-size: clamp(42px, 6vw, 68px);
          font-weight: 500;
          letter-spacing: -0.045em;
          line-height: 1;
        }
        .featured-record__artist,
        .track-entry__artist {
          margin: 0;
          color: var(--music-muted);
          font-size: 12px;
          font-weight: 650;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .featured-record__note {
          margin: 32px 0;
          color: var(--music-paper);
          font-family: 'Iowan Old Style', 'Palatino Linotype', 'Noto Serif SC', 'Songti SC', serif;
          font-size: clamp(17px, 2.2vw, 22px);
          line-height: 1.75;
        }
        .music-link {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          color: inherit;
          text-decoration: none;
          transition: color 180ms ease, border-color 180ms ease, background-color 180ms ease;
        }
        .music-link svg {
          width: 15px;
          height: 15px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.4;
        }
        .music-link--featured {
          min-height: 48px;
          padding: 0 17px;
          color: var(--music-paper);
          border: 1px solid var(--music-line);
          background: rgba(240, 231, 213, 0.04);
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.14em;
        }
        .music-link--featured .music-link__label {
          color: var(--music-muted);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0;
        }
        .music-link--featured:hover {
          color: var(--music-ink);
          border-color: var(--music-signal);
          background: var(--music-signal);
        }
        .music-link--featured:hover .music-link__label {
          color: rgba(16, 14, 13, 0.72);
        }
        .music-link:focus-visible {
          outline: 2px solid var(--music-signal);
          outline-offset: 4px;
        }
        .record-shelf,
        .playlist-index {
          padding-top: clamp(50px, 9vw, 92px);
        }
        .music-section-heading {
          display: grid;
          grid-template-columns: minmax(220px, 1fr) minmax(240px, 0.8fr);
          gap: 36px;
          align-items: end;
          margin-bottom: 34px;
        }
        .music-section-heading h2 {
          margin: 10px 0 0;
          font-family: 'Iowan Old Style', 'Palatino Linotype', 'Noto Serif SC', 'Songti SC', serif;
          font-size: clamp(31px, 4vw, 46px);
          font-weight: 500;
          letter-spacing: -0.035em;
          line-height: 1;
        }
        .music-section-heading > p {
          margin: 0;
          color: var(--music-muted);
          font-size: 13px;
          line-height: 1.7;
        }
        .record-shelf__list {
          border-top: 1px solid var(--music-line);
        }
        .track-entry {
          display: grid;
          grid-template-columns: 116px minmax(0, 1fr);
          gap: clamp(22px, 4vw, 42px);
          padding: 30px 0;
          border-bottom: 1px solid var(--music-line);
        }
        .track-entry__artwork {
          width: 116px;
          height: 116px;
          display: block;
          object-fit: cover;
          background: var(--music-panel-raised);
          border: 1px solid var(--music-line);
          filter: saturate(0.78);
          transition: filter 260ms ease, transform 260ms ease;
        }
        .track-entry:hover .track-entry__artwork {
          filter: saturate(1);
          transform: translateY(-2px);
        }
        .track-entry__body {
          min-width: 0;
        }
        .track-entry__meta {
          justify-content: flex-start;
          gap: 18px;
          color: var(--music-muted);
        }
        .track-entry h3 {
          margin: 12px 0 2px;
          color: var(--music-paper);
          font-family: 'Iowan Old Style', 'Palatino Linotype', 'Noto Serif SC', 'Songti SC', serif;
          font-size: clamp(25px, 3.4vw, 36px);
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1.05;
        }
        .track-entry__note {
          max-width: 610px;
          margin: 17px 0 15px;
          color: var(--music-muted);
          font-size: 13px;
          line-height: 1.8;
        }
        .music-link--quiet {
          color: var(--music-paper);
          border-bottom: 1px solid var(--music-line);
          padding-bottom: 3px;
          font-size: 11px;
        }
        .music-link--quiet:hover {
          color: var(--music-signal);
          border-color: var(--music-signal);
        }
        .playlist-index {
          padding-bottom: 4px;
        }
        .music-section-heading--playlists {
          padding-top: clamp(12px, 3vw, 28px);
          border-top: 1px solid var(--music-line);
        }
        .playlist-feature {
          display: grid;
          grid-template-columns: minmax(280px, 0.82fr) minmax(360px, 1.18fr);
          min-width: 0;
          margin-bottom: 1px;
          border: 1px solid var(--music-line);
          background:
            linear-gradient(128deg, rgba(129, 149, 166, 0.11), transparent 46%),
            var(--music-panel);
        }
        .playlist-feature__identity,
        .playlist-feature__preview {
          min-width: 0;
          padding: clamp(26px, 4.5vw, 48px);
        }
        .playlist-feature__identity {
          border-right: 1px solid var(--music-line);
        }
        .playlist-feature__meta,
        .playlist-preview__heading,
        .playlist-card__meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          color: var(--music-muted);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          line-height: 1.5;
          text-transform: uppercase;
        }
        .playlist-feature__meta span:first-child,
        .playlist-feature__classification,
        .playlist-card__classification {
          color: var(--music-signal);
        }
        .playlist-feature__count {
          display: block;
          margin: clamp(48px, 8vw, 82px) 0 0;
          color: var(--music-paper);
          font-family: 'Iowan Old Style', 'Palatino Linotype', 'Noto Serif SC', 'Songti SC', serif;
          font-size: clamp(104px, 15vw, 176px);
          font-weight: 400;
          letter-spacing: -0.085em;
          line-height: 0.68;
          font-variant-numeric: lining-nums tabular-nums;
        }
        .playlist-feature__count-label {
          margin: 28px 0 0;
          color: var(--music-muted);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .playlist-feature__classification {
          margin: 34px 0 0;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          line-height: 1.5;
          text-transform: uppercase;
        }
        .playlist-feature h3 {
          margin: 12px 0 15px;
          color: var(--music-paper);
          font-family: 'Iowan Old Style', 'Palatino Linotype', 'Noto Serif SC', 'Songti SC', serif;
          font-size: clamp(33px, 4vw, 49px);
          font-weight: 500;
          letter-spacing: -0.045em;
          line-height: 0.98;
        }
        .playlist-feature__description {
          max-width: 460px;
          margin: 0 0 30px;
          color: var(--music-muted);
          font-size: 12px;
          line-height: 1.85;
        }
        .music-link--apple {
          min-height: 46px;
          padding: 0 16px;
          color: var(--music-paper);
          border: 1px solid var(--music-line);
          background: rgba(240, 231, 213, 0.035);
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.08em;
        }
        .music-link--apple:hover {
          color: var(--music-ink);
          border-color: var(--music-signal);
          background: var(--music-signal);
        }
        .playlist-feature__preview {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .playlist-preview__heading {
          margin-bottom: 14px;
        }
        .playlist-preview__tracks,
        .playlist-card__tracks {
          list-style: none;
          padding: 0;
          margin: 0;
          border-top: 1px solid var(--music-line);
        }
        .playlist-preview__tracks li,
        .playlist-card__tracks li {
          border-bottom: 1px solid var(--music-line);
        }
        .playlist-preview__tracks a {
          display: grid;
          grid-template-columns: 28px minmax(0, 1fr) 16px;
          gap: 16px;
          align-items: center;
          min-height: 62px;
          color: var(--music-paper);
          text-decoration: none;
          transition: color 180ms ease, padding 180ms ease;
        }
        .playlist-preview__tracks a:hover {
          color: var(--music-signal);
          padding-left: 6px;
        }
        .playlist-preview__tracks a:focus-visible,
        .playlist-card__tracks a:focus-visible {
          outline: 2px solid var(--music-signal);
          outline-offset: 3px;
        }
        .playlist-preview__number,
        .playlist-card__track-number {
          color: var(--music-muted);
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 9px;
        }
        .playlist-preview__track,
        .playlist-card__track-copy {
          min-width: 0;
        }
        .playlist-preview__track strong,
        .playlist-preview__track span,
        .playlist-card__track-copy strong,
        .playlist-card__track-copy span {
          display: block;
          min-width: 0;
          overflow-wrap: anywhere;
        }
        .playlist-preview__track strong {
          font-family: 'Iowan Old Style', 'Palatino Linotype', 'Noto Serif SC', 'Songti SC', serif;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.25;
        }
        .playlist-preview__track span {
          margin-top: 3px;
          color: var(--music-muted);
          font-size: 10px;
          line-height: 1.35;
        }
        .playlist-preview__tracks svg {
          width: 14px;
          height: 14px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.4;
        }
        .playlist-index__grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1px;
          list-style: none;
          padding: 0;
          margin: 0;
          background: var(--music-line);
          border: 1px solid var(--music-line);
        }
        .playlist-card {
          min-width: 0;
          padding: clamp(22px, 3.5vw, 34px);
          background: var(--music-panel);
        }
        .playlist-card article {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .playlist-card__index {
          color: var(--music-signal);
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 11px;
        }
        .playlist-card__classification {
          min-height: 3em;
          margin: 42px 0 14px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          line-height: 1.5;
          text-transform: uppercase;
        }
        .playlist-card h3 {
          margin: 0 0 15px;
          color: var(--music-paper);
          font-family: 'Iowan Old Style', 'Palatino Linotype', 'Noto Serif SC', 'Songti SC', serif;
          font-size: clamp(22px, 2.5vw, 29px);
          font-weight: 500;
          letter-spacing: -0.025em;
          line-height: 1.1;
        }
        .playlist-card__source {
          margin: -5px 0 18px;
          color: var(--music-muted);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.12em;
          line-height: 1.5;
          text-transform: uppercase;
        }
        .playlist-card__description {
          min-height: 8.2em;
          margin: 0 0 18px;
          color: var(--music-muted);
          font-size: 12px;
          line-height: 1.7;
        }
        .playlist-card__metrics {
          min-height: 2.8em;
          margin: 0 0 20px;
          color: var(--music-paper);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.08em;
          line-height: 1.5;
          text-transform: uppercase;
        }
        .playlist-card__metrics span {
          color: var(--music-signal);
          padding: 0 4px;
        }
        .playlist-card__tracks a {
          display: grid;
          grid-template-columns: 22px minmax(0, 1fr);
          gap: 10px;
          align-items: center;
          min-height: 54px;
          color: var(--music-paper);
          text-decoration: none;
          transition: color 180ms ease, transform 180ms ease;
        }
        .playlist-card__tracks a:hover {
          color: var(--music-signal);
          transform: translateX(4px);
        }
        .playlist-card__track-copy strong {
          font-family: 'Iowan Old Style', 'Palatino Linotype', 'Noto Serif SC', 'Songti SC', serif;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.3;
        }
        .playlist-card__track-copy span {
          margin-top: 3px;
          color: var(--music-muted);
          font-size: 9px;
          line-height: 1.35;
        }
        .playlist-card__link {
          align-self: flex-start;
          min-height: 44px;
          margin-top: 24px;
        }
        @media (max-width: 800px) {
          .featured-record {
            grid-template-columns: 1fr;
          }
          .featured-record__artwork {
            width: min(100%, 560px);
          }
          .featured-record__copy {
            max-width: 600px;
          }
          .playlist-feature {
            grid-template-columns: 1fr;
          }
          .playlist-feature__identity {
            border-right: 0;
            border-bottom: 1px solid var(--music-line);
          }
          .playlist-index__grid {
            grid-template-columns: 1fr;
          }
          .playlist-card__classification,
          .playlist-card h3,
          .playlist-card__description {
            min-height: 0;
          }
        }
        @media (max-width: 560px) {
          .music-archive {
            border-radius: 8px;
            padding: 26px 20px 34px;
          }
          .music-archive__header {
            margin-bottom: 48px;
          }
          .music-archive__title {
            font-size: clamp(44px, 17vw, 68px);
          }
          .featured-record {
            gap: 30px;
            padding-bottom: 54px;
          }
          .music-link--featured {
            width: 100%;
            box-sizing: border-box;
            justify-content: space-between;
          }
          .music-link--featured .music-link__label {
            display: none;
          }
          .music-link--apple {
            width: 100%;
            box-sizing: border-box;
            justify-content: space-between;
          }
          .music-section-heading {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .playlist-feature__identity,
          .playlist-feature__preview {
            padding: 25px 20px;
          }
          .playlist-feature__meta {
            align-items: flex-start;
          }
          .playlist-feature__count {
            margin-top: 58px;
            font-size: clamp(92px, 34vw, 132px);
          }
          .playlist-preview__tracks a {
            grid-template-columns: 24px minmax(0, 1fr) 14px;
            gap: 11px;
          }
          .track-entry {
            grid-template-columns: 82px minmax(0, 1fr);
            gap: 18px;
            padding: 24px 0;
          }
          .track-entry__artwork {
            width: 82px;
            height: 82px;
          }
          .track-entry__note {
            margin-top: 14px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .music-archive *,
          .music-archive *::before,
          .music-archive *::after {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  )
}
