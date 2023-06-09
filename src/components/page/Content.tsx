'use client'

import useWalletConnectClient from '@/hooks/useWalletConnectClient'

export default function Content() {
  const { session } = useWalletConnectClient()

  if (session) {
    return (
      <>
        <div className="mt-12 border-b border-white/10 pb-4">
          <h3 className="sm:text-lg font-semibold leading-6 text-gray-100">Session</h3>
        </div>
        <pre className="mt-6 p-6 bg-white/5 text-white font-mono text-xs sm:text-sm rounded-lg overflow-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </>
    )
  }

  return (
    <p className="max-w-2xl mx-auto mt-12 sm:text-lg text-center text-gray-300">
      Click the &quot;Connect wallet&quot; button above to get started. Once connected, the returned{' '}
      <code className="bg-white/10 rounded py-0.5 px-1">session</code> will be printed here.
    </p>
  )
}
