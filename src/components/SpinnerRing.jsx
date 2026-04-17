export default function SpinnerRing({ size = 96 }) {
  return (
    <div
      className="spinner-ring"
      style={{ '--ring-size': `${size}px` }}
    >
      <span />
      <span />
      <span />
      <span />
      <style>{`
        .spinner-ring {
          position: relative;
          width: var(--ring-size);
          height: var(--ring-size);
          border-radius: 50%;
          animation: rotate-ring 1.2s linear infinite;
          background-image: linear-gradient(#5f29c7, #0ed2da, #f472b6);
        }
        .spinner-ring span {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background-image: linear-gradient(#5f29c7, #0ed2da, #f472b6);
        }
        .spinner-ring span:nth-of-type(1) { filter: blur(5px); }
        .spinner-ring span:nth-of-type(2) { filter: blur(10px); }
        .spinner-ring span:nth-of-type(3) { filter: blur(25px); }
        .spinner-ring span:nth-of-type(4) { filter: blur(50px); }
        .spinner-ring::after {
          content: "";
          position: absolute;
          inset: 10px;
          background-color: var(--color-page-bg, #fff);
          border: solid 5px var(--color-page-bg, #fff);
          border-radius: 50%;
        }
      `}</style>
    </div>
  )
}
