'use client'

import { useEffect, useState } from 'react'
import { ParticleBackground } from '@/components/particle-background'
import { Navigation } from '@/components/navigation'
import { RevealText } from '@/components/reveal-text'
import { HARDWARE_EVOLUTION } from '@/lib/types'

export default function HardwarePage() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])

  useEffect(() => {
    HARDWARE_EVOLUTION.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index])
      }, 2000 + index * 800)
    })
  }, [])

  return (
    <main className="relative min-h-screen bg-btc-black">
      <ParticleBackground />
      <Navigation />
      
      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <RevealText as="h1" className="font-serif text-3xl sm:text-4xl md:text-6xl text-btc-white leading-relaxed">
            Proof of Work evolved.
          </RevealText>
          
          <RevealText delay={500} className="mt-6 md:mt-8">
            <p className="font-serif text-lg md:text-xl text-btc-dim">
              From bedroom hobbyists to industrial operations.
            </p>
          </RevealText>
        </div>
      </section>

      {/* Hardware Evolution */}
      <section className="relative z-10 py-20 md:py-32 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {HARDWARE_EVOLUTION.map((hardware, index) => (
            <div
              key={hardware.era}
              className={`
                py-10 md:py-24 transition-all duration-1000 ease-out
                ${visibleItems.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
                }
              `}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-16">
                {/* Era Badge */}
                <div className="md:w-32 flex-shrink-0">
                  <span className="font-mono text-4xl md:text-6xl text-btc-green text-glow-green">
                    {hardware.era}
                  </span>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-serif text-xl md:text-3xl text-btc-white mb-3 md:mb-4">
                    {hardware.name}
                  </h3>
                  
                  <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                    <div className="flex items-baseline gap-3 md:gap-4">
                      <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-btc-dim uppercase w-20 md:w-24">
                        Years
                      </span>
                      <span className="font-mono text-sm md:text-base text-btc-white">
                        {hardware.years}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-3 md:gap-4">
                      <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-btc-dim uppercase w-20 md:w-24">
                        Hashrate
                      </span>
                      <span className="font-mono text-sm md:text-base text-btc-amber">
                        {hardware.hashrate}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-3 md:gap-4">
                      <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-btc-dim uppercase w-20 md:w-24">
                        Efficiency
                      </span>
                      <span className="font-mono text-sm md:text-base text-btc-white">
                        {hardware.efficiency}
                      </span>
                    </div>
                  </div>
                  
                  <p className="font-serif text-sm md:text-base text-btc-dim leading-relaxed max-w-lg">
                    {hardware.description}
                  </p>
                </div>
              </div>
              
              {/* Divider */}
              {index < HARDWARE_EVOLUTION.length - 1 && (
                <div className="mt-10 md:mt-24 border-b border-btc-gray/20" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Current State */}
      <section className="relative z-10 min-h-[60vh] flex flex-col items-center justify-center px-4 md:px-8 py-20 md:py-32">
        <RevealText className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-btc-dim uppercase mb-4 md:mb-6">
            Modern ASIC Specifications
          </p>
          
          <div className="grid grid-cols-3 gap-4 md:gap-12 mt-8 md:mt-12">
            <div>
              <p className="font-mono text-lg sm:text-2xl md:text-4xl text-btc-white mb-1 md:mb-2">
                234 TH/s
              </p>
              <p className="font-serif text-[10px] md:text-sm text-btc-dim">
                Hashrate
              </p>
            </div>
            <div>
              <p className="font-mono text-lg sm:text-2xl md:text-4xl text-btc-amber mb-1 md:mb-2">
                15 J/TH
              </p>
              <p className="font-serif text-[10px] md:text-sm text-btc-dim">
                Efficiency
              </p>
            </div>
            <div>
              <p className="font-mono text-lg sm:text-2xl md:text-4xl text-btc-green mb-1 md:mb-2">
                3,510 W
              </p>
              <p className="font-serif text-[10px] md:text-sm text-btc-dim">
                Power
              </p>
            </div>
          </div>
          
          <p className="font-serif text-xs md:text-sm text-btc-dim mt-6 md:mt-8">
            Antminer S21 Pro (2024)
          </p>
        </RevealText>
      </section>

      {/* Closing */}
      <section className="relative z-10 min-h-[50vh] flex items-center justify-center px-4 md:px-8 py-20 md:py-32">
        <RevealText className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-xl md:text-4xl text-btc-dim leading-relaxed">
            The arms race continues.
            <br />
            <span className="text-btc-white">Efficiency improves. Security deepens.</span>
          </p>
        </RevealText>
      </section>
    </main>
  )
}
