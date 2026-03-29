import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-serif'
})

const jetbrainsMono = JetBrains_Mono({ 
  weight: ['400', '500', '700'],
  subsets: ["latin"],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: 'BTC51 - The Cost of Control',
  description: 'A hidden archive documenting how difficult it is to attack Bitcoin. Explore the cost of a 51% attack, halving cycles, and the evolution of proof of work.',
  generator: 'v0.app',
  keywords: ['bitcoin', '51% attack', 'halving', 'hashrate', 'proof of work', 'cryptocurrency', 'security'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body className={`${cormorant.variable} ${jetbrainsMono.variable} font-serif antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
