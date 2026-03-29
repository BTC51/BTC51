'use client'

import { Navigation } from '@/components/navigation'
import { ParticleBackground } from '@/components/particle-background'
import { RevealText } from '@/components/reveal-text'

const PROPERTIES = [
  {
    title: 'Decentralized',
    description: 'No company, government, or individual controls Bitcoin. It runs on a global network of computers following the same rules.',
    color: 'btc-green',
  },
  {
    title: 'Scarce',
    description: 'Only 21 million bitcoin will ever exist. This is enforced by code, not by trust in any institution.',
    color: 'btc-amber',
  },
  {
    title: 'Open',
    description: 'Anyone can use Bitcoin. No approval needed. No account to open. No borders.',
    color: 'btc-white',
  },
  {
    title: 'Permissionless',
    description: 'You don&apos;t need permission to send or receive bitcoin. Your transactions cannot be censored.',
    color: 'btc-green',
  },
  {
    title: 'Verifiable',
    description: 'Anyone can verify the total supply and all transactions. Everything is transparent and auditable.',
    color: 'btc-amber',
  },
  {
    title: 'Immutable',
    description: 'Once confirmed, transactions cannot be reversed or altered. The history is permanent.',
    color: 'btc-white',
  },
]

export default function WhatIsBitcoinPage() {
  return (
    <main className="min-h-screen bg-btc-black text-btc-white overflow-x-hidden">
      <ParticleBackground />
      <Navigation />

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8 pt-24">
        <div className="max-w-3xl mx-auto text-center">
          <RevealText as="h1" className="font-serif text-4xl sm:text-5xl md:text-7xl text-btc-white leading-tight">
            What is Bitcoin?
          </RevealText>
          
          <RevealText delay={300} className="mt-8">
            <p className="font-serif text-xl md:text-2xl text-btc-dim leading-relaxed">
              A peer-to-peer electronic cash system.
            </p>
          </RevealText>

          <RevealText delay={500} className="mt-4">
            <p className="font-mono text-xs text-btc-amber">
              — Satoshi Nakamoto, 2008
            </p>
          </RevealText>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-btc-green to-transparent" />
        </div>
      </section>

      {/* Simple Explanation */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <RevealText>
            <p className="font-serif text-xl md:text-2xl text-btc-white leading-relaxed mb-8">
              Bitcoin is digital money that works without banks.
            </p>
          </RevealText>

          <RevealText delay={200}>
            <p className="font-serif text-lg text-btc-dim leading-relaxed mb-6">
              Imagine cash, but for the internet. You can send it to anyone, anywhere, 
              at any time — without asking permission from a bank, government, or company.
            </p>
          </RevealText>

          <RevealText delay={400}>
            <p className="font-serif text-lg text-btc-dim leading-relaxed">
              It runs on a global network of computers that anyone can join. 
              No single person or organization controls it. The rules are enforced 
              by math and code, not by trust in institutions.
            </p>
          </RevealText>
        </div>
      </section>

      {/* Key Properties */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24 border-t border-btc-gray/20">
        <div className="max-w-4xl mx-auto">
          <RevealText className="mb-12 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white">
              Key Properties
            </h2>
          </RevealText>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {PROPERTIES.map((prop, index) => (
              <RevealText key={prop.title} delay={index * 100}>
                <div className={`border-l-2 border-${prop.color} pl-6 py-4`}>
                  <h3 className={`font-mono text-sm text-${prop.color} uppercase tracking-wider mb-2`}>
                    {prop.title}
                  </h3>
                  <p className="font-serif text-btc-dim" dangerouslySetInnerHTML={{ __html: prop.description }} />
                </div>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24 border-t border-btc-gray/20">
        <div className="max-w-3xl mx-auto">
          <RevealText className="mb-12 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white">
              Why Does It Matter?
            </h2>
          </RevealText>

          <div className="space-y-8">
            <RevealText delay={100}>
              <div className="pb-8 border-b border-btc-gray/20">
                <h3 className="font-serif text-xl text-btc-white mb-3">
                  Financial Freedom
                </h3>
                <p className="font-serif text-btc-dim">
                  Bitcoin gives anyone, anywhere access to a global monetary network. 
                  No bank account required. No credit check. No discrimination.
                </p>
              </div>
            </RevealText>

            <RevealText delay={200}>
              <div className="pb-8 border-b border-btc-gray/20">
                <h3 className="font-serif text-xl text-btc-white mb-3">
                  Sound Money
                </h3>
                <p className="font-serif text-btc-dim">
                  Unlike government currencies that can be printed endlessly, 
                  Bitcoin&apos;s supply is mathematically fixed. This makes it a 
                  reliable store of value over time.
                </p>
              </div>
            </RevealText>

            <RevealText delay={300}>
              <div>
                <h3 className="font-serif text-xl text-btc-white mb-3">
                  Sovereignty
                </h3>
                <p className="font-serif text-btc-dim">
                  You truly own your bitcoin. No one can freeze your account, 
                  block your transactions, or confiscate your funds without 
                  your private keys.
                </p>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* Genesis Quote */}
      <section className="relative z-10 px-4 md:px-8 py-20 md:py-32 border-t border-btc-gray/20">
        <div className="max-w-3xl mx-auto text-center">
          <RevealText>
            <blockquote className="font-serif text-lg md:text-2xl text-btc-dim leading-relaxed italic">
              &quot;The Times 03/Jan/2009 Chancellor on brink of second bailout for banks&quot;
            </blockquote>
            <p className="font-mono text-xs text-btc-amber mt-6">
              — Message embedded in the Bitcoin genesis block
            </p>
          </RevealText>
        </div>
      </section>

      {/* Whitepaper CTA */}
      <section className="relative z-10 px-4 md:px-8 py-16 md:py-24 border-t border-btc-gray/20">
        <div className="max-w-xl mx-auto text-center">
          <RevealText>
            <h2 className="font-serif text-xl md:text-2xl text-btc-white mb-4">
              Read the Original Vision
            </h2>
            <p className="font-serif text-btc-dim mb-8">
              The Bitcoin whitepaper is only 9 pages. It explains everything.
            </p>
          </RevealText>

          <RevealText delay={200}>
            <a 
              href="https://bitcoin.org/bitcoin.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-btc-amber text-btc-amber hover:bg-btc-amber/10 font-mono text-sm uppercase tracking-wider transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Whitepaper (PDF)
            </a>
          </RevealText>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 md:py-12 px-4 md:px-8 border-t border-btc-gray/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-mono text-[10px] md:text-xs text-btc-dim">
            Bitcoin: A Peer-to-Peer Electronic Cash System | Satoshi Nakamoto, 2008
          </p>
        </div>
      </footer>
    </main>
  )
}
