'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getUser, getSymptomLogs, saveSymptomLog, getSymptomLogForDate } from '@/lib/storage'
import { today } from '@/lib/cycleEngine'
import type { Mood, PhysicalTag, SymptomLog } from '@/lib/types'

const MOODS: { id: Mood; label: string; emoji: string }[] = [
  { id: 'calm',      label: 'Calm',      emoji: '😌' },
  { id: 'anxious',   label: 'Anxious',   emoji: '😟' },
  { id: 'irritable', label: 'Irritable', emoji: '😤' },
  { id: 'energised', label: 'Energised', emoji: '⚡' },
]

const PHYSICAL: { id: PhysicalTag; label: string }[] = [
  { id: 'cramps',            label: 'Cramps' },
  { id: 'bloating',          label: 'Bloating' },
  { id: 'headache',          label: 'Headache' },
  { id: 'breast_tenderness', label: 'Breast tenderness' },
  { id: 'cravings',          label: 'Cravings' },
  { id: 'acne',              label: 'Acne' },
]

function emptyLog(date: string): SymptomLog {
  return { date, moods: [], energyLevel: 3, sleepQuality: 3, physicalSymptoms: [], notes: '' }
}

export default function LogPage() {
  const router = useRouter()
  const [authed, setAuthed] = useState(false)
  const [log, setLog] = useState<SymptomLog>(emptyLog(today()))
  const [saved, setSaved] = useState(false)
  const [history, setHistory] = useState<SymptomLog[]>([])

  const refreshHistory = useCallback(() => {
    const all = getSymptomLogs()
    const last7 = all
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 7)
    setHistory(last7)
  }, [])

  useEffect(() => {
    const p = getUser()
    if (!p) { router.push('/onboarding'); return }
    setAuthed(true)
    const existing = getSymptomLogForDate(today())
    setLog(existing ?? emptyLog(today()))
    refreshHistory()
  }, [router, refreshHistory])

  if (!authed) return null

  function toggleMood(m: Mood) {
    setLog(prev => ({
      ...prev,
      moods: prev.moods.includes(m)
        ? prev.moods.filter(x => x !== m)
        : [...prev.moods, m],
    }))
    setSaved(false)
  }

  function togglePhysical(p: PhysicalTag) {
    setLog(prev => ({
      ...prev,
      physicalSymptoms: prev.physicalSymptoms.includes(p)
        ? prev.physicalSymptoms.filter(x => x !== p)
        : [...prev.physicalSymptoms, p],
    }))
    setSaved(false)
  }

  function handleSave() {
    saveSymptomLog(log)
    setSaved(true)
    refreshHistory()
  }

  return (
    <div className="px-4 pt-10 pb-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-black text-brand-text mb-1">Daily Log</h1>
      <p className="text-brand-dim text-sm mb-6">
        {new Date(today() + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
      </p>

      {/* Mood */}
      <Section label="Mood">
        <div className="flex gap-2">
          {MOODS.map(m => (
            <button
              key={m.id}
              onClick={() => toggleMood(m.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-all text-xs font-semibold ${
                log.moods.includes(m.id)
                  ? 'border-brand-violet bg-brand-violet/15 text-brand-text'
                  : 'border-brand-muted text-brand-dim'
              }`}
            >
              <span className="text-xl">{m.emoji}</span>
              {m.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Energy */}
      <Section label="Energy level">
        <ScaleInput
          value={log.energyLevel}
          onChange={v => { setLog(p => ({ ...p, energyLevel: v })); setSaved(false) }}
          low="Low" high="High"
        />
      </Section>

      {/* Sleep */}
      <Section label="Sleep quality">
        <ScaleInput
          value={log.sleepQuality}
          onChange={v => { setLog(p => ({ ...p, sleepQuality: v })); setSaved(false) }}
          low="Poor" high="Great"
        />
      </Section>

      {/* Physical */}
      <Section label="Physical symptoms">
        <div className="flex flex-wrap gap-2">
          {PHYSICAL.map(p => (
            <button
              key={p.id}
              onClick={() => togglePhysical(p.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                log.physicalSymptoms.includes(p.id)
                  ? 'border-brand-violet bg-brand-violet/20 text-brand-text'
                  : 'border-brand-muted text-brand-dim'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Notes */}
      <Section label="Notes">
        <textarea
          value={log.notes}
          onChange={e => { setLog(p => ({ ...p, notes: e.target.value })); setSaved(false) }}
          placeholder="Anything else worth noting..."
          rows={3}
          className="w-full bg-brand-bg border border-brand-muted rounded-xl px-4 py-3 text-brand-text placeholder:text-brand-dim focus:outline-none focus:border-brand-violet text-sm resize-none"
        />
      </Section>

      <button
        onClick={handleSave}
        className={`w-full py-3.5 rounded-xl font-bold text-white transition-all mb-8 ${
          saved ? 'bg-green-700' : 'gradient-purple-pink hover:opacity-90'
        }`}
      >
        {saved ? '✓ Saved' : 'Save log'}
      </button>

      {/* 7-day history */}
      {history.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-dim mb-4">Recent entries</h2>
          <div className="flex flex-col gap-3">
            {history.map(entry => (
              <HistoryCard key={entry.date} entry={entry} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold text-brand-dim uppercase tracking-widest mb-3">{label}</p>
      {children}
    </div>
  )
}

function ScaleInput({ value, onChange, low, high }: {
  value: number; onChange: (v: number) => void; low: string; high: string
}) {
  return (
    <div>
      <div className="flex gap-2 mb-1">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`flex-1 h-10 rounded-lg text-sm font-bold border-2 transition-all ${
              value === n
                ? 'border-brand-yellow bg-brand-yellow/20 text-brand-yellow'
                : 'border-brand-muted text-brand-dim'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-brand-dim px-0.5">
        <span>{low}</span>
        <span>{high}</span>
      </div>
    </div>
  )
}

function HistoryCard({ entry }: { entry: SymptomLog }) {
  const dateLabel = new Date(entry.date + 'T12:00:00').toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short'
  })

  return (
    <div className="rounded-xl bg-brand-surface border border-brand-muted p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-brand-dim">{dateLabel}</span>
        <div className="flex gap-1">
          {entry.moods.map(m => (
            <span key={m} className="text-xs">{MOODS.find(x => x.id === m)?.emoji}</span>
          ))}
        </div>
      </div>
      <div className="flex gap-4 text-xs text-brand-dim">
        <span>⚡ Energy {entry.energyLevel}/5</span>
        <span>💤 Sleep {entry.sleepQuality}/5</span>
        {entry.physicalSymptoms.length > 0 && (
          <span>{entry.physicalSymptoms.length} symptom{entry.physicalSymptoms.length > 1 ? 's' : ''}</span>
        )}
      </div>
      {entry.notes && (
        <p className="text-xs text-brand-dim mt-2 line-clamp-2">{entry.notes}</p>
      )}
    </div>
  )
}
