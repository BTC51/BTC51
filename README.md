# BTC51.org

> **How much would it cost to attack Bitcoin?**

A real-time Bitcoin network security dashboard — built to make that question impossible to ignore.

**Live → [btc51.org](https://btc51.org)**  
**Follow → [@BTC51org](https://x.com/BTC51org)**

---

## What it does

BTC51 tracks the real cost of a 51% attack on Bitcoin in real time. Beyond the headline number, it covers everything that makes Bitcoin's security model impossible to replicate — hashrate growth, mining pool distribution, halving mechanics, hardware evolution, and why it outperforms gold as a store of value.

---

## Pages

| Route | Description |
|---|---|
| `/` | Live 51% attack cost, network stats, price |
| `/attack` | Full attack cost breakdown — hardware, electricity, time |
| `/halving` | Countdown to next halving + historical timeline |
| `/hashrate` | Network hashrate growth over time |
| `/pools` | Mining pool distribution — how decentralized is Bitcoin? |
| `/nodes` | Global node count and network growth |
| `/hardware` | CPU → GPU → FPGA → ASIC evolution |
| `/vs-gold` | Bitcoin vs Gold: verifiability, portability, scarcity |
| `/what-is-bitcoin` | Plain-language intro |
| `/mining` | How proof-of-work actually works |
| `/myths` | Common FUD — addressed with data |
| `/glossary` | Key terms defined |
| `/timeline` | Bitcoin history from genesis to today |
| `/learn` | Books, podcasts, videos |
| `/tools` | BTC/Sats/USD converter, fee estimator |
| `/developers` | APIs, BIPs, GitHub repos |
| `/about` | Data sources, methodology |

---

## Stack

```
Framework     Next.js 16 (App Router)
Language      TypeScript
Styling       Tailwind CSS v4
Fonts         Cormorant Garamond · JetBrains Mono
Deployment    Vercel
```

---

## Data Sources

| Source | Data |
|---|---|
| [CoinGecko API](https://coingecko.com) | Price, 24h change, market cap |
| [Mempool.space](https://mempool.space/api) | Hashrate, difficulty, mining pools, fees |
| [Blockchain.info](https://blockchain.info) | Block height, difficulty |
| [Bitnodes.io](https://bitnodes.io) | Reachable node count |

All data is cached for 60 seconds and fetched server-side via Next.js route handlers. No API keys required.

---

## Attack Cost Methodology

The 51% attack cost is calculated based on the **Antminer S21 Pro** (2024):

- **Hashrate:** 234 TH/s per unit
- **Power:** 3,510 W per unit
- **Hardware cost:** ~$5,000 per unit
- **Electricity:** $0.05/kWh (industrial rate)

To control 51% of the network, an attacker needs to acquire and operate more than half of the total network hashrate. The model calculates:

```
Units required = (networkHashrate × 0.51) / 234 TH/s
Electricity/hr = units × 3.51 kW × $0.05
Hardware cost  = units × $5,000
```

This is a **lower bound** — it excludes logistics, cooling, facility costs, and the near-impossibility of acquiring this many ASICs without the market noticing.

---

## Run Locally

```bash
git clone https://github.com/BTC51org/btc51
cd btc51
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

No environment variables needed — all APIs are public.

---

## Project Structure

```
app/
├── api/bitcoin/route.ts   # All data fetching — price, hashrate, pools, etc.
├── page.tsx               # Homepage
├── attack/                # 51% attack cost
├── halving/               # Halving countdown
├── hashrate/              # Network hashrate
├── pools/                 # Mining pool distribution
├── nodes/                 # Node count
└── ...

components/
├── navigation.tsx         # Top nav + full-screen menu
├── particle-background.tsx
├── reveal-text.tsx        # Scroll-triggered fade-in
└── animated-number.tsx    # Count-up animation

lib/
└── types.ts               # BitcoinData interface
```

---

## License

MIT — open source, use freely.

---

*"The root problem with conventional currency is all the trust that's required to make it work."*  
— Satoshi Nakamoto, 2009
