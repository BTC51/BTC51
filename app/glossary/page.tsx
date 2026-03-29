'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { ParticleBackground } from '@/components/particle-background'
import { RevealText } from '@/components/reveal-text'

const GLOSSARY = [
  { term: 'Address', definition: 'A string of characters that represents a destination for bitcoin. Like an email address for money.' },
  { term: 'ASIC', definition: 'Application-Specific Integrated Circuit. Specialized hardware designed only for mining Bitcoin.' },
  { term: 'Block', definition: 'A batch of transactions grouped together and added to the blockchain. New blocks are created roughly every 10 minutes.' },
  { term: 'Block Height', definition: 'The number of blocks between a given block and the genesis block. A measure of blockchain length.' },
  { term: 'Block Reward', definition: 'The new bitcoin awarded to miners for successfully mining a block. Currently 3.125 BTC, halving every 210,000 blocks.' },
  { term: 'Blockchain', definition: 'A public, distributed ledger of all Bitcoin transactions. Each block references the previous one, forming a chain.' },
  { term: 'Cold Storage', definition: 'Keeping private keys offline, disconnected from the internet, for maximum security.' },
  { term: 'Confirmation', definition: 'When a transaction is included in a block. More confirmations mean more security. 6 confirmations is standard for large amounts.' },
  { term: 'Difficulty', definition: 'A measure of how hard it is to find a valid block hash. Adjusts every 2,016 blocks to maintain 10-minute block times.' },
  { term: 'Double Spend', definition: 'An attack where the same bitcoin is spent twice. Proof of Work prevents this by making it computationally expensive.' },
  { term: 'DYOR', definition: 'Do Your Own Research. A reminder to verify information independently rather than trusting others blindly.' },
  { term: 'Genesis Block', definition: 'The first block in the Bitcoin blockchain, mined by Satoshi Nakamoto on January 3, 2009.' },
  { term: 'Halving', definition: 'The event when the block reward is cut in half. Occurs every 210,000 blocks (~4 years). Creates predictable scarcity.' },
  { term: 'Hash', definition: 'The output of a hash function. In Bitcoin, SHA-256 produces a 256-bit hash used for block headers and addresses.' },
  { term: 'Hashrate', definition: 'The total computational power of the Bitcoin network, measured in hashes per second (H/s, TH/s, EH/s).' },
  { term: 'HODL', definition: 'Hold On for Dear Life. Slang for holding bitcoin long-term regardless of price volatility. Origin: a typo in a 2013 forum post.' },
  { term: 'Hot Wallet', definition: 'A wallet connected to the internet. Convenient but less secure than cold storage.' },
  { term: 'Lightning Network', definition: 'A Layer 2 payment protocol on top of Bitcoin. Enables instant, low-fee transactions.' },
  { term: 'Mempool', definition: 'The waiting area for unconfirmed transactions. Each node maintains its own mempool.' },
  { term: 'Merkle Tree', definition: 'A data structure that efficiently summarizes all transactions in a block into a single hash (merkle root).' },
  { term: 'Mining', definition: 'The process of using computational power to find valid block hashes and secure the network.' },
  { term: 'Node', definition: 'A computer running Bitcoin software that validates transactions and blocks. Full nodes store the entire blockchain.' },
  { term: 'Nonce', definition: 'A number miners change to try to find a valid block hash. Part of the proof of work process.' },
  { term: 'Private Key', definition: 'A secret number that allows you to spend bitcoin. Never share your private key. Keep secure backups.' },
  { term: 'Proof of Work', definition: 'The consensus mechanism Bitcoin uses. Miners prove they&apos;ve done computational work to add blocks.' },
  { term: 'Public Key', definition: 'Derived from the private key. Used to receive bitcoin. Can be shared safely.' },
  { term: 'Satoshi', definition: 'The smallest unit of bitcoin. 1 BTC = 100,000,000 satoshis (sats). Named after Satoshi Nakamoto.' },
  { term: 'Satoshi Nakamoto', definition: 'The pseudonymous creator of Bitcoin. Published the whitepaper in 2008, mined the genesis block in 2009, and disappeared in 2011.' },
  { term: 'Seed Phrase', definition: 'A list of words (usually 12 or 24) that encodes your private keys. Used to backup and restore wallets.' },
  { term: 'SegWit', definition: 'Segregated Witness. A 2017 upgrade that increased block capacity and fixed transaction malleability.' },
  { term: 'SHA-256', definition: 'The cryptographic hash function Bitcoin uses. Produces a 256-bit output from any input.' },
  { term: 'Soft Fork', definition: 'A backwards-compatible protocol upgrade. Old nodes can still validate new blocks.' },
  { term: 'UTXO', definition: 'Unspent Transaction Output. The fundamental unit of bitcoin ownership. Your balance is the sum of your UTXOs.' },
  { term: 'Wallet', definition: 'Software or hardware that manages your private keys and allows you to send and receive bitcoin.' },
  { term: 'Whitepaper', definition: 'The original 9-page document by Satoshi Nakamoto describing Bitcoin. Published October 31, 2008.' },
]

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredTerms = GLOSSARY.filter(
    item => 
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const alphabet = [...new Set(GLOSSARY.map(item => item.term[0].toUpperCase()))].sort()

  return (
    <main className="min-h-screen bg-btc-black text-btc-white overflow-x-hidden">
      <ParticleBackground />
      <Navigation />

      {/* Hero */}
      <section className="relative z-10 min-h-[40vh] flex flex-col items-center justify-center px-4 md:px-8 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <RevealText as="h1" className="font-serif text-3xl sm:text-4xl md:text-5xl text-btc-white">
            Glossary
          </RevealText>
          
          <RevealText delay={200} className="mt-4">
            <p className="font-serif text-lg text-btc-dim">
              Essential Bitcoin terminology
            </p>
          </RevealText>

          {/* Search */}
          <RevealText delay={400} className="mt-8">
            <input
              type="text"
              placeholder="Search terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md bg-btc-gray/30 border border-btc-gray/50 px-4 py-3 font-mono text-sm text-btc-white placeholder:text-btc-dim focus:border-btc-green focus:outline-none transition-colors"
            />
          </RevealText>
        </div>
      </section>

      {/* Alphabet Jump */}
      <section className="relative z-10 px-4 md:px-8 py-6 border-b border-btc-gray/20 sticky top-16 md:top-20 bg-btc-black/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2">
          {alphabet.map(letter => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="w-8 h-8 flex items-center justify-center font-mono text-xs text-btc-dim hover:text-btc-green hover:border-btc-green border border-transparent transition-colors"
            >
              {letter}
            </a>
          ))}
        </div>
      </section>

      {/* Terms */}
      <section className="relative z-10 px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          {alphabet.map(letter => {
            const termsForLetter = filteredTerms.filter(item => item.term[0].toUpperCase() === letter)
            if (termsForLetter.length === 0) return null
            
            return (
              <div key={letter} id={`letter-${letter}`} className="mb-12">
                <h2 className="font-mono text-2xl text-btc-green mb-6 border-b border-btc-gray/20 pb-2">
                  {letter}
                </h2>
                <div className="space-y-6">
                  {termsForLetter.map((item, index) => (
                    <div key={item.term} className="group">
                      <h3 className="font-mono text-sm text-btc-white uppercase tracking-wider mb-2 group-hover:text-btc-amber transition-colors">
                        {item.term}
                      </h3>
                      <p className="font-serif text-btc-dim leading-relaxed pl-4 border-l border-btc-gray/30">
                        {item.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {filteredTerms.length === 0 && (
            <div className="text-center py-12">
              <p className="font-serif text-btc-dim">No terms found matching &quot;{searchTerm}&quot;</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 md:py-12 px-4 md:px-8 border-t border-btc-gray/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-mono text-[10px] md:text-xs text-btc-dim">
            {GLOSSARY.length} terms defined
          </p>
        </div>
      </footer>
    </main>
  )
}
