'use client'

import { useState, useEffect } from 'react'
import type { FlowLevel, LifeStage, Symptom } from '@/lib/types'
import { saveLog, getLogForDate } from '@/lib/storage'

interface Props {
  date: string
  lifeStage: LifeStage
  onSaved: () => void
}

const CYCLING_SYMPTOMS: { id: Symptom; label: string }[] = [
  { id: 'cramps',        label: 'Cramps' },
  { id: 'mood_changes',  label: 'Mood changes' },
  { id: 'low_energy',    label: 'Low energy' },
  { id: 'bloating',      label: 'Bloating' },
  { id: 'headaches',     label: 'Headaches' },
  { id: 'brain_fog',     label: 'Brain fog' },
  { id: 'hot_flushes',   label: 'Hot flushes' },
]

const PERI_EXTRA_SYMPTOMS: { id: Symptom; label: string }[] = [
  { id: 'sleep_disruption',   label: 'Sleep disruption' },
  { id: 'night_sweats',       label: 'Night sweats' },
  { id: 'anxiety',            label: 'Anxiety' },
  { id: 'memory_issues',      label: 'Memory/brain fog' },
  { id: 'joint_pain',         label: 'Joint pain' },
  { id: 'heart_palpitations', label: 'Heart palpitations' },
  { id: 'vaginal_dryness',    label: 'Vaginal dryness' },
]

const FLOW_LEVELS: { id: FlowLevel; label: string; color: string }[] = [
  { id: 'none',     label: 'None',     color: '#2A3D2A' },
  { id: 'spotting', label: 'Spotting', color: '#9F1239' },
  { id: 'light',    label: 'Light',    color: '#BE123C' },
  { id: 'medium',   label: 'Medium',   color: '#E11D48' },
  { id: 'heavy',    label: 'Heavy',    color: '#FB7185' },
]

export default function LogForm({ date, lifeStage, onSaved }: Props) {
  const [flow, setFlow] = useState<FlowLevel>('none')
  const [symptoms, setSymptoms] = useState<Symptom[]>([])
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const existing = getLogForDate(date)
    if (existing) {
      setFlow(existing.flow)
      setSymptoms(existing.symptoms)
      setNotes(existing.notes)
    } else {
      setFlow('none')
      setSymptoms([])
      setNotes('')
    }
    setSaved(false)
  }, [date])

  function toggleSymptom(s: Symptom) {
    setSymptoms(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  function handleSave() {
    saveLog({ date, flow, symptoms, notes })
    setSaved(true)
    onSaved()
  }

  const symptomList = lifeStage === 'cycling'
    ? CYCLING_SYMPTOMS
    : [...CYCLING_SYMPTOMS, ...PERI_EXTRA_SYMPTOMS]

  const showFlow = lifeStage !== 'menopause'

  const formattedDate = new Date(date + 'T12:00:00').toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long'
  })

  return (
    <div className="bg-brand-surface rounded-2xl p-5">
      <h3 className="font-bold text-brand-text mb-1">{formattedDate}</h3>
      <p className="text-brand-dim text-sm mb-5">Log how you feel today</p>

      {/* Flow level */}
      {showFlow && (
        <div className="mb-6">
          <p className="text-xs font-semibold text-brand-dim uppercase tracking-widest mb-3">Flow</p>
          <div className="flex gap-2">
            {FLOW_LEVELS.map(f => (
              <button
                key={f.id}
                onClick={() => setFlow(f.id)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all border-2 ${
                  flow === f.id ? 'border-brand-pink text-white' : 'border-brand-muted text-brand-dim'
                }`}
                style={flow === f.id ? { background: f.color } : {}}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Symptoms */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-brand-dim uppercase tracking-widest mb-3">Symptoms</p>
        <div className="flex flex-wrap gap-2">
          {symptomList.map(s => (
            <button
              key={s.id}
              onClick={() => toggleSymptom(s.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                symptoms.includes(s.id)
                  ? 'border-brand-pink bg-brand-pink/20 text-brand-text'
                  : 'border-brand-muted text-brand-dim'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-brand-dim uppercase tracking-widest mb-3">Notes</p>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Anything else worth noting..."
          rows={3}
          className="w-full bg-brand-bg border border-brand-muted rounded-xl px-4 py-3 text-brand-text placeholder:text-brand-dim focus:outline-none focus:border-brand-pink text-sm resize-none"
        />
      </div>

      <button
        onClick={handleSave}
        className={`w-full py-3.5 rounded-xl font-bold text-white transition-all ${
          saved ? 'bg-green-700' : 'gradient-purple-pink hover:opacity-90'
        }`}
      >
        {saved ? '✓ Saved' : 'Save log'}
      </button>
    </div>
  )
}
