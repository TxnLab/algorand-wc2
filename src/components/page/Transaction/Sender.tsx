import { RadioGroup } from '@headlessui/react'
import { classNames } from '@/utils'
import { AccountBalances, SenderOption } from '@/types/accounts'

interface SenderProps {
  senders: Array<SenderOption>
  balances: AccountBalances
  selected: SenderOption | null
  setSelected: (selected: SenderOption) => void
}

export default function Sender({ senders, balances, selected, setSelected }: SenderProps) {
  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <RadioGroup.Label className="block text-sm font-medium leading-6 text-white">
        Sender
      </RadioGroup.Label>
      <div className="mt-2 space-y-4">
        {senders
          .filter((sender) => balances[sender.address] !== null)
          .map((sender) => (
            <RadioGroup.Option
              key={sender.id}
              value={sender}
              className={({ checked, active }) =>
                classNames(
                  checked ? 'border-transparent' : 'border-white/10',
                  active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
                  sender.availableBalance === 0 ? 'opacity-25 pointer-events-none' : '',
                  'relative block cursor-pointer rounded-lg border bg-white/5 px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between sm:min-w-0'
                )
              }
              disabled={sender.availableBalance === 0}
            >
              {({ active, checked }) => (
                <>
                  <span className="flex items-center min-w-0">
                    <span className="flex flex-col text-sm min-w-0">
                      <RadioGroup.Label
                        as="span"
                        className="font-mono font-medium text-gray-100 truncate"
                      >
                        {sender.address}
                      </RadioGroup.Label>
                    </span>
                  </span>
                  <RadioGroup.Description
                    as="span"
                    className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                  >
                    <span className="font-medium text-gray-100 whitespace-nowrap">
                      {sender.availableBalance} Algos
                    </span>
                  </RadioGroup.Description>
                  <span
                    className={classNames(
                      active ? 'border' : 'border-2',
                      checked ? 'border-indigo-500' : 'border-transparent',
                      'pointer-events-none absolute -inset-px rounded-lg'
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
      </div>
    </RadioGroup>
  )
}
