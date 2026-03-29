'use client'

import { useEffect, useState } from 'react'
import { Navigation } from '@/components/navigation'
import { ParticleBackground } from '@/components/particle-background'
import { RevealText } from '@/components/reveal-text'

const TIMELINE_EVENTS = [
  { year: 2008, month: 'Oct 31', event: 'Whitepaper Published', description: 'Satoshi Nakamoto publishes "Bitcoin: A Peer-to-Peer Electronic Cash System"', type: 'milestone' },
  { year: 2009, month: 'Jan 3', event: 'Genesis Block', description: 'The first Bitcoin block is mined with the famous Times headline', type: 'milestone' },
  { year: 2009, month: 'Jan 12', event: 'First Transaction', description: 'Satoshi sends 10 BTC to Hal Finney — the first Bitcoin transaction', type: 'tech' },
  { year: 2010, month: 'May 22', event: 'Bitcoin Pizza Day', description: 'Laszlo Hanyecz buys 2 pizzas for 10,000 BTC (~$41 at the time)', type: 'culture' },
  { year: 2010, month: 'Jul', event: 'Mt. Gox Launches', description: 'The first major Bitcoin exchange begins operations in Japan', type: 'market' },
  { year: 2011, month: 'Feb', event: 'Parity with USD', description: 'Bitcoin reaches $1 for the first time', type: 'price' },
  { year: 2011, month: 'Apr', event: 'Satoshi Disappears', description: 'Satoshi Nakamoto sends final email and vanishes from public view', type: 'milestone' },
  { year: 2012, month: 'Nov 28', event: 'First Halving', description: 'Block reward drops from 50 to 25 BTC', type: 'halving' },
  { year: 2013, month: 'Nov', event: 'Price Hits $1,000', description: 'Bitcoin surpasses $1,000 for the first time', type: 'price' },
  { year: 2014, month: 'Feb', event: 'Mt. Gox Collapse', description: 'Largest exchange declares bankruptcy after 850,000 BTC hack', type: 'crisis' },
  { year: 2016, month: 'Jul 9', event: 'Second Halving', description: 'Block reward drops from 25 to 12.5 BTC', type: 'halving' },
  { year: 2017, month: 'Aug', event: 'SegWit Activates', description: 'Segregated Witness upgrade increases capacity and enables Lightning', type: 'tech' },
  { year: 2017, month: 'Dec', event: 'All-Time High $19,783', description: 'Bitcoin reaches peak of 2017 bull run', type: 'price' },
  { year: 2018, month: '', event: 'Crypto Winter', description: 'Bitcoin drops 84% from peak. Building continues quietly.', type: 'crisis' },
  { year: 2020, month: 'May 11', event: 'Third Halving', description: 'Block reward drops from 12.5 to 6.25 BTC', type: 'halving' },
  { year: 2020, month: 'Aug', event: 'MicroStrategy Buys BTC', description: 'First public company to put Bitcoin on balance sheet', type: 'adoption' },
  { year: 2021, month: 'Feb', event: 'Tesla Buys $1.5B BTC', description: 'Elon Musk announces Tesla Bitcoin purchase', type: 'adoption' },
  { year: 2021, month: 'Sep 7', event: 'El Salvador Legal Tender', description: 'First country to adopt Bitcoin as legal tender', type: 'adoption' },
  { year: 2021, month: 'Nov', event: 'All-Time High $69,000', description: 'Bitcoin reaches peak of 2021 bull run', type: 'price' },
  { year: 2024, month: 'Jan 10', event: 'Spot ETF Approved', description: 'SEC approves first Bitcoin spot ETFs in the United States', type: 'adoption' },
  { year: 2024, month: 'Apr 20', event: 'Fourth Halving', description: 'Block reward drops from 6.25 to 3.125 BTC', type: 'halving' },
]

const TYPE_COLORS: Record<string, string> = {
  milestone: 'btc-green',
  halving: 'btc-amber',
  price: 'btc-white',
  tech: 'cyan-400',
  adoption: 'purple-400',
  crisis: 'red-400',
  culture: 'pink-400',
  market: 'blue-400',
}

