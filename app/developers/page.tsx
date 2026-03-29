'use client'

import { Navigation } from '@/components/navigation'
import { ParticleBackground } from '@/components/particle-background'
import { RevealText } from '@/components/reveal-text'

const GITHUB_REPOS = [
  { name: 'bitcoin/bitcoin', description: 'Bitcoin Core reference implementation', stars: '74k', link: 'https://github.com/bitcoin/bitcoin' },
  { name: 'lightningnetwork/lnd', description: 'Lightning Network Daemon', stars: '7.5k', link: 'https://github.com/lightningnetwork/lnd' },
  { name: 'ElementsProject/lightning', description: 'Core Lightning (c-lightning)', stars: '2.7k', link: 'https://github.com/ElementsProject/lightning' },
  { name: 'bitcoin/bips', description: 'Bitcoin Improvement Proposals', stars: '9k', link: 'https://github.com/bitcoin/bips' },
  { name: 'btcsuite/btcd', description: 'Go full node implementation', stars: '5.8k', link: 'https://github.com/btcsuite/btcd' },
  { name: 'rust-bitcoin/rust-bitcoin', description: 'Rust Bitcoin library', stars: '1.8k', link: 'https://github.com/rust-bitcoin/rust-bitcoin' },
]

const APIS = [
  { name: 'mempool.space', description: 'Block explorer and API. Open source.', link: 'https://mempool.space/docs/api' },
  { name: 'Blockstream Esplora', description: 'HTTP REST API for blockchain data', link: 'https://github.com/Blockstream/esplora/blob/master/API.md' },
  { name: 'blockchain.info', description: 'Simple blockchain data API', link: 'https://www.blockchain.com/explorer/api' },
  { name: 'BTCPay Server', description: 'Self-hosted payment processor', link: 'https://btcpayserver.org/' },
]

const BIPS = [
  { number: 'BIP-32', title: 'HD Wallets', description: 'Hierarchical Deterministic key derivation' },
  { number: 'BIP-39', title: 'Mnemonic Seeds', description: 'Seed phrase standard for wallet backup' },
  { number: 'BIP-44', title: 'Multi-Account HD', description: 'Multi-coin HD wallet structure' },
  { number: 'BIP-141', title: 'SegWit', description: 'Segregated Witness soft fork' },
  { number: 'BIP-340', title: 'Schnorr Signatures', description: 'Taproot signature scheme' },
  { number: 'BIP-341', title: 'Taproot', description: 'SegWit v1 spending rules' },
]

const DOCS = [
  { name: 'Bitcoin Developer Guide', link: 'https://developer.bitcoin.org/devguide/' },
  { name: 'Learn Me A Bitcoin', link: 'https://learnmeabitcoin.com/' },
  { name: 'Bitcoin Wiki', link: 'https://en.bitcoin.it/wiki/Main_Page' },
  { name: 'Lightning Engineering', link: 'https://docs.lightning.engineering/' },
]

