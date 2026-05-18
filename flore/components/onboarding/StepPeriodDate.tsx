'use client'

import { useState } from 'react'

interface Props {
  defaultDate: string | null
  defaultLength: number
  onNext: (date: string | null, length: number) => void
  onBack: () => void
}

export default function StepPeriodDate({ defaultDate, defaultLength, onNext, onBack }: Props) {
  const [date, setDate] = useState(defaultDate ?? '')
  const [length, setLength] = useState(defaultLength)

  // Max date = today
  const maxDate = new Date().toISOString().split('T')[0]

  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-bold mb-1">Your cycle</h2>
      <p className="text-brand-dim mb-8">
        This helps us detect your current phase. You can update it any time.
      </p>

      <label className="block mb-2 text-sm font-medium text-brand-dim">
        First day of your last period
      </label>
      <input
        type="date"
        value={date}
        max={maxDate}
        onChange={e => setDate(e.target.value)}
        className="w-full bg-brand-surface border border-brand-muted rounded-xl px-4 py-3 text-brand-text focus:outline-none focus:border-brand-pink mb-8 text-base"
        style={{ colorScheme: 'dark' }}
      />

      <label className="block mb-3 text-sm font-medium text-brand-dim">
        Average cycle length: <span className="text-brand-text font-semibold">{length} days</span>
      </label>
      <input
        type="range"
        min={21}
        max={40}
        value={length}
        onChange={e => setLength(Number(e.target.value))}
        className="w-full accent-brand-pink mb-10"
      />
      <div className="flex justify-between text-xs text-brand-dim mb-10 -mt-8">
        <span>21 days</span>
        <span>40 days</span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-xl font-bold border-2 border-brand-muted text-brand-dim hover:border-brand-pink transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={() => onNext(date || null, length)}
          className="flex-[2] py-4 rounded-xl font-bold text-white text-base gradient-purple-pink hover:opacity-90 transition-opacity"
        >
          Continue →
        </button>
      </div>

      <button
        onClick={() => onNext(null, length)}
        className="w-full mt-4 text-sm text-brand-dim underline underline-offset-2"
      >
        Skip — I&apos;ll add this later
      </button>
    </div>
  )
}
