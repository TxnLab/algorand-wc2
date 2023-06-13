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
      <div className="pb-16">
        <Spinner />
      </div>
    )
  }

  if (session) {
    return <Transaction />
  }

  return (
    <div className="mx-auto max-w-7xl pb-16">
      <div className="mx-auto max-w-2xl sm:text-center">
        <h2 className="text-base font-semibold leading-7 text-indigo-400">Get started</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Create a new pairing
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Click the button above and scan the QR code with your wallet app, or copy and paste the
          link. Once connected, a basic pay transaction form will let you send Algos from one of
          your connected accounts.
        </p>
      </div>
    </div>
  )
}
