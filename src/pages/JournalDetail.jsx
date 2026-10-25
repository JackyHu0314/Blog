import { Link, useParams } from 'react-router-dom'
import { journals } from '../data/journals'
import { useLanguage } from '../context/LanguageContext'
import TableOfContents from '../components/TableOfContents'
import CommentSection from '../components/CommentSection'
import HaydRecommend from '../components/HaydRecommend'
import './JournalPhoto.css'
import './JournalDetail.css'

// `![alt](src)` on its own line; adjacent image lines form one row.
// An alt prefix picks the layout: `full:` bleeds edge to edge, `aside:` floats beside the text.
const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/
const IMAGE_LAYOUTS = ['full', 'aside']

function parseImage(line) {
  const [, rawAlt, src] = line.match(IMAGE_LINE)
  const prefix = rawAlt.match(/^(\w+):\s*/)
  const layout = prefix && IMAGE_LAYOUTS.includes(prefix[1]) ? prefix[1] : null
  return { src, alt: layout ? rawAlt.slice(prefix[0].length) : rawAlt, layout }
}

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
    if (IMAGE_LINE.test(line)) {
      const items = []
      while (index < lines.length && IMAGE_LINE.test(lines[index])) {
        items.push(parseImage(lines[index]))
        index += 1
      }
      const layout = items.length > 1 ? 'row' : items[0].layout ?? 'column'
      blocks.push({ type: 'figure', items, layout })
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
    if (block.type === 'figure') {
      const caption = block.items.map((item) => item.alt).filter(Boolean).join(' / ')
      return (
        <figure key={index} className={`article-figure article-figure--${block.layout}`} style={{ '--figure-cols': block.items.length }}>
          <div className="article-figure-images">
            {block.items.map((item) => <img key={item.src} src={item.src} alt={item.alt} loading="lazy" decoding="async" />)}
          </div>
          {caption ? <figcaption>{caption}</figcaption> : null}
        </figure>
      )
    }
    return <p key={index} className="article-p">{renderInline(block.text)}</p>
  })
}

export default function JournalDetail() {
  const { id } = useParams()
  const { tr, t, lang } = useLanguage()
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
  const category = t(`journal.categories.${journal.category}`) || journal.category
  const kicker = `${category} · ${journal.date.replaceAll('-', '.')}`
  const title = tr(journal.title)
  const excerpt = tr(journal.excerpt)
  // Skip the lede when the body already opens with the same sentence.
  const squash = (text) => text.replace(/\s+/g, '')
  const showLede = excerpt && !squash(tr(journal.body)).startsWith(squash(excerpt).slice(0, 24))

  return (
    <article className={`detail-page detail-page--cinema animate-block${journal.image ? ' has-still' : ''}`}>
      {journal.image ? (
        <figure className="cine-hero cine-hero--still">
          <img
            src={journal.image.src}
            alt={tr(journal.image.alt)}
            width={journal.image.width}
            height={journal.image.height}
            fetchPriority="high"
            decoding="async"
          />
          <figcaption className="cine-hero-caption">
            <p className="cine-kicker">{kicker}</p>
            <h1>{title}</h1>
          </figcaption>
        </figure>
      ) : null}

      <div className="detail-layout">
        <main className="detail-article">
          <Link to="/journal" className="article-back cine-kicker">← {lang === 'zh' ? '随记' : 'Journal'}</Link>

          <header className="article-header">
            {journal.image ? null : (
              <>
                <p className="cine-kicker">{kicker}</p>
                <h1>{title}</h1>
              </>
            )}
            {showLede ? <p className="article-lede">{excerpt}</p> : null}
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
