export default function PearlButton({ children, onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="pearl-button"
    >
      <span className="pb-text">{children}</span>
      <style>{`
        .pearl-button {
          position: relative;
          cursor: pointer;
          border: 2px solid var(--color-text-primary);
          outline: none;
          border-radius: 100px;
          padding: 18px 42px;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--color-text-primary);
          background: transparent;
          transition: all 0.2s var(--ease-silk);
        }
        .pearl-button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .pearl-button .pb-text {
          position: relative;
          z-index: 1;
        }

        .pearl-button:hover:not(:disabled) {
          background: var(--color-text-primary);
          color: var(--color-bg-primary);
          transform: scale(1.04) rotate(-1deg);
        }

        .pearl-button:active:not(:disabled) {
          transform: scale(0.98);
        }
      `}</style>
    </button>
  )
}
