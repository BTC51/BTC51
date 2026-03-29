'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { ParticleBackground } from '@/components/particle-background'
import { RevealText } from '@/components/reveal-text'

const MINING_STEPS = [
  {
    step: 1,
    title: 'Collect Transactions',
    description: 'Miners gather unconfirmed transactions from the mempool into a candidate block.',
  },
  {
    step: 2,
    title: 'Build the Block Header',
    description: 'Combine the previous block hash, merkle root of transactions, timestamp, difficulty target, and a random nonce.',
  },
  {
    step: 3,
    title: 'Hash the Header',
    description: 'Apply SHA-256 twice to the block header. This produces a 256-bit hash.',
  },
  {
    step: 4,
    title: 'Check the Result',
    description: 'If the hash is below the difficulty target (starts with enough zeros), the block is valid. If not, change the nonce and try again.',
  },
  {
    step: 5,
    title: 'Broadcast the Block',
    description: 'The winning miner broadcasts the new block. Other nodes verify and add it to their chain. The miner receives the block reward.',
  },
]

function HashAnimation() {
  const [hash, setHash] = useState('0000000000000000000')
  const [isValid, setIsValid] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      const chars = '0123456789abcdef'
      let newHash = ''
      const leadingZeros = Math.random() > 0.95 ? 19 : Math.floor(Math.random() * 4)
      
      for (let i = 0; i < leadingZeros; i++) {
        newHash += '0'
      }
      for (let i = leadingZeros; i < 19; i++) {
        newHash += chars[Math.floor(Math.random() * 16)]
      }
      newHash += '...'
      
      setHash(newHash)
      setIsValid(leadingZeros >= 19)
    }, 100)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="font-mono text-sm md:text-base">
      <span className={isValid ? 'text-btc-green text-glow-green' : 'text-btc-dim'}>
        {hash}
      </span>
    </div>
  )
}

