import { NextResponse } from 'next/server'
import { calculateAttackCost } from '@/lib/types'

const CACHE_DURATION = 60

interface BitcoinData {
  price: number
  priceChange24h: number
  marketCap: number
  volume24h: number
  blockHeight: number
  hashrate: number
  difficulty: number
  nextHalvingBlock: number
  blocksUntilHalving: number
  estimatedHalvingDate: string
  lastUpdated: string
  miningPools: { name: string; hashrate: number; percentage: number }[]
  hashrateHistory: { date: string; hashrate: number }[]
  attackCost: {
    hourly: number
    daily: number
    weekly: number
    asicsRequired: number
    electricityCostPerHour: number
    timeToAcquireHardware: number
  }
  lightning: {
    capacity: number
    channels: number
    nodes: number
  }
  mempool: {
    txCount: number
    vsize: number
    feeRates: { fastest: number; halfHour: number; hour: number; economy: number }
  }
  nodeCount: number
}

// Fetch Bitcoin price from CoinGecko
async function fetchBitcoinPrice() {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true',
      { next: { revalidate: CACHE_DURATION } }
    )
    if (!res.ok) throw new Error('CoinGecko API failed')
    const data = await res.json()
    return {
      price: data.bitcoin.usd,
      priceChange24h: data.bitcoin.usd_24h_change,
      marketCap: data.bitcoin.usd_market_cap,
      volume24h: data.bitcoin.usd_24h_vol,
    }
  } catch {
    return {
      price: 67500,
      priceChange24h: 2.5,
      marketCap: 1320000000000,
      volume24h: 28000000000,
    }
  }
}

// Fetch blockchain info
async function fetchBlockchainInfo() {
  try {
    const res = await fetch('https://blockchain.info/q/getblockcount', {
      next: { revalidate: CACHE_DURATION },
    })
    if (!res.ok) throw new Error('Blockchain.info API failed')
    const blockHeight = await res.text()
    return parseInt(blockHeight, 10)
  } catch {
    return 890000
  }
}

// Fetch hashrate and difficulty from mempool.space
async function fetchHashrateData() {
  try {
    const [hashrateRes, difficultyRes] = await Promise.all([
      fetch('https://mempool.space/api/v1/mining/hashrate/3d', {
        next: { revalidate: CACHE_DURATION },
      }),
      fetch('https://blockchain.info/q/getdifficulty', {
        next: { revalidate: CACHE_DURATION },
      }),
    ])

    let hashrate = 650
    let difficulty = 88.1e12

    if (hashrateRes.ok) {
      const hashrateData = await hashrateRes.json()
      if (hashrateData.currentHashrate) {
        hashrate = hashrateData.currentHashrate / 1e18
      }
    }

    if (difficultyRes.ok) {
      const diffText = await difficultyRes.text()
      const parsedDifficulty = parseFloat(diffText)
      if (!isNaN(parsedDifficulty) && parsedDifficulty > 0) {
        difficulty = parsedDifficulty
      }
    }

    return { hashrate, difficulty }
  } catch {
    return {
      hashrate: 620 + Math.random() * 50,
      difficulty: 88.1e12,
    }
  }
}

// Fetch mining pool distribution
async function fetchMiningPools() {
  try {
    const res = await fetch('https://mempool.space/api/v1/mining/pools/1w', {
      next: { revalidate: CACHE_DURATION * 5 },
    })
    if (!res.ok) throw new Error('Mining pools API failed')
    const data = await res.json()
    
    if (!data.pools || !Array.isArray(data.pools) || data.pools.length === 0) {
      return getDefaultPools()
    }
    
    const pools = data.pools.slice(0, 10).map((pool: { name: string; blockCount: number; share: number }) => ({
      name: pool.name || 'Unknown',
      hashrate: pool.blockCount || 0,
      percentage: typeof pool.share === 'number' ? pool.share * 100 : 0,
    }))
    
    // Ensure we have valid data
    const validPools = pools.filter((p: { percentage: number }) => p.percentage > 0)
    return validPools.length > 0 ? validPools : getDefaultPools()
  } catch {
    return getDefaultPools()
  }
}

function getDefaultPools() {
  return [
    { name: 'Foundry USA', hashrate: 156, percentage: 29.5 },
    { name: 'AntPool', hashrate: 128, percentage: 24.2 },
    { name: 'F2Pool', hashrate: 68, percentage: 12.8 },
    { name: 'ViaBTC', hashrate: 58, percentage: 10.9 },
    { name: 'Binance Pool', hashrate: 42, percentage: 7.9 },
    { name: 'Mara Pool', hashrate: 32, percentage: 6.0 },
    { name: 'Luxor', hashrate: 21, percentage: 4.0 },
    { name: 'Others', hashrate: 25, percentage: 4.7 },
  ]
}

