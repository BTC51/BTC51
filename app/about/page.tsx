'use client'

import { Navigation } from '@/components/navigation'
import { ParticleBackground } from '@/components/particle-background'
import { RevealText } from '@/components/reveal-text'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-btc-black text-btc-white overflow-x-hidden">
      <ParticleBackground />
      <Navigation />

      {/* Hero */}
      <section className="relative z-10 min-h-[60vh] flex flex-col items-center justify-center px-4 md:px-8 pt-24">
        <div className="max-w-3xl mx-auto text-center">
          <RevealText as="h1" className="font-serif text-3xl sm:text-4xl md:text-5xl text-btc-white">
            About BTC51
          </RevealText>
          
          <RevealText delay={200} className="mt-6">
            <p className="font-serif text-lg md:text-xl text-btc-dim leading-relaxed">
              An educational resource dedicated to making Bitcoin accessible and understandable.
            </p>
          </RevealText>
        </div>
      </section>

      {/* Mission */}
      <section className="relative z-10 px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <RevealText className="mb-8">
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white">Our Mission</h2>
          </RevealText>

          <RevealText delay={200}>
            <p className="font-serif text-lg text-btc-dim leading-relaxed mb-6">
              We believe Bitcoin is one of the most important inventions of the 21st century. 
              Yet it remains widely misunderstood, often dismissed based on misinformation 
              or surface-level analysis.
            </p>
          </RevealText>

          <RevealText delay={300}>
            <p className="font-serif text-lg text-btc-dim leading-relaxed">
              BTC51 exists to provide accurate, accessible, and visual education about 
              Bitcoin. We focus on real-time data, clear explanations, and letting the 
              facts speak for themselves.
            </p>
          </RevealText>
        </div>
      </section>

      {/* What We Cover */}
      <section className="relative z-10 px-4 md:px-8 py-12 md:py-16 border-t border-btc-gray/20">
        <div className="max-w-3xl mx-auto">
          <RevealText className="mb-8">
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white">What We Cover</h2>
          </RevealText>

          <div className="space-y-6">
            <RevealText delay={100}>
              <div className="border-l-2 border-btc-green pl-6 py-2">
                <h3 className="font-mono text-sm text-btc-green uppercase tracking-wider mb-2">
                  Network Security
                </h3>
                <p className="font-serif text-btc-dim">
                  Understanding 51% attacks, hashrate distribution, and what makes Bitcoin secure.
                </p>
              </div>
            </RevealText>

            <RevealText delay={200}>
              <div className="border-l-2 border-btc-amber pl-6 py-2">
                <h3 className="font-mono text-sm text-btc-amber uppercase tracking-wider mb-2">
                  Economics
                </h3>
                <p className="font-serif text-btc-dim">
                  Halving events, supply dynamics, and Bitcoin&apos;s monetary properties.
                </p>
              </div>
            </RevealText>

            <RevealText delay={300}>
              <div className="border-l-2 border-btc-white pl-6 py-2">
                <h3 className="font-mono text-sm text-btc-white uppercase tracking-wider mb-2">
                  Technology
                </h3>
                <p className="font-serif text-btc-dim">
                  Mining hardware, Lightning Network, and the evolution of Bitcoin infrastructure.
                </p>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="relative z-10 px-4 md:px-8 py-12 md:py-16 border-t border-btc-gray/20">
        <div className="max-w-3xl mx-auto">
          <RevealText className="mb-8">
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white">Data Sources</h2>
            <p className="font-serif text-sm text-btc-dim mt-2">
              All data is fetched in real-time from trusted, public APIs.
            </p>
          </RevealText>

          <div className="grid md:grid-cols-2 gap-4">
            <RevealText delay={100}>
              <div className="border border-btc-gray/30 p-4">
                <h3 className="font-mono text-sm text-btc-green mb-2">mempool.space</h3>
                <p className="font-serif text-sm text-btc-dim">
                  Hashrate, mining pools, Lightning Network, fee estimates
                </p>
              </div>
            </RevealText>

            <RevealText delay={200}>
              <div className="border border-btc-gray/30 p-4">
                <h3 className="font-mono text-sm text-btc-amber mb-2">CoinGecko</h3>
                <p className="font-serif text-sm text-btc-dim">
                  Price data, market cap, 24h volume
                </p>
              </div>
            </RevealText>

            <RevealText delay={300}>
              <div className="border border-btc-gray/30 p-4">
                <h3 className="font-mono text-sm text-btc-white mb-2">blockchain.info</h3>
                <p className="font-serif text-sm text-btc-dim">
                  Block height, network difficulty
                </p>
              </div>
            </RevealText>

            <RevealText delay={400}>
              <div className="border border-btc-gray/30 p-4">
                <h3 className="font-mono text-sm text-btc-dim mb-2">bitnodes.io</h3>
                <p className="font-serif text-sm text-btc-dim">
                  Global node count and distribution
                </p>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="relative z-10 px-4 md:px-8 py-12 md:py-16 border-t border-btc-gray/20">
        <div className="max-w-3xl mx-auto">
          <RevealText>
            <h2 className="font-serif text-xl md:text-2xl text-btc-white mb-4">Disclaimer</h2>
            <p className="font-serif text-sm text-btc-dim leading-relaxed">
              This website is for educational purposes only. Nothing here constitutes 
              financial advice. Always do your own research before making any financial 
              decisions. Bitcoin is volatile and carries significant risks.
            </p>
          </RevealText>
        </div>
      </section>

      {/* Open Source */}
      <section className="relative z-10 px-4 md:px-8 py-12 md:py-16 border-t border-btc-gray/20">
        <div className="max-w-2xl mx-auto text-center">
          <RevealText>
            <h2 className="font-serif text-xl md:text-2xl text-btc-white mb-4">
              Open Source
            </h2>
            <p className="font-serif text-btc-dim mb-8">
              Like Bitcoin itself, this project is open source. 
              Verify the code, suggest improvements, or fork it for your own use.
            </p>
          </RevealText>

          <RevealText delay={200}>
            <a 
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 border border-btc-green text-btc-green hover:bg-btc-green/10 font-mono text-sm uppercase tracking-wider transition-colors"
            >
              View on GitHub
            </a>
          </RevealText>
        </div>
      </section>

      {/* Contact */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24 border-t border-btc-gray/20">
        <div className="max-w-2xl mx-auto text-center">
          <RevealText>
            <p className="font-serif text-btc-dim">
              Questions or suggestions?
            </p>
            <p className="font-mono text-btc-amber mt-2">
              btc51@proton.me
            </p>
          </RevealText>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 md:py-12 px-4 md:px-8 border-t border-btc-gray/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-mono text-[10px] md:text-xs text-btc-dim">
            Don&apos;t trust, verify.
          </p>
        </div>
      </footer>
    </main>
  )
}
