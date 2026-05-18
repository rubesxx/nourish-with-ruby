import type { PhaseInfo } from '@/lib/cycleEngine'

interface Props {
  phaseInfo: PhaseInfo | null
  lifeStage: string
}

export default function PhaseChip({ phaseInfo, lifeStage }: Props) {
  if (lifeStage === 'menopause') {
    return (
      <div className="rounded-2xl bg-brand-surface border border-brand-muted p-5 mb-6">
        <p className="text-xs font-semibold text-brand-dim uppercase tracking-widest mb-1">Your stage</p>
        <h2 className="text-2xl font-black text-brand-text">Menopause</h2>
        <p className="text-brand-dim text-sm mt-1">Log symptoms below to track patterns over time.</p>
      </div>
    )
  }

  if (lifeStage === 'perimenopause') {
    return (
      <div className="rounded-2xl bg-brand-surface border border-brand-muted p-5 mb-6">
        <p className="text-xs font-semibold text-brand-dim uppercase tracking-widest mb-1">Your stage</p>
        <h2 className="text-2xl font-black text-brand-text">Perimenopause</h2>
        <p className="text-brand-dim text-sm mt-1">Cycles may be irregular. Track symptoms to identify patterns.</p>
      </div>
    )
  }

  if (!phaseInfo) {
    return (
      <div className="rounded-2xl bg-brand-surface border border-brand-muted p-5 mb-6">
        <p className="text-brand-dim text-sm">Add your last period date to detect your current phase.</p>
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl p-5 mb-6"
      style={{ background: `${phaseInfo.accent}22`, borderColor: phaseInfo.accent, borderWidth: 1 }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: phaseInfo.accent }}>
        Day {phaseInfo.dayOfCycle} · {phaseInfo.label} Phase
      </p>
      <h2 className="text-2xl font-black text-brand-text">{phaseInfo.label}</h2>
      <p className="text-brand-dim text-sm mt-1">{phaseInfo.description}</p>
    </div>
  )
}
