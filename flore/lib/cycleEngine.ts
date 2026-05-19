import type { CyclePhase, UserProfile } from './types'

export interface PhaseInfo {
  phase: CyclePhase
  dayOfCycle: number
  label: string
  description: string
  color: string         // tailwind bg class
  accent: string        // hex
}

const PHASE_CONFIG: Record<CyclePhase, Omit<PhaseInfo, 'phase' | 'dayOfCycle'>> = {
  menstrual: {
    label: 'Menstrual',
    description: 'Day 1–5 of your cycle. Oestrogen and progesterone are at their lowest.',
    color: 'bg-rose-800',
    accent: '#BE123C',
  },
  follicular: {
    label: 'Follicular',
    description: 'Days 6–13. Oestrogen rises as follicles develop. Energy builds.',
    color: 'bg-teal-700',
    accent: '#0F766E',
  },
  ovulatory: {
    label: 'Ovulatory',
    description: 'Days 14–16. Oestrogen peaks, LH surges. Peak energy and cognition.',
    color: 'bg-amber-600',
    accent: '#D97706',
  },
  luteal: {
    label: 'Luteal',
    description: 'Days 17 onward. Progesterone rises. Energy dips toward end of phase.',
    color: 'bg-violet-700',
    accent: '#6D28D9',
  },
}

export function detectPhase(profile: UserProfile, today = new Date()): PhaseInfo | null {
  if (!profile.lastPeriodStart) return null

  const start = parseLocalDate(profile.lastPeriodStart)
  const diffMs = today.getTime() - start.getTime()
  const dayOfCycle = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1

  // Handle multi-cycle wraparound
  const cycleDay = ((dayOfCycle - 1) % profile.cycleLength) + 1

  let phase: CyclePhase
  if (cycleDay <= 5) phase = 'menstrual'
  else if (cycleDay <= 13) phase = 'follicular'
  else if (cycleDay <= 16) phase = 'ovulatory'
  else phase = 'luteal'

  return {
    phase,
    dayOfCycle: cycleDay,
    ...PHASE_CONFIG[phase],
  }
}

export function getPhaseForDate(profile: UserProfile, date: Date): CyclePhase | null {
  if (!profile.lastPeriodStart) return null
  const start = parseLocalDate(profile.lastPeriodStart)
  const diffMs = date.getTime() - start.getTime()
  if (diffMs < 0) return null
  const dayOfCycle = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1
  const cycleDay = ((dayOfCycle - 1) % profile.cycleLength) + 1

  if (cycleDay <= 5) return 'menstrual'
  if (cycleDay <= 13) return 'follicular'
  if (cycleDay <= 16) return 'ovulatory'
  return 'luteal'
}

export function phaseColor(phase: CyclePhase | null): string {
  if (!phase) return '#4C1D78'
  return PHASE_CONFIG[phase].accent
}

// Use local date parts to avoid UTC offset shifting the day
export function toISODate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function today(): string {
  return toISODate(new Date())
}

// Parse YYYY-MM-DD as local midnight (not UTC midnight)
function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

// Returns array of dates for a month grid (including padding days)
export function getMonthGrid(year: number, month: number): Date[] {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const days: Date[] = []

  // Pad start (Monday-based week)
  const startDay = (first.getDay() + 6) % 7 // 0=Mon
  for (let i = startDay - 1; i >= 0; i--) {
    days.push(new Date(year, month, -i))
  }

  for (let d = 1; d <= last.getDate(); d++) {
    days.push(new Date(year, month, d))
  }

  // Pad end to fill grid
  while (days.length % 7 !== 0) {
    const last = days[days.length - 1]
    days.push(new Date(last.getTime() + 86400000))
  }

  return days
}
