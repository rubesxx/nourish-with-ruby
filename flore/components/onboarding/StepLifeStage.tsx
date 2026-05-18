'use client'

import { useState } from 'react'
import type { LifeStage } from '@/lib/types'

interface Props {
  defaultName: string
  defaultStage: LifeStage
  onNext: (name: string, stage: LifeStage) => void
}

const stages: { id: LifeStage; label: string; sublabel: string }[] = [
  { id: 'cycling', label: 'Cycling', sublabel: 'Regular or irregular periods' },
  { id: 'perimenopause', label: 'Perimenopause', sublabel: 'Transition phase, changing cycles' },
  { id: 'menopause', label: 'Menopause', sublabel: '12+ months without a period' },
]

export default function StepLifeStage({ defaultName, defaultStage, onNext }: Props) {
  const [name, setName] = useState(defaultName)
  const [stage, setStage] = useState<LifeStage>(defaultStage)

  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-bold mb-1">Hello, who are you?</h2>
      <p className="text-brand-dim mb-8">Let&apos;s personalise your experience.</p>

      <label className="block mb-2 text-sm font-medium text-brand-dim">Your first name</label>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="e.g. Sarah"
        className="w-full bg-brand-surface border border-brand-muted rounded-xl px-4 py-3 text-brand-text placeholder:text-brand-dim focus:outline-none focus:border-brand-pink mb-8 text-base"
      />

      <label className="block mb-3 text-sm font-medium text-brand-dim">Where are you right now?</label>
      <div className="flex flex-col gap-3 mb-10">
        {stages.map(s => (
          <button
            key={s.id}
            onClick={() => setStage(s.id)}
            className={`text-left px-5 py-4 rounded-xl border-2 transition-all ${
              stage === s.id
                ? 'border-brand-pink bg-brand-surface'
                : 'border-brand-muted bg-brand-surface/50'
            }`}
          >
            <div className="font-semibold text-brand-text">{s.label}</div>
            <div className="text-sm text-brand-dim mt-0.5">{s.sublabel}</div>
          </button>
        ))}
      </div>

      <button
        onClick={() => onNext(name.trim() || 'You', stage)}
        className="w-full py-4 rounded-xl font-bold text-white text-base transition-opacity gradient-purple-pink hover:opacity-90"
      >
        Continue →
      </button>
    </div>
  )
}
