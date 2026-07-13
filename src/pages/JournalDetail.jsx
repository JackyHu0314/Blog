import { Link, useParams } from 'react-router-dom'
import { journals } from '../data/journals'
import { useLanguage } from '../context/LanguageContext'
import CategoryBadge from '../components/CategoryBadge'
import TableOfContents from '../components/TableOfContents'
import CommentSection from '../components/CommentSection'
import HaydRecommend from '../components/HaydRecommend'

function parseBody(markdown) {
  if (!markdown) return { blocks: [], headings: [] }

  const lines = markdown.split('\n')
  const blocks = []
  const headings = []
  let headingIndex = 0
  let index = 0

  while (index < lines.length) {
    const line = lines[index]
    if (line.trim() === '') { index += 1; continue }

    if (line.startsWith('## ')) {
      const block = { type: 'h2', text: line.slice(3).trim(), id: `heading-${headingIndex++}` }
      blocks.push(block)
      headings.push({ id: block.id, level: 2, text: block.text })
      index += 1
      continue
    }
    if (line.startsWith('### ')) {
      const block = { type: 'h3', text: line.slice(4).trim(), id: `heading-${headingIndex++}` }
      blocks.push(block)
      headings.push({ id: block.id, level: 3, text: block.text })
      index += 1
      continue
    }
    if (line.startsWith('#### ')) {
      const block = { type: 'h4', text: line.slice(5).trim(), id: `heading-${headingIndex++}` }
      blocks.push(block)
      headings.push({ id: block.id, level: 4, text: block.text })
      index += 1
      continue
    }
    if (line.startsWith('> ')) {
      blocks.push({ type: 'quote', text: line.slice(2) })
      index += 1
      continue
    }
    if (line.startsWith('- ')) {
      const items = []
      while (index < lines.length && lines[index].startsWith('- ')) {
        items.push(lines[index].slice(2))
        index += 1
      }
      blocks.push({ type: 'ul', items })
      continue
    }

    blocks.push({ type: 'p', text: line })
    index += 1
  }

  return { blocks, headings }
}

function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    return <span key={index}>{part}</span>
  })
}

function renderBody(blocks) {
  return blocks.map((block, index) => {
    if (block.type === 'h2') return <h2 key={block.id} id={block.id} className="article-h2">{renderInline(block.text)}</h2>
    if (block.type === 'h3') return <h3 key={block.id} id={block.id} className="article-h3">{renderInline(block.text)}</h3>
    if (block.type === 'h4') return <h4 key={block.id} id={block.id} className="article-h4">{renderInline(block.text)}</h4>
    if (block.type === 'quote') return <blockquote key={index} className="article-quote">{renderInline(block.text)}</blockquote>
    if (block.type === 'ul') {
      return <ul key={index} className="article-ul">{block.items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}</ul>
    }
    return <p key={index} className="article-p">{renderInline(block.text)}</p>
  })
}

export default function JournalDetail() {
  const { id } = useParams()
  const { tr, lang } = useLanguage()
  const journal = journals.find((item) => String(item.id) === String(id))

  if (!journal) {
    return (
      <div className="empty-page">
        <p>{lang === 'zh' ? '没有找到这篇文章。' : 'This note could not be found.'}</p>
        <Link className="inline-link" to="/journal">← {lang === 'zh' ? '返回随记' : 'Back to notes'}</Link>
      </div>
    )
  }

  const parsed = parseBody(tr(journal.body))

  return (
    <article className="detail-page animate-block">
      <div className="detail-layout">
        <main className="detail-article">
          <Link to="/journal" className="article-back">← {lang === 'zh' ? '返回随记' : 'Back to notes'}</Link>

          <header className="article-header">
            <div className="article-meta">
              <CategoryBadge label={journal.category} />
              <time dateTime={journal.date}>{journal.date}</time>
            </div>
            <h1>{tr(journal.title)}</h1>
            <p>{tr(journal.excerpt)}</p>
          </header>

          <HaydRecommend song={journal.song} />
          <div className="article-body">{renderBody(parsed.blocks)}</div>
          <CommentSection articleId={`journal:${journal.id}`} />
        </main>

        <TableOfContents headings={parsed.headings} />
      </div>
    </article>
  )
}
