'use client'

import { useState } from 'react'
import Link from 'next/link'
import articles from '@/data/articles'
import type { ArticleTag } from '@/data/articles'

const ALL_TAGS: ArticleTag[] = ['Cycle', 'Perimenopause', 'Menopause', 'Nutrition', 'Exercise']

const TAG_COLORS: Record<ArticleTag, string> = {
  Cycle:         '#0F766E',
  Perimenopause: '#7C3AED',
  Menopause:     '#9333EA',
  Nutrition:     '#D6B4FC',
  Exercise:      '#D97706',
}

export default function ResourcesPage() {
  const [activeTag, setActiveTag] = useState<ArticleTag | 'All'>('All')

  const filtered = activeTag === 'All'
    ? articles
    : articles.filter(a => a.tags.includes(activeTag))

  return (
    <div className="px-4 pt-10 pb-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-black text-brand-text mb-1">Resource Hub</h1>
      <p className="text-brand-dim text-sm mb-6">Evidence-based articles on cycle, nutrition, and hormonal health.</p>

      {/* Tag filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        <FilterChip label="All" active={activeTag === 'All'} onClick={() => setActiveTag('All')} color="#D6B4FC" />
        {ALL_TAGS.map(tag => (
          <FilterChip
            key={tag}
            label={tag}
            active={activeTag === tag}
            onClick={() => setActiveTag(tag)}
            color={TAG_COLORS[tag]}
          />
        ))}
      </div>

      {/* Articles */}
      <div className="flex flex-col gap-4">
        {filtered.map(article => (
          <Link
            key={article.slug}
            href={`/resources/${article.slug}`}
            className="block rounded-2xl bg-brand-surface border border-brand-muted p-5 hover:border-brand-pink transition-colors"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
                  style={{ background: `${TAG_COLORS[tag]}22`, color: TAG_COLORS[tag] }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="font-bold text-brand-text text-lg leading-tight mb-2">{article.title}</h2>
            <p className="text-brand-dim text-sm leading-relaxed mb-3">{article.intro}</p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-brand-dim">{article.readTime} min read</span>
              <span className="text-xs text-brand-pink font-semibold">Read →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function FilterChip({ label, active, onClick, color }: {
  label: string; active: boolean; onClick: () => void; color: string
}) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-all"
      style={active
        ? { borderColor: color, background: `${color}22`, color }
        : { borderColor: '#273287', color: '#D3DDE7' }
      }
    >
      {label}
    </button>
  )
}
