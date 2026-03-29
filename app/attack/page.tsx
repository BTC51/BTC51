'use client'

import { ParticleBackground } from '@/components/particle-background'
import { Navigation } from '@/components/navigation'
import { AnimatedNumber } from '@/components/animated-number'
import { RevealText } from '@/components/reveal-text'
import { useBitcoinData } from '@/hooks/use-bitcoin-data'

export default function AttackPage() {
  const { data, isLoading } = useBitcoinData()

  return (
    <main className="relative min-h-screen bg-btc-black">
      <ParticleBackground />
      <Navigation />
      
      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <RevealText as="h1" className="font-serif text-4xl md:text-6xl text-btc-white leading-relaxed">
            To control the network,
            <br />
            <span className="text-btc-dim">you must outpower it.</span>
          </RevealText>
        </div>
      </section>

      {/* Attack Cost Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <RevealText className="mb-24 text-center">
            <p className="font-mono text-xs tracking-[0.3em] text-btc-dim uppercase mb-4">
              Total Network Hashrate
            </p>
            <p className="font-mono text-4xl md:text-6xl text-btc-white animate-breathe">
              {isLoading ? '...' : `${data?.hashrate.toFixed(0)} EH/s`}
            </p>
          </RevealText>

          <div className="space-y-12 md:space-y-16">
            <RevealText delay={200}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between border-b border-btc-gray/30 pb-4 gap-2">
                <span className="font-serif text-lg md:text-xl text-btc-dim">
                  Attack cost per hour
                </span>
                <span className="font-mono text-xl md:text-3xl text-btc-green text-glow-green">
                  {data ? (
                    <AnimatedNumber value={data.attackCost.hourly} prefix="$" delay={400} />
                  ) : '...'}
                </span>
              </div>
            </RevealText>

            <RevealText delay={400}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between border-b border-btc-gray/30 pb-4 gap-2">
                <span className="font-serif text-lg md:text-xl text-btc-dim">
                  Attack cost per day
                </span>
                <span className="font-mono text-xl md:text-3xl text-btc-green text-glow-green">
                  {data ? (
                    <AnimatedNumber value={data.attackCost.daily} prefix="$" delay={600} />
                  ) : '...'}
                </span>
              </div>
            </RevealText>

            <RevealText delay={600}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between border-b border-btc-gray/30 pb-4 gap-2">
                <span className="font-serif text-lg md:text-xl text-btc-dim">
                  Attack cost per week
                </span>
                <span className="font-mono text-xl md:text-3xl text-btc-amber text-glow-amber">
                  {data ? (
                    <AnimatedNumber value={data.attackCost.weekly} prefix="$" delay={800} />
                  ) : '...'}
                </span>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-20 md:py-32">
        <div className="max-w-3xl mx-auto">
          <RevealText className="mb-24 text-center">
            <h2 className="font-serif text-3xl md:text-5xl text-btc-white">
              What would it take?
            </h2>
          </RevealText>

          <div className="space-y-8 md:space-y-12">
            <RevealText delay={200}>
              <div className="py-6 md:py-8">
                <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-btc-dim uppercase mb-3">
                  ASIC Miners Required
                </p>
                <p className="font-mono text-3xl md:text-5xl text-btc-white">
                  {data ? (
                    <AnimatedNumber value={data.attackCost.asicsRequired} delay={400} />
                  ) : '...'}
                </p>
                <p className="font-serif text-xs md:text-sm text-btc-dim mt-2">
                  Antminer S21 Pro units at 234 TH/s each
                </p>
              </div>
            </RevealText>

            <RevealText delay={400}>
              <div className="py-6 md:py-8">
                <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-btc-dim uppercase mb-3">
                  Hardware Cost
                </p>
                <p className="font-mono text-3xl md:text-5xl text-btc-white">
                  {data ? (
                    <AnimatedNumber 
                      value={data.attackCost.asicsRequired * 5000} 
                      prefix="$" 
                      delay={600}
                    />
                  ) : '...'}
                </p>
                <p className="font-serif text-xs md:text-sm text-btc-dim mt-2">
                  At approximately $5,000 per unit
                </p>
              </div>
            </RevealText>

            <RevealText delay={600}>
              <div className="py-6 md:py-8">
                <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-btc-dim uppercase mb-3">
                  Electricity Cost Per Hour
                </p>
                <p className="font-mono text-3xl md:text-5xl text-btc-amber">
                  {data ? (
                    <AnimatedNumber 
                      value={data.attackCost.electricityCostPerHour} 
                      prefix="$" 
                      delay={800}
                    />
                  ) : '...'}
                </p>
                <p className="font-serif text-xs md:text-sm text-btc-dim mt-2">
                  At industrial rate of $0.05/kWh
                </p>
              </div>
            </RevealText>

            <RevealText delay={800}>
              <div className="py-6 md:py-8">
                <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-btc-dim uppercase mb-3">
                  Time to Acquire Hardware
                </p>
                <p className="font-mono text-3xl md:text-5xl text-btc-green">
                  {data ? `${data.attackCost.timeToAcquireHardware}+ months` : '...'}
                </p>
                <p className="font-serif text-xs md:text-sm text-btc-dim mt-2">
                  Global ASIC production constraints
                </p>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="relative z-10 min-h-[60vh] flex items-center justify-center px-4 md:px-8 py-20 md:py-32">
        <RevealText className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-2xl md:text-4xl text-btc-dim leading-relaxed">
            Even with unlimited resources,
            <br />
            <span className="text-btc-white">time itself becomes the barrier.</span>
          </p>
        </RevealText>
      </section>
    </main>
  )
}
