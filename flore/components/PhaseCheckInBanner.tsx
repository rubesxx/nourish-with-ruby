'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getUser, getBannerDismissDate, setBannerDismissDate } from '@/lib/storage'
import { detectPhase, today } from '@/lib/cycleEngine'

interface TipConfig {
  tip: string
  href: string
  label: string
  accent: string
}

const PHASE_TIPS: Record<string, TipConfig> = {
  menstrual: {
    tip: 'Prioritise iron-rich foods and rest.',
    href: '/resources/eating-for-your-menstrual-phase',
    label: 'Menstrual phase tip',
    accent: '#BE123C',
  },
  follicular: {
    tip: 'Great time to try new workouts and take on challenges.',
    href: '/resources/follicular-phase-oestrogen-window',
    label: 'Follicular phase tip',
    accent: '#0F766E',
  },
  ovulatory: {
    tip: 'Peak performance window — energy and focus are at their monthly high.',
    href: '/resources/ovulation-and-peak-performance',
    label: 'Ovulation phase tip',
    accent: '#D97706',
  },
  luteal: {
    tip: 'Magnesium and complex carbs can ease PMS symptoms.',
    href: '/resources/luteal-phase-nutrition-to-beat-pms',
    label: 'Luteal phase tip',
    accent: '#6D28D9',
  },
  perimenopause: {
    tip: 'Adaptogens and magnesium can help smooth hormonal fluctuations.',
    href: '/resources/perimenopause-nutrition',
    label: 'Perimenopause tip',
    accent: '#7C3AED',
  },
  menopause: {
    tip: 'Prioritise calcium, vitamin D, and weight-bearing exercise for bone health.',
    href: '/resources/menopause-bone-health',
    label: 'Menopause tip',
    accent: '#9333EA',
  },
}

export default function PhaseCheckInBanner() {
  const [config, setConfig] = useState<TipConfig | null>(null)
  const [dismissed, setDismissed] = useState(true) // hidden until we check

  useEffect(() => {
    const dismissDate = getBannerDismissDate()
    if (dismissDate === today()) { setDismissed(true); return }

    const profile = getUser()
    if (!profile) return

    let key: string
    if (profile.lifeStage === 'perimenopause') key = 'perimenopause'
    else if (profile.lifeStage === 'menopause') key = 'menopause'
    else {
      const phase = detectPhase(profile)
      key = phase?.phase ?? 'follicular'
    }

    setConfig(PHASE_TIPS[key])
    setDismissed(false)
  }, [])

  function dismiss() {
    setBannerDismissDate(today())
    setDismissed(true)
  }

  if (dismissed || !config) return null

  return (
    <div
      className="rounded-2xl px-4 py-3 mb-5 flex items-start gap-3 border"
      style={{ background: `${config.accent}18`, borderColor: `${config.accent}44` }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: config.accent }}>
          {config.label}
        </p>
        <p className="text-brand-text text-sm leading-snug">{config.tip}</p>
        <Link
          href={config.href}
          className="text-xs font-semibold mt-1 inline-block underline underline-offset-2"
          style={{ color: config.accent }}
        >
          Learn more →
        </Link>
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="text-brand-dim hover:text-brand-text transition-colors flex-shrink-0 mt-0.5"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
          <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}
