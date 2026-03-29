export interface BitcoinData {
  price: number
  priceChange24h: number
  marketCap: number
  volume24h: number
  blockHeight: number
  hashrate: number // in EH/s
  difficulty: number
  nextHalvingBlock: number
  blocksUntilHalving: number
  estimatedHalvingDate: string
  lastUpdated: string
  miningPools: MiningPool[]
  hashrateHistory: HashrateHistoryPoint[]
  attackCost: AttackCost
  lightning: LightningStats
  mempool: MempoolStats
  nodeCount: number
}

export interface LightningStats {
  capacity: number // in BTC
  channels: number
  nodes: number
}

export interface MempoolStats {
  txCount: number
  vsize: number
  feeRates: {
    fastest: number
    halfHour: number
    hour: number
    economy: number
  }
}

export interface MiningPool {
  name: string
  hashrate: number
  percentage: number
}

export interface HashrateHistoryPoint {
  date: string
  hashrate: number
}

export interface AttackCost {
  hourly: number
  daily: number
  weekly: number
  asicsRequired: number
  electricityCostPerHour: number
  timeToAcquireHardware: number // in months
}

export interface AttackCostParams {
  hashrate: number // Current network hashrate in EH/s
  asicPrice: number // Price per ASIC miner in USD
  asicHashrate: number // Hashrate per ASIC in TH/s
  electricityCost: number // USD per kWh
  asicPower: number // Watts per ASIC
}

// Calculate 51% attack costs
export function calculateAttackCost(params: AttackCostParams): AttackCost {
  const { hashrate, asicPrice, asicHashrate, electricityCost, asicPower } = params
  
  // Convert EH/s to TH/s (1 EH = 1,000,000 TH)
  const networkTHs = hashrate * 1000000
  const attackTHs = networkTHs * 0.51 // 51% of network
  
  // Number of ASICs needed
  const asicsRequired = Math.ceil(attackTHs / asicHashrate)
  
  // Hardware cost
  const hardwareCost = asicsRequired * asicPrice
  
  // Electricity cost per hour
  const totalPowerKW = (asicsRequired * asicPower) / 1000
  const electricityCostPerHour = totalPowerKW * electricityCost
  
  // Hourly cost (electricity only, hardware is sunk cost)
  const hourly = electricityCostPerHour
  
  // Daily cost
  const daily = hourly * 24
  
  // Weekly cost
  const weekly = daily * 7
  
  // Estimated time to acquire hardware (rough estimate)
  const timeToAcquireHardware = Math.ceil(asicsRequired / 50000) // months
  
  return {
    hourly,
    daily,
    weekly,
    asicsRequired,
    electricityCostPerHour,
    timeToAcquireHardware,
  }
}

// Halving history data
export const HALVING_HISTORY = [
  {
    year: 2009,
    event: 'Genesis',
    block: 0,
    reward: 50,
    note: 'The beginning',
  },
  {
    year: 2012,
    event: '1st Halving',
    block: 210000,
    reward: 25,
    note: 'First scarcity event',
  },
  {
    year: 2016,
    event: '2nd Halving',
    block: 420000,
    reward: 12.5,
    note: 'Institutional awareness grows',
  },
  {
    year: 2020,
    event: '3rd Halving',
    block: 630000,
    reward: 6.25,
    note: 'Global adoption accelerates',
  },
  {
    year: 2024,
    event: '4th Halving',
    block: 840000,
    reward: 3.125,
    note: 'The scarcity deepens',
  },
  {
    year: 2028,
    event: '5th Halving',
    block: 1050000,
    reward: 1.5625,
    note: 'Future approaches',
  },
]

// Hardware evolution
export const HARDWARE_EVOLUTION = [
  {
    era: 'CPU',
    name: 'Central Processing Unit',
    years: '2009-2010',
    hashrate: '~10 MH/s',
    efficiency: 'Very Low',
    description: 'The original mining method. Satoshi mined the genesis block on a CPU.',
  },
  {
    era: 'GPU',
    name: 'Graphics Processing Unit',
    years: '2010-2013',
    hashrate: '~500 MH/s',
    efficiency: 'Low',
    description: 'Parallel processing brings 50x improvement over CPUs.',
  },
  {
    era: 'FPGA',
    name: 'Field-Programmable Gate Array',
    years: '2011-2013',
    hashrate: '~1 GH/s',
    efficiency: 'Medium',
    description: 'Custom hardware configurations optimize for SHA-256.',
  },
  {
    era: 'ASIC',
    name: 'Application-Specific Integrated Circuit',
    years: '2013-Present',
    hashrate: '~250 TH/s',
    efficiency: 'Very High',
    description: 'Purpose-built chips dominate. Efficiency improves each generation.',
  },
]
