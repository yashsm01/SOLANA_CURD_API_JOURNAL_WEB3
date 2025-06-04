'use client'

import { useWalletUiCluster } from '@wallet-ui/react'

export function useCluster() {
  const { cluster } = useWalletUiCluster()

  return {
    cluster: {
      network: cluster.label.toLowerCase(),
      endpoint: cluster.urlOrMoniker,
      ...cluster
    }
  }
}
