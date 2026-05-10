export default function QRCard({ label, icon, src }) {
  return (
    <div className="qr-card" aria-label={label}>
      <div className="qr-front">
        <div className="qr-icon">{icon}</div>
      </div>
      <div className="qr-back">
        <img src={src} alt={`${label} QR`} className="qr-img" />
      </div>
      <style>{`
        .qr-card {
          width: 195px;
          height: 285px;
          border-radius: 20px;
          border: 1px solid var(--color-card-border);
          background: var(--color-card-bg);
          flex-shrink: 0;
          position: relative;
          cursor: pointer;
          perspective: 1000px;
        }
        .qr-front, .qr-back {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--color-card-bg);
          transition: transform 0.6s cubic-bezier(.4,0,.2,1);
        }
        .qr-back {
          transform: rotateY(180deg);
          padding: 20px;
        }
        .qr-card:hover .qr-front {
          transform: rotateY(-180deg);
        }
        .qr-card:hover .qr-back {
          transform: rotateY(0deg);
        }
        .qr-card:hover {
          transform: scale(1.04) rotate(-1deg);
          transition: transform 0.2s ease-in-out;
        }
        .qr-icon {
          color: var(--color-text-primary);
          margin-bottom: 12px;
        }
        .qr-icon svg {
          width: 60px;
          height: 60px;
        }
        .qr-label {
          font-size: 16px;
          font-weight: 700;
          color: var(--color-text-primary);
        }
        .qr-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 10px;
        }
      `}</style>
    </div>
  )
}
