'use client'

import Spinner from '@/components/global/Spinner'
import useHydrated from '@/hooks/useHydrated'
import useWalletConnectClient from '@/hooks/useWalletConnectClient'
import Transaction from './Transaction'

export default function Content() {
  const { session, isInitializing, isFetchingBalances } = useWalletConnectClient()

  const isHydrated = useHydrated()

  if (!isHydrated || isInitializing || isFetchingBalances) {
    return (
      <div className="py-12">
        <Spinner />
      </div>
    )
  }

  if (session) {
    return <Transaction />
  }

  return (
    <p className="max-w-2xl mx-auto mt-12 sm:text-lg text-center text-gray-300">
      Click the &quot;Connect wallet&quot; button above to get started. Once connected, you will be
      able to send a basic pay transaction from a connected account.
    </p>
  )
}
