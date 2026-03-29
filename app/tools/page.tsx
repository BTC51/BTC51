'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { ParticleBackground } from '@/components/particle-background'
import { RevealText } from '@/components/reveal-text'
import { useBitcoinData } from '@/hooks/use-bitcoin-data'

export default function ToolsPage() {
  const { data } = useBitcoinData()
  const btcPrice = data?.price || 67500
  const mempool = data?.mempool || {
    txCount: 50000,
    vsize: 100000000,
    feeRates: { fastest: 50, halfHour: 40, hour: 30, economy: 10 },
  }

  // Unit Converter State
  const [btcAmount, setBtcAmount] = useState<string>('1')
  const [satsAmount, setSatsAmount] = useState<string>('100000000')
  const [usdAmount, setUsdAmount] = useState<string>(btcPrice.toString())
  const [activeInput, setActiveInput] = useState<'btc' | 'sats' | 'usd'>('btc')

  // Update conversions when price changes
  useEffect(() => {
    if (activeInput === 'btc') {
      const btc = parseFloat(btcAmount) || 0
      setSatsAmount(Math.round(btc * 100000000).toString())
      setUsdAmount((btc * btcPrice).toFixed(2))
    }
  }, [btcPrice, btcAmount, activeInput])

  const handleBtcChange = (value: string) => {
    setActiveInput('btc')
    setBtcAmount(value)
    const btc = parseFloat(value) || 0
    setSatsAmount(Math.round(btc * 100000000).toString())
    setUsdAmount((btc * btcPrice).toFixed(2))
  }

  const handleSatsChange = (value: string) => {
    setActiveInput('sats')
    setSatsAmount(value)
    const sats = parseFloat(value) || 0
    const btc = sats / 100000000
    setBtcAmount(btc.toString())
    setUsdAmount((btc * btcPrice).toFixed(2))
  }

  const handleUsdChange = (value: string) => {
    setActiveInput('usd')
    setUsdAmount(value)
    const usd = parseFloat(value) || 0
    const btc = usd / btcPrice
    setBtcAmount(btc.toFixed(8))
    setSatsAmount(Math.round(btc * 100000000).toString())
  }

  // Fee calculation
  const calculateFee = (satPerVbyte: number, txSize: number = 140) => {
    return (satPerVbyte * txSize) / 100000000 * btcPrice
  }

  const mempoolPercentage = Math.min((mempool.vsize / 300000000) * 100, 100)

  return (
    <main className="min-h-screen bg-btc-black text-btc-white overflow-x-hidden">
      <ParticleBackground />
      <Navigation />

      {/* Hero */}
      <section className="relative z-10 min-h-[50vh] flex flex-col items-center justify-center px-4 md:px-8 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <RevealText as="h1" className="font-serif text-3xl sm:text-4xl md:text-5xl text-btc-white">
            Bitcoin Tools
          </RevealText>
          
          <RevealText delay={200} className="mt-4">
            <p className="font-serif text-lg text-btc-dim">
              Unit converter and fee estimator
            </p>
          </RevealText>
        </div>
      </section>

      {/* Unit Converter */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-xl mx-auto">
          <RevealText className="mb-8 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white">
              Unit Converter
            </h2>
            <p className="font-mono text-xs text-btc-dim mt-2">
              1 BTC = 100,000,000 sats
            </p>
          </RevealText>

          <div className="space-y-6">
            {/* BTC Input */}
            <div>
              <label className="font-mono text-xs text-btc-dim uppercase tracking-wider block mb-2">
                Bitcoin (BTC)
              </label>
              <input
                type="number"
                value={btcAmount}
                onChange={(e) => handleBtcChange(e.target.value)}
                className="w-full bg-btc-gray/30 border border-btc-gray/50 px-4 py-3 font-mono text-lg text-btc-amber focus:border-btc-amber focus:outline-none transition-colors"
                placeholder="0.00000000"
                step="0.00000001"
              />
            </div>

            {/* Sats Input */}
            <div>
              <label className="font-mono text-xs text-btc-dim uppercase tracking-wider block mb-2">
                Satoshis (sats)
              </label>
              <input
                type="number"
                value={satsAmount}
                onChange={(e) => handleSatsChange(e.target.value)}
                className="w-full bg-btc-gray/30 border border-btc-gray/50 px-4 py-3 font-mono text-lg text-btc-green focus:border-btc-green focus:outline-none transition-colors"
                placeholder="0"
                step="1"
              />
            </div>

            {/* USD Input */}
            <div>
              <label className="font-mono text-xs text-btc-dim uppercase tracking-wider block mb-2">
                US Dollars (USD)
              </label>
              <input
                type="number"
                value={usdAmount}
                onChange={(e) => handleUsdChange(e.target.value)}
                className="w-full bg-btc-gray/30 border border-btc-gray/50 px-4 py-3 font-mono text-lg text-btc-white focus:border-btc-white focus:outline-none transition-colors"
                placeholder="0.00"
                step="0.01"
              />
            </div>

            <p className="font-mono text-xs text-btc-dim text-center">
              Current rate: ${btcPrice.toLocaleString()} / BTC
            </p>
          </div>
        </div>
      </section>

      {/* Fee Estimator */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24 border-t border-btc-gray/20">
        <div className="max-w-xl mx-auto">
          <RevealText className="mb-8 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white">
              Fee Estimator
            </h2>
            <p className="font-mono text-xs text-btc-dim mt-2">
              Current recommended transaction fees
            </p>
          </RevealText>

          {/* Mempool Status */}
          <RevealText delay={100} className="mb-8">
            <div className="border border-btc-gray/30 p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-xs text-btc-dim uppercase">Mempool Status</span>
                <span className="font-mono text-xs text-btc-white">
                  {mempool.txCount.toLocaleString()} txs
                </span>
              </div>
              <div className="h-2 bg-btc-gray/30">
                <div 
                  className={`h-full transition-all duration-500 ${
                    mempoolPercentage > 80 ? 'bg-red-500' : 
                    mempoolPercentage > 50 ? 'bg-btc-amber' : 'bg-btc-green'
                  }`}
                  style={{ width: `${mempoolPercentage}%` }}
                />
              </div>
              <p className="font-mono text-[10px] text-btc-dim mt-2">
                {mempoolPercentage.toFixed(0)}% full ({(mempool.vsize / 1000000).toFixed(1)} MB)
              </p>
            </div>
          </RevealText>

          {/* Fee Options */}
          <div className="grid grid-cols-2 gap-4">
            <RevealText delay={200}>
              <div className="border border-btc-green p-4 hover:bg-btc-green/5 transition-colors">
                <p className="font-mono text-xs text-btc-green uppercase mb-2">Fastest</p>
                <p className="font-mono text-2xl text-btc-white">
                  {mempool.feeRates.fastest}
                </p>
                <p className="font-mono text-xs text-btc-dim">sat/vB</p>
                <p className="font-mono text-xs text-btc-green mt-2">
                  ~${calculateFee(mempool.feeRates.fastest).toFixed(2)}
                </p>
              </div>
            </RevealText>

            <RevealText delay={300}>
              <div className="border border-btc-amber p-4 hover:bg-btc-amber/5 transition-colors">
                <p className="font-mono text-xs text-btc-amber uppercase mb-2">30 min</p>
                <p className="font-mono text-2xl text-btc-white">
                  {mempool.feeRates.halfHour}
                </p>
                <p className="font-mono text-xs text-btc-dim">sat/vB</p>
                <p className="font-mono text-xs text-btc-amber mt-2">
                  ~${calculateFee(mempool.feeRates.halfHour).toFixed(2)}
                </p>
              </div>
            </RevealText>

            <RevealText delay={400}>
              <div className="border border-btc-white/50 p-4 hover:bg-btc-white/5 transition-colors">
                <p className="font-mono text-xs text-btc-white uppercase mb-2">1 hour</p>
                <p className="font-mono text-2xl text-btc-white">
                  {mempool.feeRates.hour}
                </p>
                <p className="font-mono text-xs text-btc-dim">sat/vB</p>
                <p className="font-mono text-xs text-btc-white/70 mt-2">
                  ~${calculateFee(mempool.feeRates.hour).toFixed(2)}
                </p>
              </div>
            </RevealText>

            <RevealText delay={500}>
              <div className="border border-btc-dim/50 p-4 hover:bg-btc-dim/5 transition-colors">
                <p className="font-mono text-xs text-btc-dim uppercase mb-2">Economy</p>
                <p className="font-mono text-2xl text-btc-white">
                  {mempool.feeRates.economy}
                </p>
                <p className="font-mono text-xs text-btc-dim">sat/vB</p>
                <p className="font-mono text-xs text-btc-dim mt-2">
                  ~${calculateFee(mempool.feeRates.economy).toFixed(2)}
                </p>
              </div>
            </RevealText>
          </div>

          <p className="font-mono text-[10px] text-btc-dim text-center mt-4">
            Fee estimates for a typical 140 vB transaction
          </p>
        </div>
      </section>

      {/* External Tools */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24 border-t border-btc-gray/20">
        <div className="max-w-3xl mx-auto text-center">
          <RevealText>
            <h2 className="font-serif text-xl md:text-2xl text-btc-white mb-8">
              Block Explorers
            </h2>
          </RevealText>

          <RevealText delay={200}>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://mempool.space" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 border border-btc-green text-btc-green hover:bg-btc-green/10 font-mono text-xs uppercase tracking-wider transition-colors"
              >
                Mempool.space
              </a>
              <a 
                href="https://blockstream.info" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 border border-btc-amber text-btc-amber hover:bg-btc-amber/10 font-mono text-xs uppercase tracking-wider transition-colors"
              >
                Blockstream
              </a>
              <a 
                href="https://blockchain.com/explorer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 border border-btc-white text-btc-white hover:bg-btc-white/10 font-mono text-xs uppercase tracking-wider transition-colors"
              >
                Blockchain.com
              </a>
            </div>
          </RevealText>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 md:py-12 px-4 md:px-8 border-t border-btc-gray/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-mono text-[10px] md:text-xs text-btc-dim">
            Fee data from mempool.space | Updates every 30 seconds
          </p>
        </div>
      </footer>
    </main>
  )
}