export default function TimelinePage() {
  const [visibleEvents, setVisibleEvents] = useState<number[]>([])

  useEffect(() => {
    TIMELINE_EVENTS.forEach((_, index) => {
      setTimeout(() => {
        setVisibleEvents(prev => [...prev, index])
      }, index * 150)
    })
  }, [])

  return (
    <main className="min-h-screen bg-btc-black text-btc-white overflow-x-hidden">
      <ParticleBackground />
      <Navigation />

      {/* Hero */}
      <section className="relative z-10 min-h-[50vh] flex flex-col items-center justify-center px-4 md:px-8 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <RevealText as="h1" className="font-serif text-3xl sm:text-4xl md:text-6xl text-btc-white leading-relaxed">
            Bitcoin Timeline
          </RevealText>
          
          <RevealText delay={300} className="mt-6">
            <p className="font-serif text-lg md:text-xl text-btc-dim">
              15 years of monetary revolution
            </p>
          </RevealText>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative z-10 px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-3xl mx-auto relative">
          {/* Center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-btc-gray/30 md:-translate-x-px" />

          {TIMELINE_EVENTS.map((event, index) => {
            const isLeft = index % 2 === 0
            const color = TYPE_COLORS[event.type] || 'btc-dim'
            
            return (
              <div
                key={index}
                className={`
                  relative mb-8 md:mb-12 pl-12 md:pl-0
                  transition-all duration-700 ease-out
                  ${visibleEvents.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  ${isLeft ? 'md:pr-[52%]' : 'md:pl-[52%]'}
                `}
              >
                {/* Dot */}
                <div 
                  className={`
                    absolute left-3 md:left-1/2 w-3 h-3 rounded-full
                    md:-translate-x-1.5 border-2 border-${color} bg-btc-black
                  `}
                  style={{ top: '0.5rem', borderColor: `var(--color-${color}, #666)` }}
                />

                {/* Content */}
                <div className={`border border-btc-gray/30 p-4 md:p-6 hover:border-${color}/50 transition-colors`}>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-mono text-lg md:text-xl text-btc-white">
                      {event.year}
                    </span>
                    {event.month && (
                      <span className="font-mono text-xs text-btc-dim">
                        {event.month}
                      </span>
                    )}
                  </div>
                  <h3 className={`font-mono text-sm uppercase tracking-wider mb-2`} style={{ color: `var(--color-${color}, #666)` }}>
                    {event.event}
                  </h3>
                  <p className="font-serif text-sm text-btc-dim">
                    {event.description}
                  </p>
                </div>
              </div>
            )
          })}

          {/* Future */}
          <div className="relative pl-12 md:pl-0 md:pr-[52%]">
            <div className="absolute left-3 md:left-1/2 w-3 h-3 rounded-full md:-translate-x-1.5 border-2 border-btc-green bg-btc-black animate-pulse" style={{ top: '0.5rem' }} />
            <div className="border border-btc-green/30 p-4 md:p-6 border-dashed">
              <span className="font-mono text-lg md:text-xl text-btc-green">2028</span>
              <h3 className="font-mono text-sm text-btc-green uppercase tracking-wider my-2">
                Fifth Halving
              </h3>
              <p className="font-serif text-sm text-btc-dim">
                Block reward will drop to 1.5625 BTC. The scarcity intensifies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legend */}
      <section className="relative z-10 px-4 md:px-8 py-12 border-t border-btc-gray/20">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs text-btc-dim uppercase tracking-wider mb-4 text-center">Event Types</p>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(TYPE_COLORS).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `var(--color-${color}, #666)` }} />
                <span className="font-mono text-[10px] text-btc-dim uppercase">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 md:py-12 px-4 md:px-8 border-t border-btc-gray/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-mono text-[10px] md:text-xs text-btc-dim">
            The future is unwritten.
          </p>
        </div>
      </footer>
    </main>
  )
}
