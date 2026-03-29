'use client'

import useSWR from 'swr'
import type { BitcoinData } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useBitcoinData() {
  const { data, error, isLoading, mutate } = useSWR<BitcoinData>(
    '/api/bitcoin',
    fetcher,
    {
      refreshInterval: 60000,
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    }
  )

  return {
    data,
    error,
    isLoading,
    refresh: mutate,
  }
}
