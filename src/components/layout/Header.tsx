'use client'

import { useConnect } from '@web3modal/sign-react'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [disabled, setDisabled] = useState(false)
  const { connect, data, error, loading } = useConnect({
    requiredNamespaces: {
      algorand: {
        methods: ['algo_signTxn'],
        chains: ['algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDe'], // Testnet
        events: ['chainChanged', 'accountsChanged']
      }
    }
  })

  const handleConnect = async () => {
    try {
      setDisabled(true)
      const session = await connect()
      console.info(session)
    } catch (err) {
      console.error(err)
    } finally {
      setDisabled(false)
    }
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
        <div className="flex">
          <button
            type="button"
            className="rounded-md bg-indigo-500 px-3.5 py-2 sm:px-4 text-sm sm:text-base font-medium text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-500"
            onClick={handleConnect}
            disabled={disabled}
          >
            Connect wallet
          </button>
        </div>
      </nav>
    </header>
  )
}
