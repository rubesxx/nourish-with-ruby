import { notFound } from 'next/navigation'
import Link from 'next/link'
import articles from '@/data/articles'
import type { ArticleTag } from '@/data/articles'

const TAG_COLORS: Record<ArticleTag, string> = {
  Cycle:         '#0F766E',
  Perimenopause: '#7C3AED',
  Menopause:     '#9333EA',
  Nutrition:     '#DB2777',
  Exercise:      '#D97706',
}

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

function renderMarkdown(content: string) {
  const lines = content.trim().split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl font-bold text-brand-text mt-8 mb-3">
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={i} className="font-bold text-brand-text mb-2">
          {line.slice(2, -2)}
        </p>
      )
    } else if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-1 mb-4 text-brand-dim text-sm">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: boldify(item) }} />
          ))}
        </ul>
      )
      continue
    } else if (line.trim() === '') {
      // skip blank
    } else {
      elements.push(
        <p
          key={i}
          className="text-brand-dim text-sm leading-relaxed mb-3"
          dangerouslySetInnerHTML={{ __html: boldify(line) }}
        />
      )
    }
    i++
  }

  return elements
}

function boldify(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong class="text-brand-text font-semibold">$1</strong>')
}

interface Props {
  params: { slug: string }
}

export default function ArticlePage({ params }: Props) {
  const article = articles.find(a => a.slug === params.slug)
  if (!article) notFound()

  return (
    <div className="px-4 pt-10 pb-10 max-w-lg mx-auto">
      {/* Back */}
      <Link href="/resources" className="flex items-center gap-2 text-brand-dim text-sm mb-6 hover:text-brand-text transition-colors">
        <span>←</span> All articles
      </Link>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {article.tags.map(tag => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
            style={{ background: `${TAG_COLORS[tag]}22`, color: TAG_COLORS[tag] }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-2xl font-black text-brand-text leading-tight mb-3">{article.title}</h1>
      <p className="text-brand-dim text-sm mb-1">{article.readTime} min read</p>
      <p className="text-brand-dim text-xs mb-6">
        Published {new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>

      {/* Intro */}
      <p className="text-brand-text text-base font-medium leading-relaxed mb-8 pb-8 border-b border-brand-muted">
        {article.intro}
      </p>

      {/* Content */}
      <div className="prose-custom">
        {renderMarkdown(article.content)}
      </div>

      {/* Citations */}
      {article.citations.length > 0 && (
        <div className="mt-10 pt-8 border-t border-brand-muted">
          <h3 className="text-xs font-bold uppercase tracking-widest text-brand-dim mb-4">References</h3>
          <div className="flex flex-col gap-3">
            {article.citations.map((c, i) => (
              <a
                key={i}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-brand-dim leading-relaxed hover:text-brand-pink transition-colors"
              >
                [{i + 1}] {c.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-10 rounded-2xl bg-brand-surface border border-brand-muted p-5 text-center">
        <p className="text-brand-dim text-sm mb-3">Want personalised advice based on this article?</p>
        <Link
          href="/chat"
          className="inline-flex px-6 py-3 rounded-xl font-bold text-white text-sm gradient-purple-pink hover:opacity-90 transition-opacity"
        >
          Ask the AI Nutritionist →
        </Link>
      </div>
    </div>
  )
}
