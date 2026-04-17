import { useState, useRef, useEffect } from 'react'

export default function SearchBox() {
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  useEffect(() => {
    function onDocClick(e) {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  return (
    <div ref={containerRef} className={`search-box ${open ? 'open' : ''}`}>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="search-trigger interactive"
          aria-label="搜索"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      )}

      {open && (
        <div id="poda">
          <div className="glow"></div>
          <div className="darkBorderBg"></div>
          <div className="darkBorderBg"></div>
          <div className="darkBorderBg"></div>
          <div className="white"></div>
          <div className="border-layer"></div>
          <div id="main">
            <input
              ref={inputRef}
              placeholder="搜索文章句子…"
              type="text"
              className="input"
            />
            <div id="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" strokeWidth="2"
                strokeLinejoin="round" strokeLinecap="round" height="20" fill="none">
                <circle stroke="url(#sg)" r="8" cy="11" cx="11"></circle>
                <line stroke="url(#sgl)" y2="16.65" y1="22" x2="16.65" x1="22"></line>
                <defs>
                  <linearGradient gradientTransform="rotate(50)" id="sg">
                    <stop stopColor="#f8e7f8" offset="0%"></stop>
                    <stop stopColor="#b6a9b7" offset="50%"></stop>
                  </linearGradient>
                  <linearGradient id="sgl">
                    <stop stopColor="#b6a9b7" offset="0%"></stop>
                    <stop stopColor="#837484" offset="50%"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .search-box { position: relative; display: inline-flex; align-items: center; }
        .search-trigger {
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 999px;
          color: var(--color-text-secondary);
          background: transparent; border: 0; cursor: pointer;
        }
        .search-trigger:hover {
          background: var(--color-bg-secondary);
          color: var(--color-text-primary);
        }

        #poda {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          animation: searchIn 0.35s var(--ease-silk);
        }
        @keyframes searchIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }

        .white, .border-layer, .darkBorderBg, .glow {
          max-height: 44px; max-width: 280px;
          height: 100%; width: 100%;
          position: absolute;
          overflow: hidden;
          z-index: 0;
          border-radius: 12px;
          filter: blur(3px);
          pointer-events: none;
        }

        .input {
          background-color: #010201;
          border: none;
          width: 260px;
          height: 40px;
          border-radius: 10px;
          color: white;
          padding-inline: 44px 12px;
          font-size: 14px;
          position: relative;
          z-index: 1;
        }
        .input::placeholder { color: #c0b9c0; }
        .input:focus { outline: none; }

        .white {
          max-height: 38px; max-width: 272px;
          border-radius: 10px;
          filter: blur(2px);
        }
        .white::before {
          content: "";
          z-index: -2;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) rotate(83deg);
          position: absolute;
          width: 600px; height: 600px;
          background-repeat: no-repeat;
          filter: brightness(1.4);
          background-image: conic-gradient(rgba(0,0,0,0), #a099d8, rgba(0,0,0,0) 8%, rgba(0,0,0,0) 50%, #dfa2da, rgba(0,0,0,0) 58%);
          transition: all 2s;
        }
        .border-layer {
          max-height: 34px; max-width: 268px;
          border-radius: 11px;
          filter: blur(0.5px);
        }
        .border-layer::before {
          content: "";
          z-index: -2;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) rotate(70deg);
          position: absolute;
          width: 600px; height: 600px;
          filter: brightness(1.3);
          background-repeat: no-repeat;
          background-image: conic-gradient(#1c191c, #402fb5 5%, #1c191c 14%, #1c191c 50%, #cf30aa 60%, #1c191c 64%);
          transition: all 2s;
        }
        .darkBorderBg { max-height: 40px; max-width: 276px; }
        .darkBorderBg::before {
          content: "";
          z-index: -2;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) rotate(82deg);
          position: absolute;
          width: 600px; height: 600px;
          background-repeat: no-repeat;
          background-image: conic-gradient(rgba(0,0,0,0), #18116a, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 50%, #6e1b60, rgba(0,0,0,0) 60%);
          transition: all 2s;
        }
        #poda:hover > .darkBorderBg::before,
        #poda:focus-within > .darkBorderBg::before {
          transform: translate(-50%, -50%) rotate(-98deg);
        }
        #poda:hover > .glow::before,
        #poda:focus-within > .glow::before {
          transform: translate(-50%, -50%) rotate(-120deg);
        }
        #poda:hover > .white::before,
        #poda:focus-within > .white::before {
          transform: translate(-50%, -50%) rotate(-97deg);
        }
        #poda:hover > .border-layer::before,
        #poda:focus-within > .border-layer::before {
          transform: translate(-50%, -50%) rotate(-110deg);
        }

        .glow {
          overflow: hidden;
          filter: blur(30px);
          opacity: 0.4;
          max-height: 80px; max-width: 320px;
        }
        .glow:before {
          content: "";
          z-index: -2;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) rotate(60deg);
          position: absolute;
          width: 999px; height: 999px;
          background-repeat: no-repeat;
          background-image: conic-gradient(#000, #402fb5 5%, #000 38%, #000 50%, #cf30aa 60%, #000 87%);
          transition: all 2s;
        }

        #main { position: relative; display: flex; align-items: center; }
        #search-icon {
          position: absolute;
          left: 14px; top: 50%;
          transform: translateY(-50%);
          z-index: 2;
          display: flex;
        }
      `}</style>
    </div>
  )
}
