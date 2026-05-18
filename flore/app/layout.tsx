import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import BottomNav from '@/components/nav/BottomNav'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'FLO:RE — Women\'s Health',
  description: 'Cycle tracking, phase nutrition, and AI-powered women\'s health guidance.',
  icons: { icon: '/favicon.ico' },
}

export const viewport: Viewport = {
  themeColor: '#1F1235',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-brand-bg text-brand-text min-h-dvh">
        <main className="pb-safe">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  )
}
