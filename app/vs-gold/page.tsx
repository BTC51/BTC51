'use client'

import { useEffect, useState, useRef } from 'react'
import { Navigation } from '@/components/navigation'
import { ParticleBackground } from '@/components/particle-background'
import { RevealText } from '@/components/reveal-text'
import { useBitcoinData } from '@/hooks/use-bitcoin-data'

const comparisonPoints = [
  {
    id: 'verifiable',
    title: 'Verifiability',
    bitcoin: 'Anyone can verify supply on-chain in real-time',
    gold: 'Relies on third-party audits, reserves are opaque',
    btcValue: '21M cap, verifiable at any moment',
    goldValue: 'Global reserves estimates vary by 20%+',
    icon: '01',
  },
  {
    id: 'portability',
    title: 'Portability',
    bitcoin: '12 seed words carry any amount across borders',
    gold: '1kg of gold = ~52cm³, weight limits transport',
    btcValue: 'No weight, no volume, no borders',
    goldValue: 'Cross-border requires customs, insurance',
    icon: '02',
  },
  {
    id: 'divisibility',
    title: 'Divisibility',
    bitcoin: 'Divisible to 1/100,000,000 (1 satoshi)',
    gold: 'Physical division is costly and imprecise',
    btcValue: '1 BTC = 100,000,000 sats',
    goldValue: 'Smallest unit ~0.1g ≈ $7',
    icon: '03',
  },
  {
    id: 'scarcity',
    title: 'Scarcity',
    bitcoin: 'Mathematically fixed, absolute cap',
    gold: 'Annual mining adds ~2-3% to supply',
    btcValue: '21,000,000 forever',
    goldValue: '~3,000 tonnes mined per year',
    icon: '04',
  },
  {
    id: 'custody',
    title: 'Custody Cost',
    bitcoin: 'Hardware wallet ~$100, zero annual fees',
    gold: 'Vault storage ~0.5-1% annually',
    btcValue: 'Self-custody: $0/year',
    goldValue: '$1M gold: $5k-10k/year',
    icon: '05',
  },
  {
    id: 'transfer',
    title: 'Transfer Speed',
    bitcoin: 'Global settlement in ~10 minutes',
    gold: 'International transport takes days',
    btcValue: '~10 min finality',
    goldValue: '2-5 business days',
    icon: '06',
  },
  {
    id: 'censorship',
    title: 'Censorship Resistance',
    bitcoin: 'Your keys, your coins. Cannot be seized.',
    gold: 'Subject to government confiscation',
    btcValue: '100,000+ nodes globally',
    goldValue: 'See: Executive Order 6102',
    icon: '07',
  },
  {
    id: 'auditability',
    title: 'Auditability',
    bitcoin: 'Blockchain is fully transparent',
    gold: 'Fort Knox: not audited since 1974',
    btcValue: 'Every tx traceable forever',
    goldValue: 'Fed reserves: trust required',
    icon: '08',
  },
]

function AnimatedCounter({ 
  value, 
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 1
}: { 
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplayValue(value * eased)
            if (progress < 1) requestAnimationFrame(animate)
          }
          animate()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, duration, hasAnimated])

  const formattedValue = decimals > 0 
    ? displayValue.toFixed(decimals) 
    : Math.floor(displayValue).toLocaleString()

  return (
    <span ref={ref}>
      {prefix}{formattedValue}{suffix}
    </span>
  )
}

