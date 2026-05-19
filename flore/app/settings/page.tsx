'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUser, saveUser } from '@/lib/storage'
import type { UserProfile, LifeStage } from '@/lib/types'

const LIFE_STAGES: { id: LifeStage; label: string; description: string }[] = [
  {
    id: 'cycling',
    label: 'Cycling',
    description: 'Regular menstrual cycles. Recommendations are phase-synced to your cycle.',
  },
  {
    id: 'perimenopause',
    label: 'Perimenopause',
    description: 'Irregular or changing cycles. Symptom-focused tracking and hormonal transition support.',
  },
  {
    id: 'menopause',
    label: 'Menopause',
    description: 'Periods have stopped for 12+ months. Focus on bone, heart, and cognitive health.',
  },
]

export default function SettingsPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const p = getUser()
    if (!p) { router.push('/onboarding'); return }
    setProfile(p)
  }, [router])

  if (!profile) return null

  function setLifeStage(stage: LifeStage) {
    if (!profile) return
    const updated = { ...profile, lifeStage: stage }
    setProfile(updated)
    saveUser(updated)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="px-4 pt-10 pb-6 max-w-lg mx-auto">
      <button
        onClick={() => router.back()}
        className="text-brand-dim text-sm mb-6 flex items-center gap-1"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
          <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </button>

      <h1 className="text-2xl font-black text-brand-text mb-1">Settings</h1>
      <p className="text-brand-dim text-sm mb-8">Adjust your profile to keep recommendations relevant.</p>

      {/* Life stage selector */}
      <div className="mb-8">
        <h2 className="text-xs font-bold uppercase tracking-widest text-brand-dim mb-4">Life stage</h2>
        <div className="flex flex-col gap-3">
          {LIFE_STAGES.map(stage => {
            const active = profile.lifeStage === stage.id
            return (
              <button
                key={stage.id}
                onClick={() => setLifeStage(stage.id)}
                className={`rounded-2xl p-4 text-left border-2 transition-all ${
                  active
                    ? 'border-brand-violet bg-brand-violet/10'
                    : 'border-brand-muted bg-brand-surface'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-brand-text">{stage.label}</span>
                  {active && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-violet/20 text-brand-violet">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-brand-dim text-sm leading-snug">{stage.description}</p>
              </button>
            )
          })}
        </div>
      </div>

      {saved && (
        <div className="rounded-xl bg-green-900/40 border border-green-700 px-4 py-3 text-green-300 text-sm font-medium mb-6">
          ✓ Settings saved
        </div>
      )}

      {/* Profile info */}
      <div className="rounded-2xl bg-brand-surface border border-brand-muted p-5 mb-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-brand-dim mb-3">Profile</h2>
        <p className="text-brand-text text-sm mb-1">
          <span className="text-brand-dim">Name: </span>{profile.name}
        </p>
        {profile.lastPeriodStart && (
          <p className="text-brand-text text-sm mb-1">
            <span className="text-brand-dim">Last period: </span>
            {new Date(profile.lastPeriodStart + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        )}
        <p className="text-brand-text text-sm">
          <span className="text-brand-dim">Cycle length: </span>{profile.cycleLength} days
        </p>
      </div>

      <button
        onClick={() => router.push('/onboarding')}
        className="w-full py-3 rounded-xl border border-brand-muted text-brand-dim text-sm font-semibold"
      >
        Re-run onboarding
      </button>
    </div>
  )
}
