'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUser } from '@/lib/storage'
import { detectPhase } from '@/lib/cycleEngine'
import type { UserProfile } from '@/lib/types'
import recommendations from '@/data/phaseRecommendations'

export default function RecommendationsPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    const p = getUser()
    if (!p) { router.push('/onboarding'); return }
    setProfile(p)
  }, [router])

  if (!profile) return null

  let phaseKey = 'follicular'
  if (profile.lifeStage === 'perimenopause') phaseKey = 'perimenopause'
  else if (profile.lifeStage === 'menopause') phaseKey = 'menopause'
  else {
    const phaseInfo = detectPhase(profile)
    if (phaseInfo) phaseKey = phaseInfo.phase
  }

  const data = recommendations[phaseKey]

  return (
    <div className="px-4 pt-10 pb-6 max-w-lg mx-auto">
      {/* Header */}
      <p className="text-brand-dim text-sm mb-1">Personalised for you</p>
      <h1 className="text-2xl font-black text-brand-text mb-1">{data.label}</h1>
      <p className="text-brand-dim text-sm mb-6">{data.tagline}</p>

      {/* Phase indicator for cycling users */}
      {profile.lifeStage === 'cycling' && (
        <div
          className="rounded-xl px-4 py-3 mb-6 text-sm font-medium"
          style={{ background: `${data.accent}22`, color: data.accent }}
        >
          Recommendations update automatically as your phase changes.
        </div>
      )}

      {/* Meals */}
      <Section title="Meals to try" accent={data.accent}>
        {data.meals.map((m, i) => (
          <Card key={i} accent={data.accent}>
            <p className="font-semibold text-brand-text mb-1">{m.name}</p>
            <p className="text-brand-dim text-sm leading-relaxed">{m.why}</p>
          </Card>
        ))}
      </Section>

      {/* Exercise */}
      <Section title="Move this phase" accent={data.accent}>
        {data.exercises.map((e, i) => (
          <Card key={i} accent={data.accent}>
            <p className="font-semibold text-brand-text mb-1">{e.name}</p>
            <p className="text-brand-dim text-sm leading-relaxed">{e.why}</p>
          </Card>
        ))}
      </Section>

      {/* Foods to prioritise */}
      <Section title="Prioritise" accent={data.accent}>
        {data.priorityFoods.map((f, i) => (
          <div key={i} className="flex gap-3 py-3 border-b border-brand-muted last:border-0">
            <div
              className="w-2 rounded-full flex-shrink-0 mt-1"
              style={{ background: data.accent, minHeight: '1rem' }}
            />
            <div>
              <p className="font-semibold text-brand-text text-sm">{f.food}</p>
              <p className="text-brand-dim text-xs mt-0.5 leading-relaxed">{f.reason}</p>
            </div>
          </div>
        ))}
      </Section>

      {/* Foods to reduce */}
      <Section title="Reduce" accent="#BE123C">
        {data.reduceFoods.map((f, i) => (
          <div key={i} className="flex gap-3 py-3 border-b border-brand-muted last:border-0">
            <div
              className="w-2 rounded-full flex-shrink-0 mt-1"
              style={{ background: '#BE123C', minHeight: '1rem' }}
            />
            <div>
              <p className="font-semibold text-brand-text text-sm">{f.food}</p>
              <p className="text-brand-dim text-xs mt-0.5 leading-relaxed">{f.reason}</p>
            </div>
          </div>
        ))}
      </Section>

      {/* CTA */}
      <div className="mt-8 rounded-2xl bg-brand-surface border border-brand-muted p-5 text-center">
        <p className="text-brand-dim text-sm mb-3">Want personalised advice? Ask our AI nutritionist.</p>
        <button
          onClick={() => router.push('/chat')}
          className="px-6 py-3 rounded-xl font-bold text-white text-sm gradient-purple-pink hover:opacity-90 transition-opacity"
        >
          Open AI Nutritionist →
        </button>
      </div>
    </div>
  )
}

function Section({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2
        className="text-xs font-bold uppercase tracking-widest mb-4"
        style={{ color: accent }}
      >
        {title}
      </h2>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  )
}

function Card({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-4 border"
      style={{ borderColor: `${accent}44`, background: `${accent}11` }}
    >
      {children}
    </div>
  )
}
