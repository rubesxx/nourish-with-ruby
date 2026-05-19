'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  {
    href: '/tracker',
    label: 'Cycle',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke={active ? '#D6B4FC' : '#D3DDE7'} strokeWidth={2}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/log',
    label: 'Log',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke={active ? '#D6B4FC' : '#D3DDE7'} strokeWidth={2}>
        <path d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 3a2.121 2.121 0 0 1 3 3L12 14l-4 1 1-4 7-8z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/recommendations',
    label: 'Phase',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke={active ? '#D6B4FC' : '#D3DDE7'} strokeWidth={2}>
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/shop',
    label: 'Shop',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke={active ? '#D6B4FC' : '#D3DDE7'} strokeWidth={2}>
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
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke={active ? '#D6B4FC' : '#D3DDE7'} strokeWidth={2}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke={active ? '#D6B4FC' : '#D3DDE7'} strokeWidth={2}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" strokeLinejoin="round" />
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
        background: '#17184B',
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
                className="text-[9px] font-medium"
                style={{ color: active ? '#D6B4FC' : '#D3DDE7' }}
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
