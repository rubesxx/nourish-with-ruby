'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getUser, getBookmarks, saveBookmarks } from '@/lib/storage'
import { detectPhase } from '@/lib/cycleEngine'
import articles from '@/data/articles'
import type { ArticleTag } from '@/data/articles'
import type { CyclePhase, LifeStage } from '@/lib/types'

const ALL_TAGS: ArticleTag[] = ['Cycle', 'Perimenopause', 'Menopause', 'Nutrition', 'Exercise']

const TAG_COLORS: Record<ArticleTag, string> = {
  Cycle:         '#0F766E',
  Perimenopause: '#7C3AED',
  Menopause:     '#9333EA',
  Nutrition:     '#D6B4FC',
  Exercise:      '#D97706',
}

const PHASE_TAG_MAP: Record<CyclePhase, ArticleTag[]> = {
  menstrual:  ['Cycle', 'Nutrition'],
  follicular: ['Cycle', 'Exercise'],
  ovulatory:  ['Cycle', 'Exercise'],
  luteal:     ['Cycle', 'Nutrition'],
}

const LIFE_STAGE_PREFERRED: Record<LifeStage, ArticleTag[]> = {
  cycling:       ['Cycle', 'Nutrition'],
  perimenopause: ['Perimenopause'],
  menopause:     ['Menopause'],
}

function getRecommended(lifeStage: LifeStage, phase: CyclePhase | null) {
  const preferred = lifeStage !== 'cycling'
    ? LIFE_STAGE_PREFERRED[lifeStage]
    : phase
      ? PHASE_TAG_MAP[phase]
      : ['Cycle', 'Nutrition'] as ArticleTag[]

  return articles
    .map(a => ({ a, score: a.tags.filter(t => preferred.includes(t as ArticleTag)).length }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(x => x.a)
}

export default function ResourcesPage() {
  const [activeTag, setActiveTag] = useState<ArticleTag | 'All' | 'Saved'>('All')
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [recommended, setRecommended] = useState<typeof articles>([])

  useEffect(() => {
    setBookmarks(getBookmarks())
    const profile = getUser()
    if (profile) {
      const phase = profile.lifeStage === 'cycling' ? (detectPhase(profile)?.phase ?? null) : null
      setRecommended(getRecommended(profile.lifeStage, phase))
    }
  }, [])

  function toggleBookmark(slug: string) {
    setBookmarks(prev => {
      const next = prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
      saveBookmarks(next)
      return next
    })
  }

  const filtered = (() => {
    if (activeTag === 'All') return articles
    if (activeTag === 'Saved') return articles.filter(a => bookmarks.includes(a.slug))
    return articles.filter(a => a.tags.includes(activeTag as ArticleTag))
  })()

  return (
    <div className="px-4 pt-10 pb-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-black text-brand-text mb-1">Resource Hub</h1>
      <p className="text-brand-dim text-sm mb-6">Evidence-based articles on cycle, nutrition, and hormonal health.</p>

      {/* Recommended for You */}
      {recommended.length > 0 && activeTag === 'All' && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-dim mb-3">Recommended for you</h2>
          <div className="flex flex-col gap-3">
            {recommended.map(article => (
              <ArticleCard
                key={article.slug}
                article={article}
                bookmarked={bookmarks.includes(article.slug)}
                onBookmark={() => toggleBookmark(article.slug)}
                compact
              />
            ))}
          </div>
          <div className="h-px bg-brand-muted my-6" />
        </div>
      )}

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
        <FilterChip
          label="Saved"
          active={activeTag === 'Saved'}
          onClick={() => setActiveTag('Saved')}
          color="#D8E63C"
          badge={bookmarks.length > 0 ? bookmarks.length : undefined}
        />
      </div>

      {/* Articles */}
      <div className="flex flex-col gap-4">
        {filtered.length === 0 ? (
          <p className="text-brand-dim text-sm text-center py-8">
            {activeTag === 'Saved'
              ? 'No saved articles yet. Tap the bookmark icon to save one.'
              : 'No articles found.'}
          </p>
        ) : (
          filtered.map(article => (
            <ArticleCard
              key={article.slug}
              article={article}
              bookmarked={bookmarks.includes(article.slug)}
              onBookmark={() => toggleBookmark(article.slug)}
            />
          ))
        )}
      </div>
    </div>
  )
}

function ArticleCard({
  article, bookmarked, onBookmark, compact,
}: {
  article: (typeof articles)[0]
  bookmarked: boolean
  onBookmark: () => void
  compact?: boolean
}) {
  return (
    <div className="relative rounded-2xl bg-brand-surface border border-brand-muted overflow-hidden">
      <button
        onClick={e => { e.preventDefault(); onBookmark() }}
        aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark article'}
        className="absolute top-4 right-4 z-10 p-1 rounded-lg"
      >
        <svg viewBox="0 0 24 24" fill={bookmarked ? '#D8E63C' : 'none'} className="w-5 h-5" stroke={bookmarked ? '#D8E63C' : '#D3DDE7'} strokeWidth={2}>
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" strokeLinejoin="round" />
        </svg>
      </button>

      <Link href={`/resources/${article.slug}`} className="block p-5 pr-12">
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
        {!compact && (
          <p className="text-brand-dim text-sm leading-relaxed mb-3">{article.intro}</p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs text-brand-dim">{article.readTime} min read</span>
          <span className="text-xs font-semibold" style={{ color: '#D6B4FC' }}>Read →</span>
        </div>
      </Link>
    </div>
  )
}

function FilterChip({ label, active, onClick, color, badge }: {
  label: string; active: boolean; onClick: () => void; color: string; badge?: number
}) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-all flex items-center gap-1.5"
      style={active
        ? { borderColor: color, background: `${color}22`, color }
        : { borderColor: '#273287', color: '#D3DDE7' }
      }
    >
      {label}
      {badge !== undefined && (
        <span
          className="text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
          style={{ background: active ? `${color}44` : '#273287', color: active ? color : '#D3DDE7' }}
        >
          {badge}
        </span>
      )}
    </button>
  )
}