// Fetch hashrate history
async function fetchHashrateHistory() {
  try {
    const res = await fetch('https://mempool.space/api/v1/mining/hashrate/1m', {
      next: { revalidate: CACHE_DURATION * 10 },
    })
    if (!res.ok) throw new Error('Hashrate history API failed')
    const data = await res.json()
    
    if (data.hashrates && Array.isArray(data.hashrates)) {
      return data.hashrates.slice(-30).map((item: { timestamp: number; avgHashrate: number }) => ({
        date: new Date(item.timestamp * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        hashrate: item.avgHashrate / 1e18,
      }))
    }
    return getDefaultHashrateHistory()
  } catch {
    return getDefaultHashrateHistory()
  }
}

function getDefaultHashrateHistory() {
  const history = []
  const baseHashrate = 600
  for (let i = 30; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    history.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      hashrate: baseHashrate + Math.random() * 80 - 40,
    })
  }
  return history
}

// Fetch Lightning Network stats
async function fetchLightningStats() {
  try {
    const res = await fetch('https://mempool.space/api/v1/lightning/statistics/latest', {
      next: { revalidate: CACHE_DURATION * 10 },
    })
    if (!res.ok) throw new Error('Lightning API failed')
    const data = await res.json()
    return {
      capacity: data.latest?.total_capacity ? data.latest.total_capacity / 100000000 : 5200,
      channels: data.latest?.channel_count || 52000,
      nodes: data.latest?.node_count || 14500,
    }
  } catch {
    return {
      capacity: 5200, // BTC
      channels: 52000,
      nodes: 14500,
    }
  }
}

// Fetch mempool and fee estimates
async function fetchMempoolData() {
  try {
    const [mempoolRes, feesRes] = await Promise.all([
      fetch('https://mempool.space/api/mempool', {
        next: { revalidate: 30 },
      }),
      fetch('https://mempool.space/api/v1/fees/recommended', {
        next: { revalidate: 30 },
      }),
    ])
    
    let txCount = 50000
    let vsize = 100000000
    let feeRates = { fastest: 50, halfHour: 40, hour: 30, economy: 10 }
    
    if (mempoolRes.ok) {
      const mempoolData = await mempoolRes.json()
      txCount = mempoolData.count || 50000
      vsize = mempoolData.vsize || 100000000
    }
    
    if (feesRes.ok) {
      const feesData = await feesRes.json()
      feeRates = {
        fastest: feesData.fastestFee || 50,
        halfHour: feesData.halfHourFee || 40,
        hour: feesData.hourFee || 30,
        economy: feesData.economyFee || 10,
      }
    }
    
    return { txCount, vsize, feeRates }
  } catch {
    return {
      txCount: 50000,
      vsize: 100000000,
      feeRates: { fastest: 50, halfHour: 40, hour: 30, economy: 10 },
    }
  }
}

// Fetch node count estimate
async function fetchNodeCount() {
  // Using bitnodes API estimate
  try {
    const res = await fetch('https://bitnodes.io/api/v1/snapshots/latest/', {
      next: { revalidate: CACHE_DURATION * 60 },
    })
    if (!res.ok) throw new Error('Bitnodes API failed')
    const data = await res.json()
    return data.total_nodes || 18000
  } catch {
    return 18000 // Approximate reachable node count
  }
}

// Calculate halving info
function calculateHalvingInfo(blockHeight: number) {
  const NEXT_HALVING_BLOCK = 1050000
  const BLOCKS_PER_DAY = 144
  
  const blocksUntilHalving = NEXT_HALVING_BLOCK - blockHeight
  const daysUntilHalving = blocksUntilHalving / BLOCKS_PER_DAY
  
  const estimatedDate = new Date()
  estimatedDate.setDate(estimatedDate.getDate() + daysUntilHalving)
  
  return {
    nextHalvingBlock: NEXT_HALVING_BLOCK,
    blocksUntilHalving: Math.max(0, blocksUntilHalving),
    estimatedHalvingDate: estimatedDate.toISOString(),
  }
}

export async function GET() {
  try {
    const [priceData, blockHeight, hashrateData, miningPools, hashrateHistory, lightning, mempool, nodeCount] = await Promise.all([
      fetchBitcoinPrice(),
      fetchBlockchainInfo(),
      fetchHashrateData(),
      fetchMiningPools(),
      fetchHashrateHistory(),
      fetchLightningStats(),
      fetchMempoolData(),
      fetchNodeCount(),
    ])

    const halvingInfo = calculateHalvingInfo(blockHeight)
    
    // Calculate attack cost with current ASIC prices
    const attackCost = calculateAttackCost({
      hashrate: hashrateData.hashrate,
      asicPrice: 5000, // Antminer S21 Pro price estimate
      asicHashrate: 234, // TH/s per S21 Pro
      electricityCost: 0.05, // USD per kWh (industrial rate)
      asicPower: 3510, // Watts per S21 Pro
    })

    const bitcoinData: BitcoinData = {
      ...priceData,
      blockHeight,
      hashrate: hashrateData.hashrate,
      difficulty: hashrateData.difficulty,
      ...halvingInfo,
      lastUpdated: new Date().toISOString(),
      miningPools,
      hashrateHistory,
      attackCost,
      lightning,
      mempool,
      nodeCount,
    }

    return NextResponse.json(bitcoinData, {
      headers: {
        'Cache-Control': `s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
      },
    })
  } catch (error) {
    console.error('Error fetching Bitcoin data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Bitcoin data' },
      { status: 500 }
    )
  }
}
