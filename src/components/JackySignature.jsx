import { useState } from 'react'

// Nav signature: the name is revealed left to right like a pen stroke, then a flourish is drawn under it.
// Hovering replays the stroke by remounting the animated nodes.
export default function JackySignature() {
  const [take, setTake] = useState(0)

  return (
    <span className="signature" onMouseEnter={() => setTake((current) => current + 1)}>
      <span key={`name-${take}`} className="signature-name">Jacky Hu</span>
      <svg key={`flourish-${take}`} className="signature-flourish" viewBox="0 0 160 18" aria-hidden="true">
        <path d="M4 12 C 40 4, 92 3, 126 8 S 154 15, 156 6" pathLength="1" />
      </svg>
    </span>
  )
}
