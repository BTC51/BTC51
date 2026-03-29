'use client'

import { useEffect, useState } from 'react'
import { ParticleBackground } from '@/components/particle-background'
import { Navigation } from '@/components/navigation'
import { RevealText } from '@/components/reveal-text'
import { useBitcoinData } from '@/hooks/use-bitcoin-data'
import { HALVING_HISTORY } from '@/lib/types'

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDate).getTime()
      const now = Date.now()
      const diff = target - now

      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      }
    }

    setTimeLeft(calculateTime())
    const interval = setInterval(() => setTimeLeft(calculateTime()), 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className="font-mono text-lg sm:text-xl md:text-2xl text-btc-dim tracking-wider">
      <span className="text-btc-white">{String(timeLeft.days).padStart(3, '0')}</span>
      <span className="text-btc-dim">d </span>
      <span className="text-btc-white">{String(timeLeft.hours).padStart(2, '0')}</span>
      <span className="text-btc-dim">h </span>
      <span className="text-btc-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
      <span className="text-btc-dim">m </span>
      <span className="text-btc-green animate-flicker">{String(timeLeft.seconds).padStart(2, '0')}</span>
      <span className="text-btc-dim">s</span>
    </div>
  )
}

export default function HalvingPage() {
  const { data } = useBitcoinData()
  const [visibleYears, setVisibleYears] = useState<number[]>([])

  useEffect(() => {
    HALVING_HISTORY.forEach((_, index) => {
      setTimeout(() => {
        setVisibleYears(prev => [...prev, index])
      }, 1500 + index * 500)
    })
  }, [])

  const nextHalvingYear = data?.estimatedHalvingDate 
    ? new Date(data.estimatedHalvingDate).getFullYear()
    : 2028

  return (
    <main className="relative min-h-screen bg-btc-black">
      <ParticleBackground />
      <Navigation />
      
      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <RevealText>
            <p className="font-mono text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-btc-white animate-breathe">
              {nextHalvingYear}
            </p>
          </RevealText>
          
          <RevealText delay={500} className="mt-12">
            {data?.estimatedHalvingDate && (
              <CountdownTimer targetDate={data.estimatedHalvingDate} />
            )}
          </RevealText>

          <RevealText delay={1000} className="mt-16">
            <p className="font-mono text-xs tracking-[0.2em] text-btc-dim uppercase">
              Until the next halving
            </p>
          </RevealText>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-20 md:py-32">
        <RevealText className="mb-24 text-center">
          <p className="font-serif text-2xl md:text-4xl text-btc-white">
            Every four years, <span className="text-btc-amber">the system tightens.</span>
          </p>
        </RevealText>

        <div className="max-w-2xl mx-auto w-full">
          {HALVING_HISTORY.map((halving, index) => (
            <div
              key={halving.year}
              className={`
                py-6 md:py-8 transition-all duration-1000 ease-out
                ${visibleYears.includes(index) 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-8'
                }
              `}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
                <span className="font-mono text-3xl md:text-5xl text-btc-white sm:w-24">
                  {halving.year}
                </span>
                <div className="flex-1">
                  <p className="font-serif text-base md:text-lg text-btc-dim">
                    {halving.event}
                  </p>
                  <p className="font-mono text-xs md:text-sm text-btc-green mt-1">
                    {halving.reward} BTC / block
                  </p>
                  <p className="font-serif text-[10px] md:text-xs text-btc-dim/60 mt-1 italic">
                    {halving.note}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Block Info */}
      <section className="relative z-10 min-h-[60vh] flex flex-col items-center justify-center px-4 md:px-8 py-20 md:py-32">
        <RevealText className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-btc-dim uppercase mb-3 md:mb-4">
            Current Block Height
          </p>
          <p className="font-mono text-3xl md:text-6xl text-btc-white mb-6 md:mb-8">
            {data?.blockHeight.toLocaleString() || '---'}
          </p>
          
          <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-btc-dim uppercase mb-3 md:mb-4 mt-8 md:mt-12">
            Blocks Until Halving
          </p>
          <p className="font-mono text-3xl md:text-6xl text-btc-amber">
            {data?.blocksUntilHalving.toLocaleString() || '---'}
          </p>
        </RevealText>
      </section>

      {/* Quote */}
      <section className="relative z-10 min-h-[40vh] flex items-center justify-center px-4 md:px-8 py-20 md:py-32">
        <RevealText className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-lg md:text-3xl text-btc-dim leading-relaxed italic">
            &ldquo;The supply is finite. The demand is infinite.&rdquo;
          </p>
        </RevealText>
      </section>
    </main>
  )
}
