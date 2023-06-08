'use client'

import { Web3ModalSign } from '@web3modal/sign-react'

export default function Web3Modal() {
  return (
    <Web3ModalSign
      projectId="c06d4a73c8ac624cefd8b2e64ff8d027"
      metadata={{
        name: 'Algorand + WalletConnect 2.0 Example App',
        description: 'Demonstrates how to use WalletConnect 2.0 with Algorand',
        url: 'https://algorand-wc2.vercel.app',
        icons: ['https://algorand-wc2.vercel.app/logo.png']
      }}
      modalOptions={{
        themeMode: 'light',
        explorerExcludedWalletIds: 'ALL'
      }}
    />
  )
}
