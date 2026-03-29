'use client'

import { useEffect, useState } from 'react'
import { Navigation } from '@/components/navigation'
import { ParticleBackground } from '@/components/particle-background'
import { RevealText } from '@/components/reveal-text'
import { useBitcoinData } from '@/hooks/use-bitcoin-data'

const POOL_COLORS = [
  '#00ff88', // green
  '#ffcc66', // amber
  '#ff6b6b', // red
  '#4ecdc4', // teal
  '#a855f7', // purple
  '#f97316', // orange
  '#3b82f6', // blue
  '#666666', // gray
]

export default function PoolsPage() {
  const { data, isLoading } = useBitcoinData()
  const [visiblePools, setVisiblePools] = useState<number[]>([])

  useEffect(() => {
    if (data?.miningPools) {
      data.miningPools.forEach((_, index) => {
        setTimeout(() => {
          setVisiblePools(prev => [...prev, index])
        }, index * 150)
      })
    }
  }, [data?.miningPools])

  // Filter out any pools with invalid percentage values
  const pools = (data?.miningPools || []).filter(p => typeof p.percentage === 'number' && p.percentage > 0)
  const topTwoPools = pools.slice(0, 2)
  const topTwoPercentage = topTwoPools.reduce((sum, p) => sum + (p.percentage ?? 0), 0)

  return (
    <main className="min-h-screen bg-btc-black text-btc-white overflow-x-hidden">
      <ParticleBackground />
      <Navigation />

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <RevealText as="h1" className="font-serif text-3xl sm:text-4xl md:text-6xl text-btc-white leading-relaxed">
            Who secures the network?
          </RevealText>
          
          <RevealText delay={300} className="mt-6">
            <p className="font-serif text-lg md:text-xl text-btc-dim">
              Mining pool distribution over the past week
            </p>
          </RevealText>

          {/* Warning indicator */}
          {topTwoPercentage > 50 && (
            <RevealText delay={500} className="mt-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-btc-amber/50 bg-btc-amber/10">
                <span className="w-2 h-2 rounded-full bg-btc-amber animate-pulse" />
                <span className="font-mono text-xs text-btc-amber">
                  Top 2 pools control {topTwoPercentage.toFixed(1)}% of hashrate
                </span>
              </div>
            </RevealText>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-btc-green to-transparent" />
        </div>
      </section>

      {/* Pool Distribution */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <RevealText className="mb-12 md:mb-16">
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white text-center">
              Hashrate Distribution
            </h2>
          </RevealText>

          {isLoading ? (
            <div className="text-center">
              <p className="font-mono text-sm text-btc-dim animate-pulse">Loading pool data...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pools.map((pool, index) => (
                <div
                  key={pool.name}
                  className={`
                    transition-all duration-700 ease-out
                    ${visiblePools.includes(index) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
                  `}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <span className="font-mono text-sm text-btc-white w-32 md:w-40 truncate">
                      {pool.name || 'Unknown'}
                    </span>
                    <span className="font-mono text-xs text-btc-dim ml-auto">
                      {(pool.percentage ?? 0).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-8 bg-btc-gray/30 relative overflow-hidden">
                    <div
                      className="h-full transition-all duration-1000 ease-out"
                      style={{
                        width: visiblePools.includes(index) ? `${pool.percentage ?? 0}%` : '0%',
                        backgroundColor: POOL_COLORS[index % POOL_COLORS.length],
                        transitionDelay: `${index * 100}ms`,
                      }}
                    />
                    {/* 51% marker */}
                    <div 
                      className="absolute top-0 bottom-0 w-px bg-red-500/50"
                      style={{ left: '51%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 51% line legend */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="w-4 h-px bg-red-500/50" />
            <span className="font-mono text-xs text-btc-dim">51% threshold</span>
          </div>
        </div>
      </section>

      {/* Decentralization Note */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24 border-t border-btc-gray/20">
        <div className="max-w-3xl mx-auto text-center">
          <RevealText>
            <h2 className="font-serif text-xl md:text-2xl text-btc-white mb-6">
              Decentralization Matters
            </h2>
          </RevealText>
          
          <RevealText delay={200}>
            <p className="font-serif text-btc-dim leading-relaxed mb-8">
              While pools aggregate hashrate from individual miners, no single entity 
              controls the miners within a pool. Miners can switch pools instantly, 
              providing a natural check against pool misbehavior.
            </p>
          </RevealText>

          <RevealText delay={400}>
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12">
              <div className="text-center">
                <p className="font-mono text-2xl md:text-3xl text-btc-green">
                  {pools.length}+
                </p>
                <p className="font-mono text-[10px] md:text-xs text-btc-dim mt-1">
                  Active Pools
                </p>
              </div>
              <div className="text-center">
                <p className="font-mono text-2xl md:text-3xl text-btc-amber">
                  1M+
                </p>
                <p className="font-mono text-[10px] md:text-xs text-btc-dim mt-1">
                  Individual Miners
                </p>
              </div>
              <div className="text-center">
                <p className="font-mono text-2xl md:text-3xl text-btc-white">
                  Global
                </p>
                <p className="font-mono text-[10px] md:text-xs text-btc-dim mt-1">
                  Distribution
                </p>
              </div>
            </div>
          </RevealText>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 md:py-12 px-4 md:px-8 border-t border-btc-gray/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-mono text-[10px] md:text-xs text-btc-dim">
            Data from mempool.space | Updates every 5 minutes
          </p>
        </div>
      </footer>
    </main>
  )
}
