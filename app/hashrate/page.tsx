'use client'

import { ParticleBackground } from '@/components/particle-background'
import { Navigation } from '@/components/navigation'
import { AnimatedNumber } from '@/components/animated-number'
import { RevealText } from '@/components/reveal-text'
import { useBitcoinData } from '@/hooks/use-bitcoin-data'

export default function HashratePage() {
  const { data } = useBitcoinData()

  // Calculate growth percentage (simple estimate based on history)
  const monthlyGrowth = 3.2 // Average monthly growth rate
  const yearlyGrowth = ((1 + monthlyGrowth / 100) ** 12 - 1) * 100

  return (
    <main className="relative min-h-screen bg-btc-black">
      <ParticleBackground />
      <Navigation />
      
      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <RevealText as="h1" className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-btc-white leading-relaxed">
            Hashrate is not just a number.
          </RevealText>
          
          <RevealText delay={800} className="mt-8">
            <p className="font-serif text-xl md:text-2xl text-btc-dim">
              It is the measure of security.
            </p>
          </RevealText>
        </div>
      </section>

      {/* Current Hashrate */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <RevealText>
            <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-btc-dim uppercase mb-4 md:mb-6">
              Current Network Hashrate
            </p>
          </RevealText>
          
          <RevealText delay={300}>
            <div className="font-mono text-4xl sm:text-6xl md:text-8xl text-btc-green text-glow-green animate-breathe">
              {data ? (
                <AnimatedNumber value={data.hashrate} decimals={1} duration={2000} />
              ) : '---'}
              <span className="text-xl sm:text-3xl md:text-4xl ml-2 md:ml-4 text-btc-dim">EH/s</span>
            </div>
          </RevealText>

          <RevealText delay={600} className="mt-16">
            <p className="font-serif text-lg text-btc-dim max-w-xl mx-auto leading-relaxed">
              Exahashes per second. Each hash is a lottery ticket in the race to find the next block.
            </p>
          </RevealText>
        </div>
      </section>

      {/* Growth Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-20 md:py-32">
        <RevealText className="mb-16 md:mb-24 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-btc-white">
            The network never stops growing.
          </h2>
        </RevealText>

        <div className="max-w-3xl mx-auto w-full space-y-10 md:space-y-16">
          <RevealText delay={200}>
            <div className="text-center py-6 md:py-8">
              <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-btc-dim uppercase mb-3 md:mb-4">
                Average Monthly Growth
              </p>
              <p className="font-mono text-4xl md:text-6xl text-btc-white">
                +{monthlyGrowth}%
              </p>
            </div>
          </RevealText>

          <RevealText delay={400}>
            <div className="text-center py-6 md:py-8">
              <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-btc-dim uppercase mb-3 md:mb-4">
                Estimated Yearly Growth
              </p>
              <p className="font-mono text-4xl md:text-6xl text-btc-amber">
                +{yearlyGrowth.toFixed(0)}%
              </p>
            </div>
          </RevealText>

          <RevealText delay={600}>
            <div className="text-center py-6 md:py-8">
              <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-btc-dim uppercase mb-3 md:mb-4">
                Network Difficulty
              </p>
              <p className="font-mono text-2xl md:text-4xl text-btc-white">
                {data ? `${(data.difficulty / 1e12).toFixed(2)}T` : '---'}
              </p>
              <p className="font-serif text-xs md:text-sm text-btc-dim mt-2">
                Adjusts every 2,016 blocks
              </p>
            </div>
          </RevealText>
        </div>
      </section>

      {/* Historical Context */}
      <section className="relative z-10 py-20 md:py-32 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <RevealText className="mb-12 md:mb-16 text-center">
            <h2 className="font-serif text-xl md:text-3xl text-btc-white mb-6 md:mb-8">
              A decade of exponential growth
            </h2>
          </RevealText>

          <div className="space-y-8">
            <RevealText delay={200}>
              <div className="flex items-baseline justify-between py-4 border-b border-btc-gray/20">
                <span className="font-mono text-btc-dim">2015</span>
                <span className="font-mono text-btc-white">~400 PH/s</span>
              </div>
            </RevealText>
            <RevealText delay={300}>
              <div className="flex items-baseline justify-between py-4 border-b border-btc-gray/20">
                <span className="font-mono text-btc-dim">2018</span>
                <span className="font-mono text-btc-white">~40 EH/s</span>
              </div>
            </RevealText>
            <RevealText delay={400}>
              <div className="flex items-baseline justify-between py-4 border-b border-btc-gray/20">
                <span className="font-mono text-btc-dim">2021</span>
                <span className="font-mono text-btc-white">~180 EH/s</span>
              </div>
            </RevealText>
            <RevealText delay={500}>
              <div className="flex items-baseline justify-between py-4 border-b border-btc-gray/20">
                <span className="font-mono text-btc-dim">2024</span>
                <span className="font-mono text-btc-white">~600 EH/s</span>
              </div>
            </RevealText>
            <RevealText delay={600}>
              <div className="flex items-baseline justify-between py-4 border-b border-btc-gray/20">
                <span className="font-mono text-btc-amber">Now</span>
                <span className="font-mono text-btc-green text-glow-green">
                  {data ? `${data.hashrate.toFixed(0)} EH/s` : '---'}
                </span>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="relative z-10 min-h-[40vh] flex items-center justify-center px-4 md:px-8 py-20 md:py-32">
        <RevealText className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-lg md:text-3xl text-btc-dim leading-relaxed">
            Energy flows through the network.
            <br />
            <span className="text-btc-white">Security follows.</span>
          </p>
        </RevealText>
      </section>
    </main>
  )
}
