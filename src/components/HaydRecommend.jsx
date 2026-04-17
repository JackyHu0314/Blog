export default function HaydRecommend({ song }) {
  if (!song) return null
  return (
    <div className="hayd-card">
      {song.cover && (
        <img src={song.cover} alt={song.title} className="hayd-cover" />
      )}
      <div className="hayd-info">
        <p className="hayd-label">本文配乐 · Hayd</p>
        <p className="hayd-title">{song.title}</p>
        <p className="hayd-vibe">{song.vibe}</p>
      </div>
      <style>{`
        .hayd-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 18px;
          border-radius: 12px;
          border: 1px solid var(--color-card-border);
          background: var(--color-card-bg);
          margin-bottom: 32px;
        }
        .hayd-cover {
          width: 56px;
          height: 56px;
          border-radius: 8px;
          object-fit: cover;
          flex-shrink: 0;
        }
        .hayd-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 0;
        }
        .hayd-label {
          font-size: 11px;
          color: var(--color-text-secondary);
          margin: 0;
          letter-spacing: 0.04em;
        }
        .hayd-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--color-text-primary);
          margin: 0;
        }
        .hayd-vibe {
          font-size: 13px;
          color: var(--color-text-secondary);
          margin: 0;
          line-height: 1.6;
        }
      `}</style>
    </div>
  )
}
