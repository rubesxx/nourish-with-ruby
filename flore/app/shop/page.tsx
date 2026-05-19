'use client'

import { useState, useEffect } from 'react'
import { getUser } from '@/lib/storage'
import { detectPhase } from '@/lib/cycleEngine'
import supplements from '@/data/supplements'
import type { SupplementStage } from '@/data/supplements'
import type { CyclePhase } from '@/lib/types'

const TABS: { id: SupplementStage | 'all'; label: string }[] = [
  { id: 'all',           label: 'All' },
  { id: 'general',      label: 'Cycle Health' },
  { id: 'perimenopause', label: 'Perimenopause' },
  { id: 'menopause',    label: 'Menopause' },
]

const STAGE_LABELS: Record<SupplementStage, string> = {
  general:       'Cycle Health',
  perimenopause: 'Perimenopause',
  menopause:     'Menopause',
}

// Phase → supplement IDs to feature (2–3 products)
const PHASE_PICKS: Record<CyclePhase, string[]> = {
  menstrual:  ['wileys-iron', 'wildnutrition-magnesium', 'vitl-omega3'],
  follicular: ['vitl-omega3', 'cytoplan-vitd3k2'],
  ovulatory:  ['vitl-omega3', 'vitl-collagen'],
  luteal:     ['wildnutrition-magnesium', 'vitl-b6', 'wildnutrition-adaptogen'],
}

const TOP_PICKS = ['vitl-omega3', 'wildnutrition-magnesium', 'cytoplan-vitd3k2']

const PHASE_LABELS: Record<CyclePhase, string> = {
  menstrual:  'Menstrual phase',
  follicular: 'Follicular phase',
  ovulatory:  'Ovulatory phase',
  luteal:     'Luteal phase',
}

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<SupplementStage | 'all'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [featuredIds, setFeaturedIds] = useState<string[]>(TOP_PICKS)
  const [featuredLabel, setFeaturedLabel] = useState('Top Picks')

  useEffect(() => {
    const profile = getUser()
    if (!profile) return

    if (profile.lifeStage === 'perimenopause') {
      setFeaturedIds(['wildnutrition-adaptogen', 'cytoplan-evening-primrose', 'barebiology-magnesium-peri'])
      setFeaturedLabel('Perimenopause support')
    } else if (profile.lifeStage === 'menopause') {
      setFeaturedIds(['cytoplan-calcium-complex', 'wileys-omega3-menopause', 'vitl-collagen'])
      setFeaturedLabel('Menopause support')
    } else {
      const phase = detectPhase(profile)
      if (phase) {
        setFeaturedIds(PHASE_PICKS[phase.phase])
        setFeaturedLabel(`Right for your phase — ${PHASE_LABELS[phase.phase]}`)
      }
    }
  }, [])

  const featured = featuredIds.map(id => supplements.find(s => s.id === id)).filter(Boolean) as typeof supplements

  const filtered = activeTab === 'all'
    ? supplements
    : supplements.filter(s => s.stage === activeTab)

  return (
    <div className="px-4 pt-10 pb-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-black text-brand-text mb-1">Supplement Shop</h1>
      <p className="text-brand-dim text-sm mb-6">
        Curated, evidence-backed supplements from brands we trust. Affiliate links help keep FLO:RE free.
      </p>

      {/* Disclaimer */}
      <div className="rounded-xl bg-brand-surface border border-brand-muted px-4 py-3 mb-6">
        <p className="text-brand-dim text-xs leading-relaxed">
          These supplements are selected based on peer-reviewed evidence. Always consult a healthcare professional before starting a new supplement, especially if you are pregnant, breastfeeding, or taking medication.
        </p>
      </div>

      {/* Phase-synced featured section */}
      {featured.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#D8E63C' }}>
            {featuredLabel}
          </h2>
          <p className="text-brand-dim text-xs mb-4">Matched to your cycle phase from your tracker data.</p>
          <div className="flex flex-col gap-3">
            {featured.map(supp => (
              <SupplementCard
                key={supp.id}
                supp={supp}
                expanded={expanded === supp.id}
                onToggle={() => setExpanded(expanded === supp.id ? null : supp.id)}
                compact
              />
            ))}
          </div>
          <div className="h-px bg-brand-muted mt-6 mb-8" />
        </div>
      )}

      {/* Tab filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-hide">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
              activeTab === tab.id
                ? 'border-brand-pink bg-brand-pink/10 text-brand-text'
                : 'border-brand-muted text-brand-dim'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Full cards */}
      <div className="flex flex-col gap-4">
        {filtered.map(supp => (
          <SupplementCard
            key={supp.id}
            supp={supp}
            expanded={expanded === supp.id}
            onToggle={() => setExpanded(expanded === supp.id ? null : supp.id)}
          />
        ))}
      </div>
    </div>
  )
}

function SupplementCard({
  supp, expanded, onToggle, compact,
}: {
  supp: (typeof supplements)[0]
  expanded: boolean
  onToggle: () => void
  compact?: boolean
}) {
  return (
    <div className="rounded-2xl bg-brand-surface border border-brand-muted overflow-hidden">
      <div className="p-5">
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-brand-muted text-brand-dim mb-3">
          {STAGE_LABELS[supp.stage]}
        </span>

        <h3 className="font-bold text-brand-text text-lg leading-tight mb-0.5">{supp.name}</h3>
        <p className="text-brand-pink text-sm font-medium mb-3">{supp.brand}</p>
        <p className="text-brand-text text-sm mb-3">{supp.keyBenefit}</p>

        {!compact && (
          <p className="text-xs text-brand-dim mb-4">
            <span className="font-semibold text-brand-dim">Dose: </span>{supp.dose}
          </p>
        )}

        <button
          onClick={onToggle}
          className="text-xs font-semibold underline underline-offset-2 mb-4"
          style={{ color: '#D8E63C' }}
        >
          {expanded ? 'Hide evidence ↑' : 'Why it\'s evidence-backed ↓'}
        </button>

        {expanded && (
          <div className="rounded-xl bg-brand-bg border border-brand-muted p-4 mb-4 text-xs text-brand-dim leading-relaxed animate-fade-in">
            {supp.evidence}
          </div>
        )}

        <a
          href={supp.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white text-sm gradient-purple-pink hover:opacity-90 transition-opacity"
        >
          Buy on {supp.brand}
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="white" strokeWidth={2.5}>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" />
            <polyline points="15,3 21,3 21,9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </div>
  )
}
