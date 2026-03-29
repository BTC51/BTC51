'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { ParticleBackground } from '@/components/particle-background'
import { RevealText } from '@/components/reveal-text'

interface Myth {
  myth: string
  reality: string
  expanded?: string
}

const MYTHS: Myth[] = [
  {
    myth: 'Bitcoin wastes energy',
    reality: 'Bitcoin uses energy to secure $1.7 trillion in value. The question is whether that security is valuable.',
    expanded: 'Bitcoin mining increasingly uses renewable and stranded energy that would otherwise be wasted. Studies show 50-60% of mining uses sustainable energy sources. Mining also provides a buyer of last resort for energy, incentivizing renewable development in remote areas.',
  },
  {
    myth: 'Bitcoin is used by criminals',
    reality: 'Less than 1% of Bitcoin transactions are illicit. Cash remains the preferred medium for crime.',
    expanded: 'Chainalysis reports show illicit activity represents 0.15-0.5% of cryptocurrency transactions. Bitcoin&apos;s transparent blockchain actually makes it easier for law enforcement to trace transactions than cash.',
  },
  {
    myth: 'Bitcoin has no intrinsic value',
    reality: 'Bitcoin&apos;s value comes from its unique properties: scarcity, portability, divisibility, and censorship resistance.',
    expanded: 'No money has &quot;intrinsic&quot; value — value is always subjective. Bitcoin solves real problems: it provides a neutral, global, censorship-resistant store of value that doesn&apos;t require trust in any institution.',
  },
  {
    myth: 'Bitcoin is too volatile to be useful',
    reality: 'Volatility decreases over time as adoption increases. All new assets are volatile initially.',
    expanded: 'Bitcoin&apos;s volatility has decreased significantly each market cycle. For people facing hyperinflation or capital controls, Bitcoin&apos;s volatility is far less risky than their local currency.',
  },
  {
    myth: 'Bitcoin can be copied or replaced',
    reality: 'Bitcoin&apos;s network effect, security, and decentralization cannot be replicated.',
    expanded: 'While the code can be copied, the network cannot. Bitcoin has the most hashpower, the longest track record, the widest distribution, and the strongest brand. No alternative has achieved comparable decentralization.',
  },
  {
    myth: 'Bitcoin is too slow for payments',
    reality: 'Layer 2 solutions like Lightning enable instant, nearly-free payments. Bitcoin L1 is for settlement.',
    expanded: 'The Lightning Network processes millions of instant payments daily. Bitcoin&apos;s base layer is optimized for security and settlement, not speed. This layered approach mirrors how traditional finance works.',
  },
  {
    myth: 'Governments will ban Bitcoin',
    reality: 'Major economies are increasingly regulating rather than banning. El Salvador made it legal tender.',
    expanded: 'Banning Bitcoin is technically very difficult — it&apos;s just encrypted data. Countries that try to ban it often see increased adoption. Most major economies have chosen to regulate and tax it instead.',
  },
  {
    myth: 'Quantum computers will break Bitcoin',
    reality: 'Bitcoin can upgrade its cryptography if needed. Quantum computing is decades from being a threat.',
    expanded: 'Current quantum computers are far from breaking Bitcoin&apos;s cryptography. When quantum computing advances, Bitcoin can soft-fork to quantum-resistant signatures. The community is already researching solutions.',
  },
]

function MythCard({ myth, index }: { myth: Myth; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <RevealText delay={index * 100}>
      <div 
        className="border border-btc-gray/30 hover:border-btc-green/50 transition-colors cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="p-6">
          {/* Myth */}
          <div className="flex items-start gap-4">
            <span className="font-mono text-xs text-red-500/80 uppercase tracking-wider shrink-0 mt-1">
              Myth
            </span>
            <p className="font-serif text-lg text-btc-white line-through decoration-red-500/30">
              &quot;{myth.myth}&quot;
            </p>
          </div>
          
          {/* Reality */}
          <div className="flex items-start gap-4 mt-6">
            <span className="font-mono text-xs text-btc-green uppercase tracking-wider shrink-0 mt-1">
              Reality
            </span>
            <p className="font-serif text-btc-dim">
              {myth.reality}
            </p>
          </div>

          {/* Expanded content */}
          {isExpanded && myth.expanded && (
            <div className="mt-6 pt-6 border-t border-btc-gray/20">
              <p className="font-serif text-sm text-btc-dim/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: myth.expanded }} />
            </div>
          )}

          {/* Expand indicator */}
          <div className="mt-4 text-center">
            <span className="font-mono text-[10px] text-btc-dim">
              {isExpanded ? '[ click to collapse ]' : '[ click to expand ]'}
            </span>
          </div>
        </div>
      </div>
    </RevealText>
  )
}

export default function MythsPage() {
  return (
    <main className="min-h-screen bg-btc-black text-btc-white overflow-x-hidden">
      <ParticleBackground />
      <Navigation />

      {/* Hero */}
      <section className="relative z-10 min-h-[60vh] flex flex-col items-center justify-center px-4 md:px-8 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <RevealText as="h1" className="font-serif text-3xl sm:text-4xl md:text-6xl text-btc-white leading-relaxed">
            Common Myths
          </RevealText>
          
          <RevealText delay={300} className="mt-6">
            <p className="font-serif text-lg md:text-xl text-btc-dim max-w-2xl mx-auto">
              Separating fact from fiction
            </p>
          </RevealText>
        </div>
      </section>

      {/* Myths List */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-3xl mx-auto space-y-6">
          {MYTHS.map((myth, index) => (
            <MythCard key={index} myth={myth} index={index} />
          ))}
        </div>
      </section>

      {/* Note */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24 border-t border-btc-gray/20">
        <div className="max-w-2xl mx-auto text-center">
          <RevealText>
            <p className="font-serif text-btc-dim leading-relaxed">
              Misinformation spreads because Bitcoin challenges conventional 
              thinking about money. The best way to understand Bitcoin is to 
              study it deeply and use it yourself.
            </p>
          </RevealText>

          <RevealText delay={200} className="mt-8">
            <p className="font-mono text-xs text-btc-amber">
              &quot;Don&apos;t trust, verify.&quot;
            </p>
          </RevealText>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 md:py-12 px-4 md:px-8 border-t border-btc-gray/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-mono text-[10px] md:text-xs text-btc-dim">
            Click each myth to learn more
          </p>
        </div>
      </footer>
    </main>
  )
}
