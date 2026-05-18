'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveUser } from '@/lib/storage'
import type { LifeStage, Goal, UserProfile } from '@/lib/types'
import StepLifeStage from '@/components/onboarding/StepLifeStage'
import StepPeriodDate from '@/components/onboarding/StepPeriodDate'
import StepGoals from '@/components/onboarding/StepGoals'

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [lifeStage, setLifeStage] = useState<LifeStage>('cycling')
  const [lastPeriodStart, setLastPeriodStart] = useState<string | null>(null)
  const [cycleLength, setCycleLength] = useState(28)
  const [goals] = useState<Goal[]>([])

  function handleStepOne(n: string, ls: LifeStage) {
    setName(n)
    setLifeStage(ls)
    setStep(ls === 'menopause' ? 3 : 2)
  }

  function handleStepTwo(date: string | null, length: number) {
    setLastPeriodStart(date)
    setCycleLength(length)
    setStep(3)
  }

  function handleComplete(selectedGoals: Goal[]) {
    const profile: UserProfile = {
      name,
      lifeStage,
      lastPeriodStart,
      cycleLength,
      goals: selectedGoals,
      onboardedAt: new Date().toISOString(),
    }
    saveUser(profile)
    router.push('/tracker')
  }

  return (
    <div className="min-h-dvh bg-brand-bg flex flex-col">
      {/* Logo */}
      <div className="pt-12 pb-6 px-6 text-center">
        <h1 className="text-3xl font-black tracking-tight gradient-text">FLO:RE</h1>
        <p className="text-brand-dim text-sm mt-1">Women&apos;s health, evidence-first</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3].map(s => (
          <div
            key={s}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: s === step ? '2rem' : '0.5rem',
              background: s <= step ? '#DB2777' : '#4C1D78',
            }}
          />
        ))}
      </div>

      {/* Steps */}
      <div className="flex-1 px-6 max-w-lg mx-auto w-full animate-fade-in">
        {step === 1 && (
          <StepLifeStage
            defaultName={name}
            defaultStage={lifeStage}
            onNext={handleStepOne}
          />
        )}
        {step === 2 && (
          <StepPeriodDate
            defaultDate={lastPeriodStart}
            defaultLength={cycleLength}
            onNext={handleStepTwo}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <StepGoals
            defaultGoals={goals}
            onComplete={handleComplete}
            onBack={() => setStep(lifeStage === 'menopause' ? 1 : 2)}
          />
        )}
      </div>
    </div>
  )
}
