'use client'

import { useState } from 'react'
import type { UserProfile, DayLog } from '@/lib/types'
import { getMonthGrid, getPhaseForDate, phaseColor, toISODate } from '@/lib/cycleEngine'

interface Props {
  profile: UserProfile
  logs: DayLog[]
  selectedDate: string
  onSelectDate: (date: string) => void
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

export default function CycleCalendar({ profile, logs, selectedDate, onSelectDate }: Props) {
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())

  const grid = getMonthGrid(year, month)
  const logMap = Object.fromEntries(logs.map(l => [l.date, l]))
  const todayStr = toISODate(now)

  function prev() {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  function next() {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  return (
    <div className="bg-brand-surface rounded-2xl p-4 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prev} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-brand-muted transition-colors text-brand-dim">
          ‹
        </button>
        <span className="font-semibold text-brand-text">
          {MONTHS[month]} {year}
        </span>
        <button onClick={next} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-brand-muted transition-colors text-brand-dim">
          ›
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[10px] font-semibold text-brand-dim py-1">{d}</div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {grid.map((date, i) => {
          const dateStr = toISODate(date)
          const isCurrentMonth = date.getMonth() === month
          const isToday = dateStr === todayStr
          const isSelected = dateStr === selectedDate
          const log = logMap[dateStr]
          const phase = profile.lifeStage === 'cycling' ? getPhaseForDate(profile, date) : null
          const hasPeriod = log?.flow && log.flow !== 'none'
          const hasSymptoms = log?.symptoms && log.symptoms.length > 0

          let dotColor = ''
          if (hasPeriod) dotColor = '#BE123C'
          else if (hasSymptoms) dotColor = '#C8956C'
          else if (phase && isCurrentMonth) dotColor = phaseColor(phase) + '44'

          return (
            <button
              key={i}
              onClick={() => onSelectDate(dateStr)}
              className={`relative aspect-square flex flex-col items-center justify-center rounded-lg transition-all text-sm font-medium ${
                !isCurrentMonth ? 'opacity-25' : ''
              } ${isSelected ? 'ring-2 ring-brand-pink' : ''} ${
                isToday ? 'bg-brand-muted' : 'hover:bg-brand-muted/50'
              }`}
              style={
                phase && isCurrentMonth && !hasPeriod
                  ? { background: `${phaseColor(phase)}22` }
                  : undefined
              }
            >
              <span
                className={
                  isToday ? 'text-brand-pink font-bold' :
                  isCurrentMonth ? 'text-brand-text' : 'text-brand-dim'
                }
              >
                {date.getDate()}
              </span>
              {dotColor && (
                <span
                  className="absolute bottom-1 w-1.5 h-1.5 rounded-full"
                  style={{ background: dotColor }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      {profile.lifeStage === 'cycling' && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-[10px] text-brand-dim">
          {[
            { color: '#BE123C', label: 'Period' },
            { color: '#0F766E', label: 'Follicular' },
            { color: '#D97706', label: 'Ovulatory' },
            { color: '#6D28D9', label: 'Luteal' },
          ].map(({ color, label }) => (
            <span key={label} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: color }} />
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
