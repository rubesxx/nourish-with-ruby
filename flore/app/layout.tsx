import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import BottomNav from '@/components/nav/BottomNav'

const dmSans = DM_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-dm-sans' })
const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap', variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'FLO:RE — Women\'s Health',
  description: 'Cycle tracking, phase nutrition, and AI-powered women\'s health guidance.',
  icons: { icon: '/favicon.ico' },
}

export const viewport: Viewport = {
  themeColor: '#0E1A0E',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="bg-brand-bg text-brand-text min-h-dvh font-sans">
        <main className="pb-safe">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  )
}
