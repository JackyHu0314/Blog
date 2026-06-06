export default function CommentSection() {
  return (
    <section className="comment-section" aria-label="评论区">
      <h2 className="comment-title">评论</h2>
      <p className="comment-note">
        评论区暂时关闭。本站目前通过域名托管和 GitHub 静态网页分发，暂时没有接入后端与评论数据库。
      </p>

      <style>{`
        .comment-section {
          margin-top: 56px;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid var(--color-card-border);
          background: var(--color-card-bg);
        }
        .comment-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--color-text-primary);
          margin: 0 0 10px 0;
        }
        .comment-note {
          font-size: 14px;
          line-height: 1.7;
          color: var(--color-text-secondary);
          margin: 0;
        }
      `}</style>
    </section>
  )
}
