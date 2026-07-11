import { useState } from 'react'

export default function QRCard({ label, icon, src }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <>
      <button
        type="button"
        className={`qr-card ${revealed ? 'is-revealed' : ''}`}
        aria-label={`${label} QR code`}
        aria-expanded={revealed}
        onClick={() => setRevealed((current) => !current)}
      >
        <span className="qr-card-front">
          <span className="qr-card-icon">{icon}</span>
          <strong>{label}</strong>
          <small>Hover / Tap / Focus to reveal</small>
        </span>
        <span className="qr-card-back">
          <img src={src} alt={`${label} QR`} />
        </span>
      </button>
      <style>{`
        .qr-card {
          position: relative;
          width: 180px;
          min-height: 180px;
          overflow: hidden;
          border: 1px solid var(--color-card-border);
          border-radius: 3px;
          background: var(--color-card-bg);
          color: inherit;
          font: inherit;
          text-align: left;
          appearance: none;
          cursor: pointer;
          transition: transform 280ms var(--ease-silk), border-color 280ms ease, box-shadow 280ms ease;
        }
        .qr-card:focus-visible,
        .qr-card.is-revealed {
          border-color: var(--color-accent);
          box-shadow: var(--shadow-soft);
          transform: translateY(-5px);
        }
        .qr-card-front,
        .qr-card-back {
          position: absolute;
          inset: 0;
          display: flex;
          padding: 22px;
          align-items: flex-start;
          flex-direction: column;
          background: var(--color-card-bg);
          transition: opacity 240ms ease, transform 320ms var(--ease-silk);
        }
        .qr-card-back {
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0.96);
        }
        .qr-card:focus-visible .qr-card-front,
        .qr-card.is-revealed .qr-card-front {
          opacity: 0;
          transform: scale(1.03);
        }
        .qr-card:focus-visible .qr-card-back,
        .qr-card.is-revealed .qr-card-back {
          opacity: 1;
          transform: scale(1);
        }
        @media (hover: hover) {
          .qr-card:hover {
            border-color: var(--color-accent);
            box-shadow: var(--shadow-soft);
            transform: translateY(-5px);
          }
          .qr-card:hover .qr-card-front {
            opacity: 0;
            transform: scale(1.03);
          }
          .qr-card:hover .qr-card-back {
            opacity: 1;
            transform: scale(1);
          }
        }
        .qr-card-icon {
          display: inline-flex;
          width: 38px;
          height: 38px;
          margin-bottom: auto;
          color: var(--color-accent);
        }
        .qr-card-icon svg {
          width: 100%;
          height: 100%;
        }
        .qr-card-front strong {
          font-family: var(--font-display);
          font-size: 19px;
          font-weight: 500;
        }
        .qr-card-front small {
          margin-top: 3px;
          color: var(--color-text-secondary);
          font-size: 9px;
        }
        .qr-card-back img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      `}</style>
    </>
  )
}