function ComparisonCard({ 
  point, 
  index, 
  isVisible 
}: { 
  point: typeof comparisonPoints[0]
  index: number
  isVisible: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden
        border border-btc-gray/20 
        transition-all duration-700 ease-out
        ${isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
        }
      `}
      style={{ 
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Background gradient on hover */}
      <div 
        className={`
          absolute inset-0 transition-opacity duration-500
          bg-gradient-to-r from-btc-amber/5 via-transparent to-btc-gold/5
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* Content */}
      <div className="relative p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="font-mono text-xs text-btc-dim">{point.icon}</span>
            <h3 className={`
              font-serif text-xl md:text-2xl mt-1 transition-colors duration-300
              ${isHovered ? 'text-btc-white' : 'text-btc-white/80'}
            `}>
              {point.title}
            </h3>
          </div>
          <div className={`
            font-mono text-[10px] px-3 py-1 
            bg-btc-green/10 text-btc-green border border-btc-green/20
            transition-all duration-300
            ${isHovered ? 'bg-btc-green/20 border-btc-green/40' : ''}
          `}>
            BTC WINS
          </div>
        </div>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Bitcoin side */}
          <div className={`
            relative pl-4 border-l-2 transition-all duration-300
            ${isHovered ? 'border-btc-amber' : 'border-btc-amber/50'}
          `}>
            <p className="font-mono text-[10px] text-btc-amber uppercase tracking-widest mb-2">
              Bitcoin
            </p>
            <p className={`
              font-mono text-sm leading-relaxed transition-colors duration-300
              ${isHovered ? 'text-btc-white' : 'text-btc-white/70'}
            `}>
              {point.bitcoin}
            </p>
            <p className="font-mono text-xs text-btc-green mt-3">
              {point.btcValue}
            </p>
          </div>

          {/* Gold side */}
          <div className={`
            relative pl-4 border-l-2 transition-all duration-300
            ${isHovered ? 'border-btc-gold' : 'border-btc-gold/30'}
          `}>
            <p className="font-mono text-[10px] text-btc-gold uppercase tracking-widest mb-2">
              Gold
            </p>
            <p className={`
              font-mono text-sm leading-relaxed transition-colors duration-300
              ${isHovered ? 'text-btc-dim' : 'text-btc-dim/70'}
            `}>
              {point.gold}
            </p>
            <p className="font-mono text-xs text-btc-dim/50 mt-3">
              {point.goldValue}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom line animation */}
      <div 
        className={`
          absolute bottom-0 left-0 h-px bg-gradient-to-r from-btc-amber via-btc-green to-btc-gold
          transition-all duration-500 ease-out
          ${isHovered ? 'w-full' : 'w-0'}
        `}
      />
    </div>
  )
}

