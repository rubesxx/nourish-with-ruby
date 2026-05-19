export type LifeStage = 'cycling' | 'perimenopause' | 'menopause'

export type CyclePhase = 'menstrual' | 'follicular' | 'ovulatory' | 'luteal'

export type FlowLevel = 'none' | 'spotting' | 'light' | 'medium' | 'heavy'

export type Goal =
  | 'energy'
  | 'mood'
  | 'hormonal_balance'
  | 'weight'
  | 'sleep'
  | 'bone_health'
  | 'libido'

export type Symptom =
  // Cycling
  | 'cramps'
  | 'mood_changes'
  | 'low_energy'
  | 'bloating'
  | 'headaches'
  | 'brain_fog'
  | 'hot_flushes'
  // Perimenopause / Menopause extras
  | 'sleep_disruption'
  | 'night_sweats'
  | 'anxiety'
  | 'memory_issues'
  | 'joint_pain'
  | 'heart_palpitations'
  | 'vaginal_dryness'

export interface UserProfile {
  name: string
  lifeStage: LifeStage
  lastPeriodStart: string | null  // ISO date YYYY-MM-DD
  cycleLength: number             // days, default 28
  goals: Goal[]
  onboardedAt: string
}

export interface DayLog {
  date: string                    // ISO date YYYY-MM-DD
  flow: FlowLevel
  symptoms: Symptom[]
  notes: string
}

export type Mood = 'calm' | 'anxious' | 'irritable' | 'energised'

export type PhysicalTag =
  | 'cramps'
  | 'bloating'
  | 'headache'
  | 'breast_tenderness'
  | 'cravings'
  | 'acne'

export interface SymptomLog {
  date: string
  moods: Mood[]
  energyLevel: number   // 1–5
  sleepQuality: number  // 1–5
  physicalSymptoms: PhysicalTag[]
  notes: string
}
