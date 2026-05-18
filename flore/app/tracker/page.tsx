'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getUser, getLogs } from '@/lib/storage'
import { detectPhase, today } from '@/lib/cycleEngine'
import type { UserProfile, DayLog } from '@/lib/types'
import PhaseChip from '@/components/tracker/PhaseChip'
import CycleCalendar from '@/components/tracker/CycleCalendar'
import LogForm from '@/components/tracker/LogForm'

export default function TrackerPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [logs, setLogs] = useState<DayLog[]>([])
  const [selectedDate, setSelectedDate] = useState(today())

  const refresh = useCallback(() => {
    setLogs(getLogs())
  }, [])

  useEffect(() => {
    const p = getUser()
    if (!p) { router.push('/onboarding'); return }
    setProfile(p)
    setLogs(getLogs())
  }, [router])

  if (!profile) return null

  const phaseInfo = profile.lifeStage === 'cycling' ? detectPhase(profile) : null

  return (
    <div className="px-4 pt-10 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-brand-dim text-sm">Hey, {profile.name}</p>
          <h1 className="text-2xl font-black text-brand-text">Cycle Tracker</h1>
        </div>
        <button
          onClick={() => router.push('/onboarding')}
          className="text-xs text-brand-dim border border-brand-muted rounded-lg px-3 py-1.5"
        >
          Settings
        </button>
      </div>

      {/* Phase chip */}
      <PhaseChip phaseInfo={phaseInfo} lifeStage={profile.lifeStage} />

      {/* Calendar — not shown for menopause */}
      {profile.lifeStage !== 'menopause' && (
        <CycleCalendar
          profile={profile}
          logs={logs}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      )}

      {/* Log form */}
      <LogForm
        date={selectedDate}
        lifeStage={profile.lifeStage}
        onSaved={refresh}
      />
    </div>
  )
}
