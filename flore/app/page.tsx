'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUser } from '@/lib/storage'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const user = getUser()
    if (user) {
      router.replace('/tracker')
    } else {
      router.replace('/onboarding')
    }
  }, [router])

  // Splash while redirecting
  return (
    <div className="min-h-dvh bg-brand-bg flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-black gradient-text mb-2">FLO:RE</h1>
        <p className="text-brand-dim text-sm">Women&apos;s health, evidence-first</p>
      </div>
    </div>
  )
}
