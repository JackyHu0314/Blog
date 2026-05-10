export default function JackySignature() {
  return (
    <div className="sig-wrap" aria-label="Jacky">
      <svg viewBox="0 0 260 80" xmlns="http://www.w3.org/2000/svg" className="sig-svg">
        <path
          d="M 20 60 C 25 20, 35 15, 38 35 C 40 50, 36 65, 30 70"
          fill="none" stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
        />
        <path
          d="M 50 25 C 55 25, 60 30, 58 42 C 56 54, 48 60, 44 55 C 40 50, 44 40, 52 38 C 60 36, 65 42, 62 52"
          fill="none" stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
        />
        <path
          d="M 72 28 L 68 55 M 72 28 C 80 35, 84 38, 80 45 C 76 52, 70 54, 68 55 M 80 45 C 86 50, 90 56, 88 60"
          fill="none" stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
        />
        <path
          d="M 98 28 C 92 38, 90 48, 94 55 C 98 62, 106 60, 108 52 C 110 44, 104 36, 98 38 C 92 40, 90 50, 96 56"
          fill="none" stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
        />
        <path
          d="M 118 28 L 116 60 M 116 42 C 122 36, 130 34, 132 42 C 134 50, 128 58, 120 60"
          fill="none" stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
        />
        <path
          d="M 148 35 C 144 28, 138 30, 138 40 C 138 52, 148 58, 154 52 C 160 46, 156 34, 148 35"
          fill="none" stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
        />
        <path
          d="M 20 72 Q 100 78 200 68"
          fill="none" stroke="currentColor" strokeWidth="1.2"
          strokeLinecap="round" opacity="0.4"
        />
      </svg>
      <style>{`
        .sig-wrap {
          display: flex;
          justify-content: flex-end;
          margin-top: 40px;
          margin-bottom: 8px;
          opacity: 0.7;
        }
        .sig-svg {
          width: 160px;
          height: 50px;
          color: var(--color-text-primary);
        }
      `}</style>
    </div>
  )
}
