import { Link, useParams } from 'react-router-dom'
import { journals } from '../data/journals'
import { useLanguage } from '../context/LanguageContext'
import CategoryBadge from '../components/CategoryBadge'
import TableOfContents from '../components/TableOfContents'
import CommentSection from '../components/CommentSection'
import HaydRecommend from '../components/HaydRecommend'

function renderBody(md) {
  if (!md) return null
  const lines = md.split('\n')
  const blocks = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (line.trim() === '') { i++; continue }
    if (line.startsWith('## ')) { blocks.push({ type: 'h2', text: line.slice(3) }); i++; continue }
    if (line.startsWith('### ')) { blocks.push({ type: 'h3', text: line.slice(4) }); i++; continue }
    if (line.startsWith('#### ')) { blocks.push({ type: 'h4', text: line.slice(5) }); i++; continue }
    if (line.startsWith('> ')) { blocks.push({ type: 'quote', text: line.slice(2) }); i++; continue }
    if (line.startsWith('- ')) {
      const items = []
      while (i < lines.length && lines[i].startsWith('- ')) { items.push(lines[i].slice(2)); i++ }
      blocks.push({ type: 'ul', items }); continue
    }
    blocks.push({ type: 'p', text: line }); i++
  }

  const renderInline = (text) =>
    text.split(/(\*\*[^*]+\*\*)/g).map((part, k) => {
      if (part.startsWith('**') && part.endsWith('**'))
        return <strong key={k}>{part.slice(2, -2)}</strong>
      return <span key={k}>{part}</span>
    })

  return blocks.map((b, idx) => {
    switch (b.type) {
      case 'h2': return <h2 key={idx} className="article-h2">{renderInline(b.text)}</h2>
      case 'h3': return <h3 key={idx} className="article-h3">{renderInline(b.text)}</h3>
      case 'h4': return <h4 key={idx} className="article-h4">{renderInline(b.text)}</h4>
      case 'quote': return <blockquote key={idx} className="article-quote">{renderInline(b.text)}</blockquote>
      case 'ul':
        return (
          <ul key={idx} className="article-ul">
            {b.items.map((it, k) => <li key={k}>{renderInline(it)}</li>)}
          </ul>
        )
      default: return <p key={idx} className="article-p">{renderInline(b.text)}</p>
    }
  })
}

export default function JournalDetail() {
  const { id } = useParams()
  const { tr } = useLanguage()
  const journal = journals.find((j) => String(j.id) === String(id))

  if (!journal) {
    return (
      <div>
        <p className="text-text-secondary mb-6">没有找到这篇文章。</p>
        <Link to="/journal" className="underline text-text-primary">← 返回随记</Link>
      </div>
    )
  }

  const bodyText = tr(journal.body)

  return (
    <div className="detail-root">
      <div className="detail-layout">
        <article className="detail-article">
          <Link to="/journal" className="article-back">← 返回随记</Link>

          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <CategoryBadge label={journal.category} />
              <span className="text-xs text-text-secondary tracking-wider">{journal.date}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight">
              {tr(journal.title)}
            </h1>
          </header>

          <HaydRecommend song={journal.song} />

          <div className="article-body">{renderBody(bodyText)}</div>

          <CommentSection articleId={journal.id} />
        </article>

        <TableOfContents body={bodyText} />
      </div>

      <style>{`
        .detail-root { }
        .detail-cover-banner {
          width: 100%;
          height: 220px;
          background-size: cover;
          background-position: center;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          margin-bottom: 32px;
        }
        .detail-cover-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 30%, var(--color-page-bg) 100%);
        }
        .detail-layout {
          display: flex;
          gap: 40px;
          align-items: flex-start;
        }
        .detail-article {
          flex: 1;
          min-width: 0;
          max-width: 760px;
        }
        .article-back {
          display: inline-block;
          margin-bottom: 28px;
          font-size: 13px;
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color 0.2s var(--ease-silk);
        }
        .article-back:hover { color: var(--color-text-primary); }
        .article-body {
          color: #000000;
          font-size: 16px;
          line-height: 1.9;
        }
        .dark .article-body { color: #e8eaed; }
        .article-body .article-p { color: #000000; margin: 0 0 1.2em 0; }
        .dark .article-body .article-p { color: #e8eaed; }
        .article-body .article-h2 {
          color: #000000;
          font-size: 22px;
          font-weight: 700;
          margin: 2em 0 0.8em 0;
          padding-bottom: 0.3em;
          border-bottom: 1px solid var(--color-card-border);
        }
        .dark .article-body .article-h2 { color: #e8eaed; }
        .article-body .article-h3 { color: #000000; font-size: 18px; font-weight: 700; margin: 1.6em 0 0.6em 0; }
        .dark .article-body .article-h3 { color: #e8eaed; }
        .article-body .article-h4 { color: #000000; font-size: 16px; font-weight: 700; margin: 1.4em 0 0.5em 0; }
        .dark .article-body .article-h4 { color: #e8eaed; }
        .article-body .article-quote {
          margin: 1.4em 0;
          padding: 0.4em 1em;
          border-left: 3px solid #000000;
          color: #000000;
          font-style: italic;
          opacity: 0.75;
        }
        .dark .article-body .article-quote { border-left-color: #e8eaed; color: #e8eaed; }
        .article-body .article-ul { list-style: disc; padding-left: 1.4em; margin: 0 0 1.2em 0; color: #000000; }
        .dark .article-body .article-ul { color: #e8eaed; }
        .article-body .article-ul li { margin: 0.25em 0; }
        .article-body strong { color: #000000; }
        .dark .article-body strong { color: #e8eaed; }
      `}</style>
    </div>
  )
}
