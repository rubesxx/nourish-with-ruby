'use client'

import { useState } from 'react'
import supplements from '@/data/supplements'
import type { SupplementStage } from '@/data/supplements'

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

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<SupplementStage | 'all'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = activeTab === 'all'
    ? supplements
    : supplements.filter(s => s.stage === activeTab)

  return (
    <div className="px-4 pt-10 pb-6 max-w-lg mx-auto">
      {/* Header */}
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

      {/* Cards */}
      <div className="flex flex-col gap-4">
        {filtered.map(supp => {
          const isExpanded = expanded === supp.id
          return (
            <div
              key={supp.id}
              className="rounded-2xl bg-brand-surface border border-brand-muted overflow-hidden"
            >
              <div className="p-5">
                {/* Stage tag */}
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-brand-muted text-brand-dim mb-3">
                  {STAGE_LABELS[supp.stage]}
                </span>

                {/* Name + brand */}
                <h3 className="font-bold text-brand-text text-lg leading-tight mb-0.5">{supp.name}</h3>
                <p className="text-brand-pink text-sm font-medium mb-3">{supp.brand}</p>

                {/* Key benefit */}
                <p className="text-brand-text text-sm mb-3">{supp.keyBenefit}</p>

                {/* Dose */}
                <p className="text-xs text-brand-dim mb-4">
                  <span className="font-semibold text-brand-dim">Dose: </span>{supp.dose}
                </p>

                {/* Evidence toggle */}
                <button
                  onClick={() => setExpanded(isExpanded ? null : supp.id)}
                  className="text-xs text-brand-purple font-semibold underline underline-offset-2 mb-4"
                  style={{ color: '#D8E63C' }}
                >
                  {isExpanded ? 'Hide evidence ↑' : 'Why it\'s evidence-backed ↓'}
                </button>

                {isExpanded && (
                  <div className="rounded-xl bg-brand-bg border border-brand-muted p-4 mb-4 text-xs text-brand-dim leading-relaxed animate-fade-in">
                    {supp.evidence}
                  </div>
                )}

                {/* CTA */}
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
        })}
      </div>
    </div>
  )
}
