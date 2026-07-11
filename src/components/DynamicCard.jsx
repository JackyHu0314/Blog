export default function DynamicCard({ label, icon, href, description }) {
  return (
    <a
      href={href}
      target={href?.startsWith('mailto:') ? undefined : '_blank'}
      rel={href?.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      className="dyn-card"
      aria-label={label}
    >
      <span className="dyn-card-index" aria-hidden="true">↗</span>
      <span className="dyn-card-icon">{icon}</span>
      <span className="dyn-card-copy">
        <strong>{label}</strong>
        {description ? <small>{description}</small> : null}
      </span>

      <style>{`
        .dyn-card {
          position: relative;
          display: flex;
          width: 180px;
          min-height: 180px;
          padding: 22px;
          flex-direction: column;
          border: 1px solid var(--color-card-border);
          border-radius: 3px;
          background: var(--color-card-bg);
          color: var(--color-text-primary);
          text-decoration: none;
          transition: transform 280ms var(--ease-silk), border-color 280ms ease, box-shadow 280ms ease;
        }
        .dyn-card:hover {
          border-color: var(--color-accent);
          box-shadow: var(--shadow-soft);
          transform: translateY(-5px);
        }
        .dyn-card-index {
          position: absolute;
          top: 16px;
          right: 18px;
          color: var(--color-text-secondary);
          font-size: 12px;
        }
        .dyn-card-icon {
          display: inline-flex;
          width: 38px;
          height: 38px;
          margin-bottom: auto;
          align-items: center;
          color: var(--color-accent);
        }
        .dyn-card-icon svg {
          width: 100%;
          height: 100%;
        }
        .dyn-card-copy {
          display: grid;
          gap: 3px;
          margin-top: 30px;
        }
        .dyn-card-copy strong {
          font-family: var(--font-display);
          font-size: 19px;
          font-weight: 500;
          line-height: 1.1;
        }
        .dyn-card-copy small {
          color: var(--color-text-secondary);
          font-size: 10px;
          line-height: 1.5;
        }
      `}</style>
    </a>
  )
}
