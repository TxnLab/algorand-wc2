'use client'

import Image from 'next/image'
import useHydrated from '@/hooks/useHydrated'
import useWalletConnectClient from '@/hooks/useWalletConnectClient'
import { classNames } from '@/utils'

export default function Header() {
  const { client, isInitializing, connect, disconnect, session } = useWalletConnectClient()

  const isHydrated = useHydrated()

  const renderButton = () => {
    if (session) {
      return (
        <button
          type="button"
          className="rounded-md bg-indigo-500 px-3.5 py-2 sm:px-4 text-sm sm:text-base font-medium text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={disconnect}
          disabled={!client || isInitializing}
        >
          Disconnect
        </button>
      )
    }

    return (
      <button
        type="button"
        className={classNames(
          !isHydrated || isInitializing ? 'invisible' : '',
          'rounded-md bg-indigo-500 px-3.5 py-2 sm:px-4 text-sm sm:text-base font-medium text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
        )}
        onClick={() => connect()}
      >
        Connect wallet
      </button>
    )
  }

  return (
    <header className="bg-gray-900">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Home</span>
            <Image
              src="https://walletconnect.com/_next/static/media/logo_mark.84dd8525.svg"
              alt=""
              width={36}
              height={36}
            />
          </a>
        </div>
        <div className="flex">{renderButton()}</div>
      </nav>
    </header>
  )
}
