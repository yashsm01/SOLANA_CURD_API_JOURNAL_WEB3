'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
import { createSolanaDevnet, createSolanaLocalnet, createWalletUiConfig, WalletUi, useWalletUi } from '@wallet-ui/react'
import '@wallet-ui/tailwind/index.css'

export const WalletButton = dynamic(async () => (await import('@wallet-ui/react')).WalletUiDropdown, {
  ssr: false,
})
export const ClusterButton = dynamic(async () => (await import('@wallet-ui/react')).WalletUiClusterDropdown, {
  ssr: false,
})

const config = createWalletUiConfig({
  clusters: [createSolanaDevnet(), createSolanaLocalnet()],
})

export function SolanaProvider({ children }: { children: ReactNode }) {
  return <WalletUi config={config}>{children}</WalletUi>
}

export function useAnchorProvider() {
  const { wallet, client, account } = useWalletUi()

  // Return a provider that works with both mock and real Anchor programs
  return {
    wallet: wallet || null,
    client: client,
    connection: client,
    // For real Anchor provider compatibility
    publicKey: account?.address ? account.address : null,
    connected: !!account?.address
  }
}
