'use client'

import { HiCheck, HiExclamationCircle } from 'react-icons/hi2'
import AlgoSymbol from '@/components/global/AlgoSymbol'
import { classNames } from '@/utils'
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
    handleAmountChange,
    handleFormSubmit,
    isReceiverValid,
    isReceiverInvalid,
    isAmountValid,
    isAmountInvalid,
    isFormValid
  } = useTransaction()

  return (
    <div className="mx-auto max-w-2xl pb-12">
      <form onSubmit={handleFormSubmit}>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <h2 className="text-lg md:text-xl font-semibold text-white">Pay Transaction</h2>
            <p className="mt-1 text-sm text-white/50">Send Algos from a connected account</p>

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
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="receiver"
                    id="receiver"
                    autoComplete="receiver"
                    className={classNames(
                      isReceiverInvalid
                        ? 'bg-red-600/20 ring-red-700 focus:ring-red-500'
                        : 'bg-white/5 ring-white/10 focus:ring-indigo-500',
                      'block w-full rounded-md border-0 py-2.5 pl-4 pr-10 text-white font-mono ring-1 ring-inset focus:ring-2 focus:ring-inset'
                    )}
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                    aria-invalid={isReceiverInvalid}
                    aria-describedby="receiver-error"
                  />
                  {isReceiverValid ? (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <HiCheck className="h-5 w-5 text-indigo-500" aria-hidden="true" />
                    </div>
                  ) : isReceiverInvalid ? (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <HiExclamationCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                  ) : null}
                </div>
                {isReceiverInvalid && (
                  <p className="mt-2 text-sm text-red-500" id="receiver-error">
                    Invalid Algorand account.
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <label htmlFor="amount" className="block text-sm font-medium leading-6 text-white">
                  Amount
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <span className="text-white/50">
                      <AlgoSymbol />
                    </span>
                  </div>
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    className={classNames(
                      isAmountInvalid
                        ? 'bg-red-600/20 ring-red-700 focus:ring-red-500'
                        : 'bg-white/5 ring-white/10 focus:ring-indigo-500',
                      'block w-full rounded-md border-0 py-2.5 pl-9 pr-10 text-white font-mono ring-1 ring-inset focus:ring-2 focus:ring-inset'
                    )}
                    placeholder="0.000000"
                    value={amount}
                    onChange={handleAmountChange}
                    aria-invalid={isAmountInvalid}
                    aria-describedby="amount-error"
                  />
                  {isAmountValid ? (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <HiCheck className="h-5 w-5 text-indigo-500" aria-hidden="true" />
                    </div>
                  ) : isAmountInvalid ? (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <HiExclamationCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                  ) : null}
                </div>
                {isAmountInvalid && (
                  <p className="mt-2 text-sm text-red-500" id="amount-error">
                    Amount exceeds available balance.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-4 py-2.5 font-medium text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-25 disabled:hover:bg-indigo-500"
            disabled={!isFormValid}
          >
            Send Algos
          </button>
        </div>
      </form>
    </div>
  )
}
