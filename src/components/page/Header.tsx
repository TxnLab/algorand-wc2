export default function PageHeader() {
  return (
    <div className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Algorand + WalletConnect 2.0
        </h2>
        <p className="mt-6 sm:text-lg leading-8 text-gray-300">
          Click the &quot;Connect wallet&quot; button above to get started. Once connected, the{' '}
          <code className="bg-white/10 rounded px-1">session</code> returned by the{' '}
          <code className="bg-white/10 rounded px-1">connect</code> function will be logged to the
          console.
        </p>
      </div>
    </div>
  )
}
