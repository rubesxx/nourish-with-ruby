'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  {
    href: '/tracker',
    label: 'Cycle',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke={active ? '#C8956C' : '#7A9E7A'} strokeWidth={2}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/recommendations',
    label: 'Phase',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke={active ? '#C8956C' : '#7A9E7A'} strokeWidth={2}>
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/chat',
    label: 'AI',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke={active ? '#C8956C' : '#7A9E7A'} strokeWidth={2}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/shop',
    label: 'Shop',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke={active ? '#C8956C' : '#7A9E7A'} strokeWidth={2}>
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinejoin="round" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    href: '/resources',
    label: 'Learn',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke={active ? '#C8956C' : '#7A9E7A'} strokeWidth={2}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function BottomNav() {
  const pathname = usePathname()

  if (pathname === '/' || pathname.startsWith('/onboarding')) return null

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-muted"
      style={{
        background: '#0E1A0E',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-stretch h-16 max-w-lg mx-auto">
        {nav.map(({ href, label, icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center flex-1 gap-0.5 transition-opacity"
            >
              {icon(active)}
              <span
                className="text-[10px] font-medium"
                style={{ color: active ? '#C8956C' : '#7A9E7A' }}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
