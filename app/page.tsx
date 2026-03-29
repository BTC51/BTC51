'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ParticleBackground } from '@/components/particle-background'
import { Navigation } from '@/components/navigation'
import { AnimatedNumber } from '@/components/animated-number'
import { RevealText } from '@/components/reveal-text'
import { useBitcoinData } from '@/hooks/use-bitcoin-data'

export default function HomePage() {
  const { data } = useBitcoinData()
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Calculate total attack cost (hardware + electricity for 1 day)
  const totalAttackCost = data 
    ? (data.attackCost.asicsRequired * 5000) + data.attackCost.daily
    : 20000000000

  return (
    <main className="relative min-h-screen bg-btc-black overflow-hidden">
      <ParticleBackground />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {showContent && (
            <>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-btc-white leading-relaxed tracking-wide opacity-0 animate-fade-in">
                If you wanted to control Bitcoin,
                <br />
                <span className="text-btc-dim">how much would it cost?</span>
              </h1>
              
              <div className="mt-12 md:mt-24">
                <div className="font-mono text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-btc-green text-glow-green animate-breathe">
                  <AnimatedNumber 
                    value={totalAttackCost} 
                    prefix="$" 
                    duration={3000}
                    delay={1000}
                  />
                </div>
                <p className="mt-6 font-mono text-xs tracking-[0.3em] text-btc-dim uppercase opacity-0 animate-fade-in delay-2000">
                  Estimated 51% Attack Cost
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Second Section */}
      <section className="relative z-10 min-h-[60vh] flex flex-col items-center justify-center px-4 md:px-8">
        <RevealText className="max-w-2xl mx-auto text-center">
          <p className="font-serif text-2xl md:text-3xl text-btc-white leading-relaxed">
            The network grows.
            <span className="text-btc-amber"> So does the cost.</span>
          </p>
        </RevealText>
        
        <RevealText delay={300} className="mt-12 md:mt-16">
          <div className="grid grid-cols-2 md:flex md:flex-row items-center gap-6 md:gap-12 lg:gap-16">
            {/* BTC Price */}
            <div className="text-center col-span-2 pb-4 mb-4 border-b border-btc-gray/20 md:border-0 md:pb-0 md:mb-0">
              <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-btc-dim uppercase mb-2">
                BTC Price
              </p>
              <div className="flex items-center justify-center gap-2 md:gap-3">
                <p className="font-mono text-xl md:text-3xl text-btc-amber">
                  ${data ? data.price.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '---'}
                </p>
                {data && (
                  <span className={`font-mono text-xs md:text-sm ${data.priceChange24h >= 0 ? 'text-btc-green' : 'text-red-500'}`}>
                    {data.priceChange24h >= 0 ? '+' : ''}{data.priceChange24h.toFixed(2)}%
                  </span>
                )}
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-btc-gray" />
            <div className="text-center">
              <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-btc-dim uppercase mb-2">
                Hashrate
              </p>
              <p className="font-mono text-lg md:text-3xl text-btc-white">
                {data ? `${data.hashrate.toFixed(0)} EH/s` : '---'}
              </p>
            </div>
            <div className="hidden md:block w-px h-12 bg-btc-gray" />
            <div className="text-center">
              <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-btc-dim uppercase mb-2">
                Block
              </p>
              <p className="font-mono text-lg md:text-3xl text-btc-white">
                {data ? data.blockHeight.toLocaleString() : '---'}
              </p>
            </div>
            <div className="hidden md:block w-px h-12 bg-btc-gray" />
            <div className="text-center col-span-2 mt-4 pt-4 border-t border-btc-gray/20 md:border-0 md:mt-0 md:pt-0">
              <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-btc-dim uppercase mb-2">
                Days Until Halving
              </p>
              <p className="font-mono text-xl md:text-3xl text-btc-amber">
                {data ? Math.floor(data.blocksUntilHalving / 144).toLocaleString() : '---'}
              </p>
            </div>
          </div>
        </RevealText>
      </section>

      {/* Network Data */}
      <section className="relative z-10 py-16 md:py-24 px-4 md:px-8 border-t border-btc-gray/20">
        <RevealText className="max-w-4xl mx-auto">
          <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-btc-dim uppercase mb-8 text-center">
            Network Data
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Link href="/attack" className="group border border-btc-gray/30 hover:border-btc-green/50 p-4 md:p-6 transition-colors">
              <p className="font-mono text-xs text-btc-dim mb-2">Attack Cost</p>
              <p className="font-serif text-lg md:text-xl text-btc-white group-hover:text-btc-green transition-colors">51% Attack</p>
            </Link>
            <Link href="/halving" className="group border border-btc-gray/30 hover:border-btc-amber/50 p-4 md:p-6 transition-colors">
              <p className="font-mono text-xs text-btc-dim mb-2">Scarcity</p>
              <p className="font-serif text-lg md:text-xl text-btc-white group-hover:text-btc-amber transition-colors">Halving</p>
            </Link>
            <Link href="/pools" className="group border border-btc-gray/30 hover:border-btc-green/50 p-4 md:p-6 transition-colors">
              <p className="font-mono text-xs text-btc-dim mb-2">Distribution</p>
              <p className="font-serif text-lg md:text-xl text-btc-white group-hover:text-btc-green transition-colors">Mining Pools</p>
            </Link>
            <Link href="/nodes" className="group border border-btc-gray/30 hover:border-btc-amber/50 p-4 md:p-6 transition-colors">
              <p className="font-mono text-xs text-btc-dim mb-2">Decentralization</p>
              <p className="font-serif text-lg md:text-xl text-btc-white group-hover:text-btc-amber transition-colors">Nodes</p>
            </Link>
          </div>
        </RevealText>
      </section>

      {/* Learn Section */}
      <section className="relative z-10 py-16 md:py-24 px-4 md:px-8 border-t border-btc-gray/20">
        <RevealText className="max-w-4xl mx-auto">
          <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-btc-dim uppercase mb-8 text-center">
            Learn
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <Link href="/what-is-bitcoin" className="group text-center p-4 md:p-6 border border-btc-gray/30 hover:border-btc-white/30 transition-colors">
              <p className="font-serif text-lg text-btc-white group-hover:text-btc-green transition-colors">What is Bitcoin?</p>
            </Link>
            <Link href="/mining" className="group text-center p-4 md:p-6 border border-btc-gray/30 hover:border-btc-white/30 transition-colors">
              <p className="font-serif text-lg text-btc-white group-hover:text-btc-green transition-colors">How Mining Works</p>
            </Link>
            <Link href="/myths" className="group text-center p-4 md:p-6 border border-btc-gray/30 hover:border-btc-white/30 transition-colors">
              <p className="font-serif text-lg text-btc-white group-hover:text-btc-green transition-colors">Common Myths</p>
            </Link>
            <Link href="/glossary" className="group text-center p-4 md:p-6 border border-btc-gray/30 hover:border-btc-white/30 transition-colors">
              <p className="font-serif text-lg text-btc-white group-hover:text-btc-amber transition-colors">Glossary</p>
            </Link>
            <Link href="/timeline" className="group text-center p-4 md:p-6 border border-btc-gray/30 hover:border-btc-white/30 transition-colors">
              <p className="font-serif text-lg text-btc-white group-hover:text-btc-amber transition-colors">Timeline</p>
            </Link>
            <Link href="/learn" className="group text-center p-4 md:p-6 border border-btc-gray/30 hover:border-btc-white/30 transition-colors">
              <p className="font-serif text-lg text-btc-white group-hover:text-btc-amber transition-colors">Books & Media</p>
            </Link>
          </div>
        </RevealText>
      </section>

      {/* Tools & Resources */}
      <section className="relative z-10 py-16 md:py-24 px-4 md:px-8 border-t border-btc-gray/20">
        <RevealText className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-btc-dim uppercase mb-8">
            Tools & Resources
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link href="/tools" className="px-5 py-3 border border-btc-green text-btc-green hover:bg-btc-green/10 font-mono text-xs uppercase tracking-wider transition-colors">
              Unit Converter
            </Link>
            <Link href="/tools" className="px-5 py-3 border border-btc-amber text-btc-amber hover:bg-btc-amber/10 font-mono text-xs uppercase tracking-wider transition-colors">
              Fee Estimator
            </Link>
            <Link href="/developers" className="px-5 py-3 border border-btc-white text-btc-white hover:bg-btc-white/10 font-mono text-xs uppercase tracking-wider transition-colors">
              Developers
            </Link>
            <a 
              href="https://bitcoin.org/bitcoin.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-3 border-2 border-btc-amber text-btc-amber hover:bg-btc-amber/10 font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
              </svg>
              Whitepaper
            </a>
          </div>
        </RevealText>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 md:py-12 px-4 md:px-8 border-t border-btc-gray/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-btc-dim">
            {data?.lastUpdated
              ? `Last updated: ${new Date(data.lastUpdated).toLocaleTimeString()} — refreshes every 60s`
              : 'Loading...'}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/BTC51org"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[10px] text-btc-dim hover:text-btc-white transition-colors"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
              </svg>
              @BTC51org
            </a>
            <span className="text-btc-gray/40">·</span>
            <a
              href="https://github.com/BTC51org"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[10px] text-btc-dim hover:text-btc-white transition-colors"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </a>
            <span className="text-btc-gray/40">·</span>
            <a
              href="https://bitcoin.org/bitcoin.pdf"
              target="_blank" rel="noopener noreferrer"
              className="font-mono text-[10px] text-btc-dim hover:text-btc-amber transition-colors"
            >
              Whitepaper
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