export default function VsGoldPage() {
  const { data } = useBitcoinData()
  const [showHero, setShowHero] = useState(false)
  const [showCards, setShowCards] = useState(false)
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const heroTimer = setTimeout(() => setShowHero(true), 300)
    const cardsTimer = setTimeout(() => setShowCards(true), 1200)
    return () => {
      clearTimeout(heroTimer)
      clearTimeout(cardsTimer)
    }
  }, [])

  // Track scroll sections
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      setActiveSection(Math.floor(scrollY / windowHeight))
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const btcMarketCap = data?.marketCap || 1700000000000
  const goldMarketCap = 16000000000000
  const btcMarketCapTrillion = btcMarketCap / 1e12
  const btcToGoldRatio = ((btcMarketCap / goldMarketCap) * 100)

  return (
    <main className="min-h-screen bg-btc-black text-btc-white">
      <ParticleBackground />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main title with dramatic reveal */}
          <div className={`
            transition-all duration-1000 ease-out
            ${showHero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <p className="font-mono text-xs tracking-[0.3em] text-btc-dim uppercase mb-8">
              A Property-by-Property Comparison
            </p>
            
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight">
              <span className="text-btc-amber animate-breathe inline-block">Bitcoin</span>
              <span className="text-btc-dim mx-2 md:mx-6">vs</span>
              <span className="text-btc-gold inline-block">Gold</span>
            </h1>
          </div>

          {/* Market cap comparison */}
          <div className={`
            mt-20 transition-all duration-1000 ease-out delay-500
            ${showHero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
          style={{ transitionDelay: '600ms' }}
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              {/* BTC Market Cap */}
              <div className="text-center group">
                <p className="font-mono text-[10px] tracking-[0.2em] text-btc-dim uppercase mb-3">
                  Bitcoin Market Cap
                </p>
                <p className="font-mono text-3xl md:text-4xl text-btc-amber group-hover:text-glow-amber transition-all">
                  $<AnimatedCounter value={btcMarketCapTrillion} suffix="T" decimals={2} duration={2000} />
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-btc-gray to-transparent" />
                <span className="font-mono text-btc-dim text-lg">vs</span>
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-btc-gray to-transparent" />
              </div>

              {/* Gold Market Cap */}
              <div className="text-center group">
                <p className="font-mono text-[10px] tracking-[0.2em] text-btc-dim uppercase mb-3">
                  Gold Market Cap
                </p>
                <p className="font-mono text-3xl md:text-4xl text-btc-gold group-hover:text-glow-amber transition-all">
                  $<AnimatedCounter value={16} suffix="T" decimals={0} duration={2000} />
                </p>
              </div>

              {/* Ratio */}
              <div className="hidden md:block w-px h-16 bg-btc-gray/30" />
              
              <div className="text-center">
                <p className="font-mono text-[10px] tracking-[0.2em] text-btc-dim uppercase mb-3">
                  BTC / Gold
                </p>
                <p className="font-mono text-3xl md:text-4xl text-btc-green text-glow-green">
                  <AnimatedCounter value={btcToGoldRatio} suffix="%" decimals={1} duration={2500} />
                </p>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className={`
            absolute bottom-12 left-1/2 -translate-x-1/2
            transition-all duration-1000 delay-1000
            ${showHero ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="flex flex-col items-center gap-2">
              <span className="font-mono text-[10px] text-btc-dim tracking-widest uppercase">
                Scroll to compare
              </span>
              <div className="w-px h-8 bg-gradient-to-b from-btc-green to-transparent animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Cards */}
      <section className="px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <RevealText className="mb-16 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-btc-white mb-4">
              8 Dimensions of Comparison
            </h2>
            <p className="font-mono text-sm text-btc-dim">
              Every claim is verifiable. Every advantage is measurable.
            </p>
          </RevealText>

          <div className="grid gap-4 md:gap-6">
            {comparisonPoints.map((point, index) => (
              <ComparisonCard 
                key={point.id}
                point={point}
                index={index}
                isVisible={showCards}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stock-to-Flow Section */}
      <section className="px-4 md:px-8 py-16 md:py-24 border-t border-btc-gray/20">
        <div className="max-w-4xl mx-auto">
          <RevealText className="text-center mb-16">
            <p className="font-mono text-xs tracking-[0.2em] text-btc-dim uppercase mb-4">
              Scarcity Model
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-btc-white mb-4">
              Stock-to-Flow
            </h2>
            <p className="font-mono text-sm text-btc-dim max-w-xl mx-auto">
              The higher the ratio of existing stock to annual production, 
              the scarcer the asset.
            </p>
          </RevealText>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <RevealText delay={200}>
              <div className="border border-btc-gold/30 p-6 md:p-8 text-center group hover:border-btc-gold/60 transition-all duration-300">
                <p className="font-mono text-[10px] text-btc-gold/60 uppercase tracking-widest mb-4 md:mb-6">
                  Gold S2F
                </p>
                <p className="font-mono text-4xl md:text-6xl text-btc-gold mb-3 md:mb-4 group-hover:animate-breathe">
                  ~62
                </p>
                <p className="font-mono text-[10px] md:text-xs text-btc-dim leading-relaxed">
                  62 years of mining<br />to double supply
                </p>
              </div>
            </RevealText>

            <RevealText delay={400}>
              <div className="border border-btc-amber p-6 md:p-8 text-center group hover:bg-btc-amber/5 transition-all duration-300">
                <p className="font-mono text-[10px] text-btc-amber uppercase tracking-widest mb-4 md:mb-6">
                  Bitcoin S2F (Now)
                </p>
                <p className="font-mono text-4xl md:text-6xl text-btc-amber mb-3 md:mb-4 group-hover:animate-breathe">
                  ~120
                </p>
                <p className="font-mono text-[10px] md:text-xs text-btc-dim leading-relaxed">
                  Already 2x scarcer<br />than gold
                </p>
              </div>
            </RevealText>

            <RevealText delay={600}>
              <div className="border border-btc-green p-6 md:p-8 text-center group hover:bg-btc-green/5 transition-all duration-300">
                <p className="font-mono text-[10px] text-btc-green uppercase tracking-widest mb-4 md:mb-6">
                  Bitcoin S2F (2028)
                </p>
                <p className="font-mono text-4xl md:text-6xl text-btc-green text-glow-green mb-3 md:mb-4 group-hover:animate-breathe">
                  ~240
                </p>
                <p className="font-mono text-[10px] md:text-xs text-btc-dim leading-relaxed">
                  4x gold after<br />next halving
                </p>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* Historical Context */}
      <section className="px-4 md:px-8 py-16 md:py-24 border-t border-btc-gray/20">
        <div className="max-w-4xl mx-auto">
          <RevealText className="mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-btc-white mb-2">
              Historical Context
            </h2>
          </RevealText>

          <div className="space-y-8">
            <RevealText delay={200}>
              <div className="group relative pl-6 py-4 border-l-2 border-btc-gold/40 hover:border-btc-gold transition-all duration-300">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[5px] w-2 h-2 bg-btc-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="font-mono text-xs text-btc-gold uppercase tracking-widest mb-3">
                  1933 — Executive Order 6102
                </p>
                <p className="font-mono text-sm text-btc-dim leading-relaxed">
                  President Roosevelt signed an order forbidding US citizens from holding gold.
                  <br />
                  Forced sale at $20.67/oz. Government revalued to $35/oz — 
                  <span className="text-btc-amber"> 41% dollar devaluation overnight.</span>
                </p>
              </div>
            </RevealText>

            <RevealText delay={400}>
              <div className="group relative pl-6 py-4 border-l-2 border-btc-amber/40 hover:border-btc-amber transition-all duration-300">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[5px] w-2 h-2 bg-btc-amber rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="font-mono text-xs text-btc-amber uppercase tracking-widest mb-3">
                  2009 — Genesis Block
                </p>
                <p className="font-mono text-sm text-btc-dim leading-relaxed">
                  <span className="text-btc-green italic">
                    &quot;The Times 03/Jan/2009 Chancellor on brink of second bailout for banks&quot;
                  </span>
                  <br />
                  This message is permanently recorded in Bitcoin&apos;s first block.
                </p>
              </div>
            </RevealText>

            <RevealText delay={600}>
              <div className="group relative pl-6 py-4 border-l-2 border-btc-dim/40 hover:border-btc-white transition-all duration-300">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[5px] w-2 h-2 bg-btc-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="font-mono text-xs text-btc-white uppercase tracking-widest mb-3">
                  Fort Knox — Unaudited
                </p>
                <p className="font-mono text-sm text-btc-dim leading-relaxed">
                  The US claims ~4,580 tonnes of gold (~$300B) at Fort Knox.
                  <br />
                  <span className="text-btc-amber">No complete independent audit since 1974.</span>
                  {' '}Bitcoin&apos;s supply can be verified by anyone, anytime.
                </p>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* Footer Quote */}
      <section className="px-4 md:px-8 py-20 md:py-32 text-center">
        <RevealText>
          <blockquote className="font-serif text-lg md:text-3xl text-btc-dim leading-relaxed max-w-3xl mx-auto">
            <span className="text-btc-white">&quot;</span>
            Gold is a way of going long on fear.
            <br />
            Bitcoin is a way of going long on 
            <span className="text-btc-green"> the future of digital civilization.</span>
            <span className="text-btc-white">&quot;</span>
          </blockquote>
          <p className="font-mono text-xs text-btc-amber mt-8 tracking-widest">
            — NAVAL RAVIKANT
          </p>
        </RevealText>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-8 border-t border-btc-gray/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-btc-dim">
            Data refreshes every 60 seconds
          </p>
          <p className="font-mono text-xs text-btc-dim">
            {data?.lastUpdated 
              ? `Last updated: ${new Date(data.lastUpdated).toLocaleTimeString()}`
              : 'Loading...'
            }
          </p>
        </div>
      </footer>
    </main>
  )
}
