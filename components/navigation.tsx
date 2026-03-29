'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useBitcoinData } from '@/hooks/use-bitcoin-data'

interface NavSection {
  title: string
  items: { href: string; label: string }[]
}

const navSections: NavSection[] = [
  {
    title: 'Data',
    items: [
      { href: '/attack', label: '51% Attack' },
      { href: '/halving', label: 'Halving' },
      { href: '/hashrate', label: 'Hashrate' },
      { href: '/pools', label: 'Mining Pools' },
      { href: '/nodes', label: 'Nodes' },
    ],
  },
  {
    title: 'Learn',
    items: [
      { href: '/what-is-bitcoin', label: 'What is Bitcoin' },
      { href: '/mining', label: 'How Mining Works' },
      { href: '/myths', label: 'Common Myths' },
      { href: '/glossary', label: 'Glossary' },
      { href: '/timeline', label: 'Timeline' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { href: '/hardware', label: 'Hardware' },
      { href: '/vs-gold', label: 'vs Gold' },
      { href: '/tools', label: 'Tools' },
      { href: '/learn', label: 'Books & Media' },
      { href: '/developers', label: 'Developers' },
      { href: '/about', label: 'About' },
    ],
  },
]

const quickLinks = [
  { href: '/attack', label: '51% Attack' },
  { href: '/halving', label: 'Halving' },
  { href: '/pools', label: 'Pools' },
  { href: '/tools', label: 'Tools' },
]

const XIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
  </svg>
)

const GitHubIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

export function Navigation() {
  const pathname = usePathname()
  const { data } = useBitcoinData()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const formatPrice = (price: number) =>
    price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-6 backdrop-blur-sm bg-btc-black/80">
        <div className="flex items-center justify-between max-w-7xl mx-auto">

          {/* Logo + BTC Price */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link
              href="/"
              className="font-mono text-xs tracking-[0.3em] text-btc-dim hover:text-btc-green transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              BTC51
            </Link>

            {data && (
              <div className="flex items-center gap-2 md:gap-3 pl-4 md:pl-6 border-l border-btc-gray/30">
                <span className="font-mono text-xs md:text-sm text-btc-amber">
                  ${formatPrice(data.price)}
                </span>
                <span className={`font-mono text-[10px] md:text-xs ${data.priceChange24h >= 0 ? 'text-btc-green' : 'text-red-500'}`}>
                  {data.priceChange24h >= 0 ? '+' : ''}{data.priceChange24h.toFixed(2)}%
                </span>
              </div>
            )}
          </div>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center gap-6">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  nav-link font-mono text-xs tracking-[0.15em] uppercase transition-colors duration-300
                  ${pathname === item.href ? 'text-btc-green text-glow-green' : 'text-btc-dim hover:text-btc-white'}
                `}
              >
                {item.label}
              </Link>
            ))}

            <div className="w-px h-4 bg-btc-gray/40" />

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="font-mono text-xs tracking-[0.15em] uppercase text-btc-dim hover:text-btc-amber transition-colors flex items-center gap-2"
            >
              <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
              <span className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-45' : ''}`}>+</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-btc-green transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-btc-green transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-btc-green transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Full-screen Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-40 bg-btc-black
          transition-all duration-500 ease-out
          ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        <div className="flex flex-col h-full pt-20 md:pt-24 pb-8 px-5 md:px-12 overflow-y-auto">
          <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">

            {/* Nav Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 flex-1">
              {navSections.map((section, sectionIndex) => (
                <div
                  key={section.title}
                  className={`transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: isMenuOpen ? `${sectionIndex * 80}ms` : '0ms' }}
                >
                  <h3 className="font-mono text-[10px] text-btc-dim uppercase tracking-[0.3em] mb-3 md:mb-4 pb-2 border-b border-btc-gray/20">
                    {section.title}
                  </h3>
                  <div className="space-y-1.5 md:space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`
                          block font-serif text-lg md:text-xl py-1 transition-all duration-200
                          ${pathname === item.href ? 'text-btc-green' : 'text-btc-white/80 hover:text-btc-amber md:hover:translate-x-1'}
                        `}
                        style={{ transitionDelay: isMenuOpen ? `${sectionIndex * 60 + itemIndex * 30}ms` : '0ms' }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom bar: Whitepaper + Social + Stats */}
            <div
              className={`
                mt-8 pt-6 border-t border-btc-gray/20
                transition-all duration-500
                ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
              style={{ transitionDelay: isMenuOpen ? '300ms' : '0ms' }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                {/* Links */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://bitcoin.org/bitcoin.pdf"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-btc-amber text-btc-amber hover:bg-btc-amber/10 font-mono text-[10px] uppercase tracking-wider transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Whitepaper
                  </a>
                  <a
                    href="https://x.com/BTC51org"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-btc-gray/40 text-btc-dim hover:text-btc-white hover:border-btc-white/40 font-mono text-[10px] uppercase tracking-wider transition-colors"
                  >
                    <XIcon />
                    @BTC51org
                  </a>
                  <a
                    href="https://github.com/BTC51org"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-btc-gray/40 text-btc-dim hover:text-btc-white hover:border-btc-white/40 font-mono text-[10px] uppercase tracking-wider transition-colors"
                  >
                    <GitHubIcon />
                    GitHub
                  </a>
                </div>

                {/* Live Stats */}
                {data && (
                  <div className="flex items-center gap-6 md:gap-8">
                    <div className="text-center">
                      <p className="font-mono text-[9px] text-btc-dim uppercase tracking-wider mb-0.5">Hashrate</p>
                      <p className="font-mono text-xs text-btc-green">{data.hashrate.toFixed(0)} EH/s</p>
                    </div>
                    <div className="text-center">
                      <p className="font-mono text-[9px] text-btc-dim uppercase tracking-wider mb-0.5">Block</p>
                      <p className="font-mono text-xs text-btc-amber">{data.blockHeight.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-mono text-[9px] text-btc-dim uppercase tracking-wider mb-0.5">Price</p>
                      <p className="font-mono text-xs text-btc-white">${formatPrice(data.price)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
