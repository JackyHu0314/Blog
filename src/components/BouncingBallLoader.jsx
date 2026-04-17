export default function BouncingBallLoader() {
  return (
    <div className="bbl-loader" aria-label="加载中">
      <style>{`
        .bbl-loader {
          position: relative;
          width: 120px;
          height: 180px;
          margin: 0 auto;
        }
        .bbl-loader:before {
          content: "";
          position: absolute;
          bottom: 30px;
          left: 50px;
          height: 30px;
          width: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0ed2da, #5f29c7);
          box-shadow: 0 0 20px rgba(95, 41, 199, 0.4);
          animation: bbl-bounce 0.5s ease-in-out infinite alternate;
        }
        .bbl-loader:after {
          content: "";
          position: absolute;
          right: 0;
          top: 0;
          height: 7px;
          width: 45px;
          border-radius: 4px;
          background: transparent;
          color: currentColor;
          animation: bbl-step 1s ease-in-out infinite;
        }
        @keyframes bbl-bounce {
          0%   { transform: scale(1, 0.7); }
          40%  { transform: scale(0.8, 1.2); }
          60%  { transform: scale(1, 1); }
          100% { bottom: 140px; }
        }
        @keyframes bbl-step {
          0% {
            box-shadow: 0 10px 0 rgba(0,0,0,0),
              0 10px 0 currentColor,
              -35px 50px 0 currentColor,
              -70px 90px 0 currentColor;
          }
          100% {
            box-shadow: 0 10px 0 currentColor,
              -35px 50px 0 currentColor,
              -70px 90px 0 currentColor,
              -70px 90px 0 rgba(0,0,0,0);
          }
        }
      `}</style>
    </div>
  )
}