export default function MiningPage() {
  return (
    <main className="min-h-screen bg-btc-black text-btc-white overflow-x-hidden">
      <ParticleBackground />
      <Navigation />

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <RevealText as="h1" className="font-serif text-3xl sm:text-4xl md:text-6xl text-btc-white leading-relaxed">
            How Mining Works
          </RevealText>
          
          <RevealText delay={300} className="mt-6">
            <p className="font-serif text-lg md:text-xl text-btc-dim max-w-2xl mx-auto">
              Proof of Work: Converting electricity into unforgeable security
            </p>
          </RevealText>

          {/* Live hash visualization */}
          <RevealText delay={500} className="mt-12">
            <div className="border border-btc-gray/30 p-6 max-w-lg mx-auto">
              <p className="font-mono text-[10px] text-btc-dim uppercase tracking-wider mb-3">
                Live Hash Attempts (Simulated)
              </p>
              <HashAnimation />
              <p className="font-mono text-[10px] text-btc-dim mt-3">
                Looking for a hash starting with many zeros...
              </p>
            </div>
          </RevealText>
        </div>
      </section>

      {/* What is Mining */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <RevealText>
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white mb-8">
              What is Mining?
            </h2>
          </RevealText>

          <RevealText delay={200}>
            <p className="font-serif text-lg text-btc-dim leading-relaxed mb-6">
              Mining is the process of adding new blocks to the Bitcoin blockchain. 
              It serves three critical functions:
            </p>
          </RevealText>

          <div className="space-y-6 mt-8">
            <RevealText delay={300}>
              <div className="flex gap-4">
                <span className="font-mono text-btc-green text-2xl">1</span>
                <div>
                  <h3 className="font-mono text-sm text-btc-white uppercase mb-1">Transaction Processing</h3>
                  <p className="font-serif text-btc-dim">Miners include transactions in blocks, confirming them on the blockchain.</p>
                </div>
              </div>
            </RevealText>

            <RevealText delay={400}>
              <div className="flex gap-4">
                <span className="font-mono text-btc-amber text-2xl">2</span>
                <div>
                  <h3 className="font-mono text-sm text-btc-white uppercase mb-1">New Bitcoin Issuance</h3>
                  <p className="font-serif text-btc-dim">The block reward creates new bitcoin and distributes it to miners.</p>
                </div>
              </div>
            </RevealText>

            <RevealText delay={500}>
              <div className="flex gap-4">
                <span className="font-mono text-btc-white text-2xl">3</span>
                <div>
                  <h3 className="font-mono text-sm text-btc-white uppercase mb-1">Network Security</h3>
                  <p className="font-serif text-btc-dim">The energy spent mining makes it prohibitively expensive to attack the network.</p>
                </div>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* Step by Step */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24 border-t border-btc-gray/20">
        <div className="max-w-3xl mx-auto">
          <RevealText className="mb-12 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white">
              The Mining Process
            </h2>
          </RevealText>

          <div className="space-y-8">
            {MINING_STEPS.map((item, index) => (
              <RevealText key={item.step} delay={index * 100}>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 border border-btc-green flex items-center justify-center">
                    <span className="font-mono text-lg text-btc-green">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-mono text-sm text-btc-white uppercase tracking-wider mb-2">
                      {item.title}
                    </h3>
                    <p className="font-serif text-btc-dim">
                      {item.description}
                    </p>
                  </div>
                </div>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* Difficulty Adjustment */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24 border-t border-btc-gray/20">
        <div className="max-w-3xl mx-auto">
          <RevealText className="mb-8 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white">
              Difficulty Adjustment
            </h2>
          </RevealText>

          <RevealText delay={200}>
            <div className="border border-btc-gray/30 p-6 md:p-8">
              <p className="font-serif text-btc-dim leading-relaxed mb-6">
                Every 2,016 blocks (~2 weeks), Bitcoin automatically adjusts the 
                difficulty target to maintain a 10-minute average block time.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-4 border border-btc-gray/20">
                  <p className="font-mono text-xs text-btc-dim uppercase mb-2">Target Block Time</p>
                  <p className="font-mono text-2xl text-btc-green">10 min</p>
                </div>
                <div className="text-center p-4 border border-btc-gray/20">
                  <p className="font-mono text-xs text-btc-dim uppercase mb-2">Adjustment Period</p>
                  <p className="font-mono text-2xl text-btc-amber">2,016 blocks</p>
                </div>
              </div>

              <p className="font-serif text-sm text-btc-dim mt-6">
                If blocks are found too quickly, difficulty increases. 
                If too slowly, difficulty decreases. This ensures consistent 
                block production regardless of how much hashpower joins or leaves.
              </p>
            </div>
          </RevealText>
        </div>
      </section>

      {/* Why Proof of Work */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24 border-t border-btc-gray/20">
        <div className="max-w-3xl mx-auto text-center">
          <RevealText>
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white mb-8">
              Why Proof of Work?
            </h2>
          </RevealText>

          <RevealText delay={200}>
            <p className="font-serif text-lg text-btc-dim leading-relaxed mb-8">
              Proof of Work is the only known mechanism that provides:
            </p>
          </RevealText>

          <div className="grid md:grid-cols-3 gap-6">
            <RevealText delay={300}>
              <div className="p-6 border border-btc-gray/20">
                <p className="font-mono text-sm text-btc-green uppercase mb-2">Unforgeable Costliness</p>
                <p className="font-serif text-sm text-btc-dim">Real energy expenditure that cannot be faked or recycled</p>
              </div>
            </RevealText>

            <RevealText delay={400}>
              <div className="p-6 border border-btc-gray/20">
                <p className="font-mono text-sm text-btc-amber uppercase mb-2">Easy Verification</p>
                <p className="font-serif text-sm text-btc-dim">Anyone can verify a proof instantly without trusting the miner</p>
              </div>
            </RevealText>

            <RevealText delay={500}>
              <div className="p-6 border border-btc-gray/20">
                <p className="font-mono text-sm text-btc-white uppercase mb-2">Decentralization</p>
                <p className="font-serif text-sm text-btc-dim">No permission needed to start mining and earning rewards</p>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 md:py-12 px-4 md:px-8 border-t border-btc-gray/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-mono text-[10px] md:text-xs text-btc-dim">
            Proof of Work secures over $1 trillion in value
          </p>
        </div>
      </footer>
    </main>
  )
}
