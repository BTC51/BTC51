'use client'

import { Navigation } from '@/components/navigation'
import { ParticleBackground } from '@/components/particle-background'
import { RevealText } from '@/components/reveal-text'

const BOOKS = [
  { title: 'The Bitcoin Standard', author: 'Saifedean Ammous', description: 'The definitive introduction to Bitcoin as sound money. Economics and history.', link: 'https://saifedean.com/thebitcoinstandard/' },
  { title: 'Mastering Bitcoin', author: 'Andreas Antonopoulos', description: 'Technical deep-dive for developers. Free to read online.', link: 'https://github.com/bitcoinbook/bitcoinbook' },
  { title: 'The Blocksize War', author: 'Jonathan Bier', description: 'History of Bitcoin&apos;s most contentious debate and how consensus works.', link: 'https://www.amazon.com/Blocksize-War-controls-Bitcoins-protocol/dp/B08YQMC2WM' },
  { title: '21 Lessons', author: 'Gigi', description: 'Philosophical reflections on what Bitcoin teaches us. Free online.', link: 'https://21lessons.com/' },
  { title: 'The Internet of Money', author: 'Andreas Antonopoulos', description: 'Collection of talks explaining Bitcoin&apos;s potential impact on society.', link: 'https://aantonop.com/books/' },
  { title: 'Inventing Bitcoin', author: 'Yan Pritzker', description: 'Non-technical explanation of how Bitcoin works. Great for beginners.', link: 'https://www.inventingbitcoin.com/' },
]

const PODCASTS = [
  { title: 'What Bitcoin Did', host: 'Peter McCormack', description: 'Interviews with major figures in Bitcoin', link: 'https://www.whatbitcoindid.com/' },
  { title: 'Bitcoin Audible', host: 'Guy Swann', description: 'Audio readings of important Bitcoin articles and papers', link: 'https://bitcoinaudible.com/' },
  { title: 'Stephan Livera Podcast', host: 'Stephan Livera', description: 'Austrian economics and technical Bitcoin discussions', link: 'https://stephanlivera.com/' },
  { title: 'The Bitcoin Standard Podcast', host: 'Saifedean Ammous', description: 'Economics-focused discussions and book seminars', link: 'https://saifedean.com/podcast/' },
]

const VIDEOS = [
  { title: 'But how does bitcoin actually work?', creator: '3Blue1Brown', description: 'Excellent visual explanation of the cryptography', link: 'https://www.youtube.com/watch?v=bBC-nXj3Ng4' },
  { title: 'Introduction to Bitcoin', creator: 'Andreas Antonopoulos', description: 'Classic talk explaining Bitcoin fundamentals', link: 'https://www.youtube.com/watch?v=l1si5ZWLgy0' },
  { title: 'Bitcoin for Beginners', creator: 'BTC Sessions', description: 'Comprehensive tutorial series for newcomers', link: 'https://www.youtube.com/c/BTCSessions' },
  { title: 'The Trust Machine', creator: 'Documentary', description: 'Documentary about how Bitcoin creates trust', link: 'https://www.youtube.com/watch?v=ZKwqNgG-Sv4' },
]

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-btc-black text-btc-white overflow-x-hidden">
      <ParticleBackground />
      <Navigation />

      {/* Hero */}
      <section className="relative z-10 min-h-[50vh] flex flex-col items-center justify-center px-4 md:px-8 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <RevealText as="h1" className="font-serif text-3xl sm:text-4xl md:text-5xl text-btc-white">
            Learn Bitcoin
          </RevealText>
          
          <RevealText delay={200} className="mt-4">
            <p className="font-serif text-lg text-btc-dim">
              Curated resources to deepen your understanding
            </p>
          </RevealText>
        </div>
      </section>

      {/* Whitepaper CTA */}
      <section className="relative z-10 px-4 md:px-8 py-8">
        <div className="max-w-xl mx-auto">
          <RevealText>
            <a 
              href="https://bitcoin.org/bitcoin.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block border-2 border-btc-amber p-6 hover:bg-btc-amber/10 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-xs text-btc-amber uppercase tracking-wider mb-2">
                    Start Here
                  </p>
                  <h3 className="font-serif text-xl text-btc-white group-hover:text-btc-amber transition-colors">
                    The Bitcoin Whitepaper
                  </h3>
                  <p className="font-serif text-sm text-btc-dim mt-2">
                    Satoshi Nakamoto&apos;s original 9-page paper. Only takes 30 minutes to read.
                  </p>
                </div>
                <svg className="w-8 h-8 text-btc-amber shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </a>
          </RevealText>
        </div>
      </section>

      {/* Books */}
      <section className="relative z-10 px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <RevealText className="mb-8">
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white">Books</h2>
          </RevealText>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {BOOKS.map((book, index) => (
              <RevealText key={book.title} delay={index * 100}>
                <a 
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-btc-gray/30 p-4 md:p-6 hover:border-btc-green/50 transition-colors h-full"
                >
                  <h3 className="font-serif text-lg text-btc-white mb-1">{book.title}</h3>
                  <p className="font-mono text-xs text-btc-amber mb-3">{book.author}</p>
                  <p className="font-serif text-sm text-btc-dim" dangerouslySetInnerHTML={{ __html: book.description }} />
                </a>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* Podcasts */}
      <section className="relative z-10 px-4 md:px-8 py-12 md:py-16 border-t border-btc-gray/20">
        <div className="max-w-4xl mx-auto">
          <RevealText className="mb-8">
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white">Podcasts</h2>
          </RevealText>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {PODCASTS.map((podcast, index) => (
              <RevealText key={podcast.title} delay={index * 100}>
                <a 
                  href={podcast.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-btc-gray/30 p-4 md:p-6 hover:border-btc-amber/50 transition-colors h-full"
                >
                  <h3 className="font-serif text-lg text-btc-white mb-1">{podcast.title}</h3>
                  <p className="font-mono text-xs text-btc-green mb-3">{podcast.host}</p>
                  <p className="font-serif text-sm text-btc-dim">{podcast.description}</p>
                </a>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="relative z-10 px-4 md:px-8 py-12 md:py-16 border-t border-btc-gray/20">
        <div className="max-w-4xl mx-auto">
          <RevealText className="mb-8">
            <h2 className="font-serif text-2xl md:text-3xl text-btc-white">Videos</h2>
          </RevealText>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {VIDEOS.map((video, index) => (
              <RevealText key={video.title} delay={index * 100}>
                <a 
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-btc-gray/30 p-4 md:p-6 hover:border-btc-white/50 transition-colors h-full"
                >
                  <h3 className="font-serif text-lg text-btc-white mb-1">{video.title}</h3>
                  <p className="font-mono text-xs text-btc-dim mb-3">{video.creator}</p>
                  <p className="font-serif text-sm text-btc-dim">{video.description}</p>
                </a>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 md:py-12 px-4 md:px-8 border-t border-btc-gray/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-mono text-[10px] md:text-xs text-btc-dim">
            The best time to start learning was yesterday. The second best time is now.
          </p>
        </div>
      </footer>
    </main>
  )
}
