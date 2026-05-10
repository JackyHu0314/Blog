import { useState } from 'react'

/**
 * ArticleTOC — 文章侧边栏目录（玻璃质感 radio 样式）
 *
 * 默认形态：每个小标题左侧有白色小球；鼠标悬停时小球变主渐变色（青→紫）。
 * 当前接入 Markdown 文章系统前为占位组件，items 需要从 Markdown 的 heading 提取。
 */
export default function ArticleTOC({
  items = [],
  onSelect = () => {},
}) {
  const [active, setActive] = useState(items[0]?.id ?? null)

  function handleClick(id) {
    setActive(id)
    onSelect(id)
  }

  if (!items.length) {
    return (
      <aside className="toc-empty">
        <p>暂无目录</p>
        <style>{`
          .toc-empty {
            padding: 16px 20px;
            border-radius: 18px;
            color: var(--color-text-secondary);
            font-size: 13px;
            background: rgba(190,189,189,0.18);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,0.2);
          }
        `}</style>
      </aside>
    )
  }

  return (
    <aside className="toc-wrap">
      <div className="glass">
        <div className="glass-inner" />
      </div>

      <ul className="toc-list">
        {items.map((item) => (
          <li key={item.id} className={active === item.id ? 'active' : ''}>
            <button onClick={() => handleClick(item.id)} className="toc-item">
              <span className="ball" />
              <span className="label" style={{ paddingLeft: `${(item.depth ?? 1) * 8}px` }}>
                {item.text}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <style>{`
        .toc-wrap {
          position: relative;
          display: flex;
          align-items: stretch;
          padding: 12px;
        }
        .glass {
          position: absolute;
          inset: 0;
          z-index: 0;
          padding: 8px;
          background-color: rgba(190,189,189,0.35);
          border-radius: 24px;
          box-shadow:
            rgba(50,50,93,0.12) 0px 25px 50px -10px,
            rgba(0,0,0,0.18) 0px 10px 30px -15px,
            rgba(10,37,64,0.2) 0px -2px 6px 0px inset;
          backdrop-filter: blur(10px);
        }
        .glass-inner {
          width: 100%; height: 100%;
          border: 6px solid rgba(245,245,245,0.35);
          border-radius: 20px;
        }
        .toc-list {
          position: relative;
          z-index: 1;
          list-style: none;
          margin: 0; padding: 6px 4px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 100%;
        }
        .toc-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 8px 10px;
          background: transparent;
          border: 0;
          cursor: pointer;
          border-radius: 10px;
          text-align: left;
          color: var(--color-text-primary);
          transition: background 0.3s var(--ease-silk);
        }
        .toc-item:hover {
          background: rgba(255,255,255,0.25);
        }
        .ball {
          display: inline-block;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #fff;
          box-shadow:
            rgba(0,0,0,0.18) 0px -3px 6px 0px inset,
            rgba(0,0,0,0.12) 0px 2px 4px;
          transition: background 0.4s var(--ease-silk), transform 0.4s var(--ease-silk), box-shadow 0.4s var(--ease-silk);
          flex-shrink: 0;
        }
        .toc-item:hover .ball,
        li.active .ball {
          background: linear-gradient(135deg, #0ed2da, #5f29c7);
          transform: scale(1.15);
          box-shadow: 0 0 12px rgba(95,41,199,0.5);
        }
        .label {
          font-size: 13px;
          font-weight: 500;
          color: var(--color-text-secondary);
          transition: color 0.3s;
        }
        .toc-item:hover .label,
        li.active .label {
          color: var(--color-text-primary);
        }
      `}</style>
    </aside>
  )
}
