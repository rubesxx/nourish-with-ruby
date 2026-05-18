'use client'

import { useState } from 'react'
import type { Goal } from '@/lib/types'

interface Props {
  defaultGoals: Goal[]
  onComplete: (goals: Goal[]) => void
  onBack: () => void
}

const goalOptions: { id: Goal; label: string; emoji: string }[] = [
  { id: 'energy',           label: 'More energy',        emoji: '⚡' },
  { id: 'mood',             label: 'Mood stability',      emoji: '🧘' },
  { id: 'hormonal_balance', label: 'Hormonal balance',   emoji: '⚖️' },
  { id: 'weight',           label: 'Weight management',  emoji: '💪' },
  { id: 'sleep',            label: 'Better sleep',        emoji: '🌙' },
  { id: 'bone_health',      label: 'Bone health',         emoji: '🦴' },
  { id: 'libido',           label: 'Libido & intimacy',  emoji: '❤️' },
]

export default function StepGoals({ defaultGoals, onComplete, onBack }: Props) {
  const [selected, setSelected] = useState<Goal[]>(defaultGoals)

  function toggle(id: Goal) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    )
  }

  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-bold mb-1">What matters most to you?</h2>
      <p className="text-brand-dim mb-8">Select all that apply. We&apos;ll tailor your recommendations.</p>

      <div className="grid grid-cols-2 gap-3 mb-10">
        {goalOptions.map(g => {
          const active = selected.includes(g.id)
          return (
            <button
              key={g.id}
              onClick={() => toggle(g.id)}
              className={`px-4 py-4 rounded-xl border-2 text-left transition-all ${
                active
                  ? 'border-brand-pink bg-brand-surface'
                  : 'border-brand-muted bg-brand-surface/50'
              }`}
            >
              <div className="text-xl mb-1">{g.emoji}</div>
              <div className={`text-sm font-semibold ${active ? 'text-brand-text' : 'text-brand-dim'}`}>
                {g.label}
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-xl font-bold border-2 border-brand-muted text-brand-dim hover:border-brand-pink transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={() => onComplete(selected)}
          className="flex-[2] py-4 rounded-xl font-bold text-white text-base gradient-purple-pink hover:opacity-90 transition-opacity"
        >
          Let&apos;s go →
        </button>
      </div>
    </div>
  )
}
