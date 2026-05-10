import { useState } from 'react'

export default function CommentSection({ articleId }) {
  const [comments, setComments] = useState([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim() || !text.trim()) return
    setComments(prev => [...prev, {
      id: Date.now(),
      name: name.trim(),
      text: text.trim(),
      date: new Date().toLocaleDateString('zh-CN'),
    }])
    setName('')
    setText('')
  }

  return (
    <section className="comment-section">
      <h2 className="comment-title">评论</h2>

      {comments.length === 0 && (
        <p className="comment-empty">还没有评论，来说点什么吧</p>
      )}

      <ul className="comment-list">
        {comments.map(c => (
          <li key={c.id} className="comment-item">
            <div className="comment-header">
              <span className="comment-name">{c.name}</span>
              <span className="comment-date">{c.date}</span>
              <button
                className="comment-delete"
                onClick={() => setComments(prev => prev.filter(x => x.id !== c.id))}
                aria-label="删除评论"
              >删除</button>
            </div>
            <p className="comment-text">{c.text}</p>
          </li>
        ))}
      </ul>

      <form className="comment-form" onSubmit={submit}>
        <input
          className="comment-input"
          placeholder="你的名字"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={30}
        />
        <textarea
          className="comment-textarea"
          placeholder="写下你的想法…"
          value={text}
          onChange={e => setText(e.target.value)}
          rows={4}
          maxLength={500}
        />
        <button type="submit" className="comment-submit">发布评论</button>
      </form>

      <style>{`
        .comment-section {
          margin-top: 56px;
          padding-top: 32px;
          border-top: 1px solid var(--color-card-border);
        }
        .comment-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--color-text-primary);
          margin: 0 0 20px 0;
        }
        .comment-empty {
          font-size: 14px;
          color: var(--color-text-secondary);
          margin: 0 0 24px 0;
        }
        .comment-list {
          list-style: none;
          padding: 0;
          margin: 0 0 28px 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .comment-item {
          padding: 16px;
          border-radius: 10px;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-card-border);
        }
        .comment-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .comment-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-text-primary);
        }
        .comment-date {
          font-size: 12px;
          color: var(--color-text-secondary);
          flex: 1;
        }
        .comment-delete {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 12px;
          color: var(--color-text-secondary);
          padding: 2px 6px;
          border-radius: 4px;
          transition: color 0.2s, background 0.2s;
        }
        .comment-delete:hover { color: #ef4444; background: rgba(239,68,68,0.08); }
        .comment-text {
          font-size: 14px;
          color: var(--color-text-primary);
          line-height: 1.7;
          margin: 0;
        }
        .comment-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .comment-input, .comment-textarea {
          width: 100%;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid var(--color-card-border);
          background: var(--color-card-bg);
          color: var(--color-text-primary);
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
          resize: vertical;
        }
        .comment-input:focus, .comment-textarea:focus {
          border-color: var(--color-text-secondary);
        }
        .comment-submit {
          align-self: flex-start;
          padding: 8px 20px;
          border-radius: 8px;
          border: 1px solid var(--color-card-border);
          background: var(--color-text-primary);
          color: var(--color-page-bg);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .comment-submit:hover { opacity: 0.8; }
      `}</style>
    </section>
  )
}
