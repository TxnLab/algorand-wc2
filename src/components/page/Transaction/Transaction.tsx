'use client'

import Sender from './Sender'
import useTransaction from './Transaction.hooks'

export default function Transaction() {
  const {
    balances,
    senders,
    sender,
    setSender,
    receiver,
    setReceiver,
    amount,
    setAmount,
    handleFormSubmit
  } = useTransaction()

  return (
    <div className="mx-auto max-w-2xl py-16">
      <form onSubmit={handleFormSubmit}>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base sm:text-lg font-semibold leading-7 text-white">
              Send Transaction
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Send Algos from a connected address
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <div className="mt-2">
                  <Sender
                    senders={senders}
                    balances={balances}
                    selected={sender}
                    setSelected={setSender}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="receiver"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Receiver
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="receiver"
                    id="receiver"
                    autoComplete="receiver"
                    className="block w-full rounded-md border-0 bg-white/5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="amount" className="block text-sm font-medium leading-6 text-white">
                  Amount
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    autoComplete="amount"
                    className="block w-full rounded-md border-0 bg-white/5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-4 py-2.5 font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
