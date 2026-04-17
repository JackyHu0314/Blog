import { useState } from 'react'

export default function DynamicCard({
  label,
  icon,
  href,
  description,
  flipBack = null,
}) {
  const [flipped, setFlipped] = useState(false)
  const Tag = href ? 'a' : 'div'
  const linkProps = href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : flipBack
    ? { onClick: () => setFlipped(f => !f), role: 'button', tabIndex: 0 }
    : {}

  return (
    <Tag
      {...linkProps}
      className={`dyn-card ${flipBack ? 'dyn-card-flip' : ''} ${flipped ? 'is-flipped' : ''}`}
      aria-label={label}
      style={{ perspective: '1000px' }}
    >
      <div className={`dyn-inner ${flipped ? 'dyn-inner-flipped' : ''}`}>
        {/* Front */}
        <div className="dyn-face dyn-front">
          <div className="icon">{icon}</div>
          <div className="textBox">
            <p className="text head">{label}</p>
            {description && <span>{description}</span>}
          </div>
        </div>

        {/* Back */}
        {flipBack && (
          <div className="dyn-face dyn-back">
            {flipBack}
          </div>
        )}
      </div>

      <style>{`
        .dyn-card {
          width: 195px;
          height: 285px;
          border-radius: 20px;
          color: var(--color-text-primary);
          text-decoration: none;
          border: 1px solid var(--color-card-border);
          cursor: pointer;
          flex-shrink: 0;
          display: block;
          position: relative;
        }
        .dyn-card:not(.is-flipped):hover {
          transform: scale(1.04) rotate(-1deg);
          transition: transform 0.2s ease-in-out;
        }
        .dyn-inner {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.65s cubic-bezier(.4,0,.2,1);
          border-radius: 20px;
        }
        .dyn-inner-flipped {
          transform: rotateY(180deg);
        }
        .dyn-face {
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
          overflow: hidden;
        }
        .dyn-back {
          transform: rotateY(180deg);
          padding: 12px;
          gap: 8px;
        }
        .flip-close {
          position: absolute;
          top: 10px;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          color: var(--color-text-secondary);
          line-height: 1;
          padding: 2px 4px;
          z-index: 2;
        }
        .flip-close:hover { color: var(--color-text-primary); }
        .icon {
          height: 30%;
          position: absolute;
          transition: 0.25s ease-in-out;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-primary);
        }
        .icon svg {
          width: 60px;
          height: 60px;
        }
        .textBox {
          opacity: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 15px;
          transition: 0.25s ease-in-out;
          z-index: 2;
        }
        .textBox > .text { font-weight: bold; }
        .textBox > .head { font-size: 20px; margin: 0; }
        .textBox > span { font-size: 12px; color: var(--color-text-secondary); }
        .dyn-card:not(.dyn-card-flip):hover .textBox { opacity: 1; }
        .dyn-card:not(.dyn-card-flip):hover .icon {
          height: 65%;
          filter: blur(7px);
          animation: dyn-float 3s ease-in-out infinite;
        }
        .dyn-card-flip:not(.is-flipped):hover .textBox { opacity: 1; }
        .dyn-card-flip.is-flipped .icon {
          animation: none;
          filter: none;
        }
        @keyframes dyn-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </Tag>
  )
}
