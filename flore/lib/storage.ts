import type { UserProfile, DayLog, SymptomLog } from './types'

const USER_KEY        = 'flore_user'
const LOGS_KEY        = 'flore_logs'
const SYMPTOM_KEY     = 'flore_symptom_logs'
const BOOKMARKS_KEY   = 'flore_bookmarks'
const BANNER_KEY      = 'flore_banner_dismiss'

function isBrowser() {
  return typeof window !== 'undefined'
}

export function getUser(): UserProfile | null {
  if (!isBrowser()) return null
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveUser(profile: UserProfile): void {
  if (!isBrowser()) return
  localStorage.setItem(USER_KEY, JSON.stringify(profile))
}

export function clearUser(): void {
  if (!isBrowser()) return
  localStorage.removeItem(USER_KEY)
  localStorage.removeItem(LOGS_KEY)
}

export function getLogs(): DayLog[] {
  if (!isBrowser()) return []
  try {
    const raw = localStorage.getItem(LOGS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveLog(log: DayLog): void {
  if (!isBrowser()) return
  const logs = getLogs()
  const idx = logs.findIndex(l => l.date === log.date)
  if (idx >= 0) {
    logs[idx] = log
  } else {
    logs.push(log)
  }
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs))
}

export function getLogForDate(date: string): DayLog | null {
  return getLogs().find(l => l.date === date) ?? null
}

// Symptom logs (/log page)
export function getSymptomLogs(): SymptomLog[] {
  if (!isBrowser()) return []
  try {
    const raw = localStorage.getItem(SYMPTOM_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

export function saveSymptomLog(log: SymptomLog): void {
  if (!isBrowser()) return
  const logs = getSymptomLogs()
  const idx = logs.findIndex(l => l.date === log.date)
  if (idx >= 0) logs[idx] = log
  else logs.push(log)
  localStorage.setItem(SYMPTOM_KEY, JSON.stringify(logs))
}

export function getSymptomLogForDate(date: string): SymptomLog | null {
  return getSymptomLogs().find(l => l.date === date) ?? null
}

// Bookmarks
export function getBookmarks(): string[] {
  if (!isBrowser()) return []
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

export function saveBookmarks(slugs: string[]): void {
  if (!isBrowser()) return
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(slugs))
}

// Banner dismiss (resets daily)
export function getBannerDismissDate(): string | null {
  if (!isBrowser()) return null
  return localStorage.getItem(BANNER_KEY)
}

export function setBannerDismissDate(date: string): void {
  if (!isBrowser()) return
  localStorage.setItem(BANNER_KEY, date)
}
