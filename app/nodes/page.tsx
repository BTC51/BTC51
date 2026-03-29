'use client'

import { Navigation } from '@/components/navigation'
import { ParticleBackground } from '@/components/particle-background'
import { RevealText } from '@/components/reveal-text'
import { useBitcoinData } from '@/hooks/use-bitcoin-data'
import { AnimatedNumber } from '@/components/animated-number'

const NODE_REGIONS = [
  { region: 'North America', percentage: 28, nodes: 5040, color: '#00ff88' },
  { region: 'Europe', percentage: 42, nodes: 7560, color: '#ffcc66' },
  { region: 'Asia', percentage: 18, nodes: 3240, color: '#4ecdc4' },
  { region: 'South America', percentage: 5, nodes: 900, color: '#a855f7' },
  { region: 'Oceania', percentage: 4, nodes: 720, color: '#3b82f6' },
  { region: 'Africa', percentage: 2, nodes: 360, color: '#f97316' },
  { region: 'Unknown', percentage: 1, nodes: 180, color: '#666666' },
]

const NODE_HISTORY = [
  { year: '2015', nodes: 5000 },
  { year: '2017', nodes: 8000 },
  { year: '2019', nodes: 10000 },
  { year: '2021', nodes: 14000 },
  { year: '2023', nodes: 16000 },
  { year: '2025', nodes: 18000 },
]

export default function NodesPage() {
  const { data } = useBitcoinData()
  const nodeCount = data?.nodeCount || 18000

  return (
    <main className="min-h-screen bg-btc-black text-btc-white overflow-x-hidden">
      <ParticleBackground />
      <Navigation />

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <RevealText as="h1" className="font-serif text-3xl sm:text-4xl md:text-6xl text-btc-white leading-relaxed">
            A global network of validators.
          </RevealText>
          
          <RevealText delay={300} className="mt-8">
            <p className="font-mono text-xs tracking-[0.2em] text-btc-dim uppercase mb-4">
              Reachable Nodes Worldwide
            </p>
            <div className="font-mono text-5xl md:text-7xl text-btc-green text-glow-green animate-breathe">
              <AnimatedNumber value={nodeCount} duration={2000} />
            </div>
          </RevealText>

          <RevealText delay={500} className="mt-8">
            <p className="font-serif text-lg md:text-xl text-btc-dim max-w-2xl mx-auto">
              Each node independently verifies every transaction and block, 
              ensuring no single authority can alter the rules.
            </p>
          </RevealText>
        </div>
      </section>

      {/* Geographic Distribution */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <RevealText className="mb-12 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white">
              Geographic Distribution
            </h2>
          </RevealText>

          <div className="space-y-6">
            {NODE_REGIONS.map((region, index) => (
              <RevealText key={region.region} delay={index * 100}>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-btc-white w-28 md:w-36">
                    {region.region}
                  </span>
                  <div className="flex-1 h-6 bg-btc-gray/30 relative">
                    <div
                      className="h-full animate-[grow_1s_ease-out_forwards]"
                      style={{
                        width: `${region.percentage}%`,
                        backgroundColor: region.color,
                        animationDelay: `${index * 100 + 500}ms`,
                      }}
                    />
                  </div>
                  <span className="font-mono text-xs text-btc-dim w-12 text-right">
                    {region.percentage}%
                  </span>
                </div>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* Why Run a Node */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24 border-t border-btc-gray/20">
        <div className="max-w-3xl mx-auto">
          <RevealText className="mb-12 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white">
              Why Run a Node?
            </h2>
          </RevealText>

          <div className="space-y-8">
            <RevealText delay={100}>
              <div className="border-l-2 border-btc-green pl-6 py-2">
                <h3 className="font-mono text-sm text-btc-green uppercase tracking-wider mb-2">
                  Verify, don&apos;t trust
                </h3>
                <p className="font-serif text-btc-dim">
                  Your node validates every transaction against consensus rules. 
                  No trust in third parties required.
                </p>
              </div>
            </RevealText>

            <RevealText delay={200}>
              <div className="border-l-2 border-btc-amber pl-6 py-2">
                <h3 className="font-mono text-sm text-btc-amber uppercase tracking-wider mb-2">
                  Financial Privacy
                </h3>
                <p className="font-serif text-btc-dim">
                  Query balances and broadcast transactions without revealing 
                  your addresses to third-party servers.
                </p>
              </div>
            </RevealText>

            <RevealText delay={300}>
              <div className="border-l-2 border-btc-white pl-6 py-2">
                <h3 className="font-mono text-sm text-btc-white uppercase tracking-wider mb-2">
                  Support the Network
                </h3>
                <p className="font-serif text-btc-dim">
                  More nodes means more decentralization and resilience 
                  against attacks or censorship attempts.
                </p>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* Historical Growth */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24 border-t border-btc-gray/20">
        <div className="max-w-4xl mx-auto">
          <RevealText className="mb-12 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white">
              Network Growth
            </h2>
          </RevealText>

          {/* Bar chart with fixed height container */}
          <div className="relative h-48 md:h-64 flex items-end justify-between gap-2 md:gap-4">
            {(() => {
              const maxNodes = Math.max(...NODE_HISTORY.map(h => h.nodes))
              return NODE_HISTORY.map((item, index) => {
                const heightPct = (item.nodes / maxNodes) * 100
                return (
                  <div key={item.year} className="flex-1 flex flex-col items-center justify-end h-full">
                    <span className="font-mono text-[10px] md:text-xs text-btc-dim mb-1">
                      {(item.nodes / 1000).toFixed(0)}k
                    </span>
                    <div
                      className="w-full bg-btc-green/70 hover:bg-btc-green transition-colors duration-300"
                      style={{
                        height: `${heightPct}%`,
                        minHeight: '8px',
                        transitionDelay: `${index * 80}ms`,
                      }}
                    />
                    <span className="font-mono text-[10px] md:text-xs text-btc-dim mt-2">
                      {item.year}
                    </span>
                  </div>
                )
              })
            })()}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24 border-t border-btc-gray/20">
        <div className="max-w-3xl mx-auto text-center">
          <RevealText>
            <h2 className="font-serif text-xl md:text-2xl text-btc-white mb-8">
              Run Your Own Node
            </h2>
          </RevealText>

          <RevealText delay={200}>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://bitcoin.org/en/full-node" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 border border-btc-green text-btc-green hover:bg-btc-green/10 font-mono text-xs uppercase tracking-wider transition-colors"
              >
                Bitcoin Core
              </a>
              <a 
                href="https://github.com/getumbrel/umbrel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 border border-btc-amber text-btc-amber hover:bg-btc-amber/10 font-mono text-xs uppercase tracking-wider transition-colors"
              >
                Umbrel
              </a>
              <a 
                href="https://start9.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 border border-btc-white text-btc-white hover:bg-btc-white/10 font-mono text-xs uppercase tracking-wider transition-colors"
              >
                Start9
              </a>
            </div>
          </RevealText>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 md:py-12 px-4 md:px-8 border-t border-btc-gray/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-mono text-[10px] md:text-xs text-btc-dim">
            Node data from bitnodes.io | Geographic distribution estimated
          </p>
        </div>
      </footer>
    </main>
  )
}
