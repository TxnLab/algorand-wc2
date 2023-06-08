import Image from 'next/image'
import { VscGithub } from 'react-icons/vsc'

export default function PageHeader() {
  return (
    <div className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Algorand + WalletConnect 2.0
        </h2>
        <p className="mt-6 sm:text-lg text-gray-300">
          Click the &quot;Connect wallet&quot; button above to get started. Once connected, the
          returned <code className="bg-white/10 rounded py-0.5 px-1">session</code> will be logged
          to the console.
        </p>
        <p className="mt-12 sm:mt-16 space-y-4 sm:flex sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4">
          <a
            href="https://github.com/TxnLab/algorand-wc2"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-x-2 rounded-md bg-white/10 px-4 py-2.5 font-medium text-white shadow-sm sm:w-auto hover:bg-white/20"
          >
            <VscGithub className="-ml-0.5 h-5 w-5" />
            View on GitHub
          </a>
          <a
            href="https://docs.walletconnect.com/2.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-x-2 rounded-md bg-white/10 px-4 py-2.5 font-medium text-white shadow-sm sm:w-auto hover:bg-white/20"
          >
            <span className="relative">
              <Image
                src="https://walletconnect.com/_next/static/media/logo_mark.84dd8525.svg"
                alt=""
                width={24}
                height={24}
              />
            </span>
            WalletConnect Docs
          </a>
        </p>
      </div>
    </div>
  )
}