export default function DevelopersPage() {
  return (
    <main className="min-h-screen bg-btc-black text-btc-white overflow-x-hidden">
      <ParticleBackground />
      <Navigation />

      {/* Hero */}
      <section className="relative z-10 min-h-[50vh] flex flex-col items-center justify-center px-4 md:px-8 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <RevealText as="h1" className="font-serif text-3xl sm:text-4xl md:text-5xl text-btc-white">
            Developers
          </RevealText>
          
          <RevealText delay={200} className="mt-4">
            <p className="font-serif text-lg text-btc-dim">
              Build on Bitcoin
            </p>
          </RevealText>

          <RevealText delay={400} className="mt-8">
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://github.com/bitcoin/bitcoin"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-btc-green text-btc-green hover:bg-btc-green/10 font-mono text-xs uppercase tracking-wider transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://developer.bitcoin.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-btc-amber text-btc-amber hover:bg-btc-amber/10 font-mono text-xs uppercase tracking-wider transition-colors"
              >
                Documentation
              </a>
            </div>
          </RevealText>
        </div>
      </section>

      {/* GitHub Repos */}
      <section className="relative z-10 px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <RevealText className="mb-8">
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white">Key Repositories</h2>
          </RevealText>

          <div className="grid md:grid-cols-2 gap-4">
            {GITHUB_REPOS.map((repo, index) => (
              <RevealText key={repo.name} delay={index * 100}>
                <a 
                  href={repo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-btc-gray/30 p-4 hover:border-btc-green/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-mono text-sm text-btc-green">{repo.name}</h3>
                      <p className="font-serif text-sm text-btc-dim mt-2">{repo.description}</p>
                    </div>
                    <span className="font-mono text-xs text-btc-dim shrink-0 ml-4">{repo.stars}</span>
                  </div>
                </a>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* APIs */}
      <section className="relative z-10 px-4 md:px-8 py-12 md:py-16 border-t border-btc-gray/20">
        <div className="max-w-4xl mx-auto">
          <RevealText className="mb-8">
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white">APIs & Services</h2>
          </RevealText>

          <div className="grid md:grid-cols-2 gap-4">
            {APIS.map((api, index) => (
              <RevealText key={api.name} delay={index * 100}>
                <a 
                  href={api.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-btc-gray/30 p-4 hover:border-btc-amber/50 transition-colors"
                >
                  <h3 className="font-mono text-sm text-btc-amber">{api.name}</h3>
                  <p className="font-serif text-sm text-btc-dim mt-2">{api.description}</p>
                </a>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* BIPs */}
      <section className="relative z-10 px-4 md:px-8 py-12 md:py-16 border-t border-btc-gray/20">
        <div className="max-w-4xl mx-auto">
          <RevealText className="mb-8">
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white">Important BIPs</h2>
            <p className="font-serif text-sm text-btc-dim mt-2">Bitcoin Improvement Proposals</p>
          </RevealText>

          <div className="grid md:grid-cols-3 gap-4">
            {BIPS.map((bip, index) => (
              <RevealText key={bip.number} delay={index * 100}>
                <a 
                  href={`https://github.com/bitcoin/bips/blob/master/bip-${bip.number.split('-')[1]}.mediawiki`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-btc-gray/30 p-4 hover:border-btc-white/50 transition-colors"
                >
                  <span className="font-mono text-xs text-btc-white">{bip.number}</span>
                  <h3 className="font-serif text-sm text-btc-white mt-1">{bip.title}</h3>
                  <p className="font-mono text-[10px] text-btc-dim mt-2">{bip.description}</p>
                </a>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="relative z-10 px-4 md:px-8 py-12 md:py-16 border-t border-btc-gray/20">
        <div className="max-w-4xl mx-auto">
          <RevealText className="mb-8">
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white">Documentation</h2>
          </RevealText>

          <div className="flex flex-wrap gap-4">
            {DOCS.map((doc, index) => (
              <RevealText key={doc.name} delay={index * 100}>
                <a 
                  href={doc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 border border-btc-gray/30 hover:border-btc-green/50 font-mono text-sm text-btc-dim hover:text-btc-green transition-colors"
                >
                  {doc.name}
                </a>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* Contribute */}
      <section className="relative z-10 px-4 md:px-8 py-12 md:py-16 border-t border-btc-gray/20">
        <div className="max-w-2xl mx-auto text-center">
          <RevealText>
            <h2 className="font-serif text-xl md:text-2xl text-btc-white mb-4">
              Contribute to Bitcoin
            </h2>
            <p className="font-serif text-btc-dim mb-6">
              Bitcoin Core is open source. Anyone can review code, submit patches, or run tests.
            </p>
          </RevealText>

          <RevealText delay={200}>
            <a 
              href="https://bitcoincore.org/en/contribute/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 border-2 border-btc-green text-btc-green hover:bg-btc-green/10 font-mono text-sm uppercase tracking-wider transition-colors"
            >
              Start Contributing
            </a>
          </RevealText>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 md:py-12 px-4 md:px-8 border-t border-btc-gray/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-mono text-[10px] md:text-xs text-btc-dim">
            Building the future of money
          </p>
        </div>
      </footer>
    </main>
  )
}
