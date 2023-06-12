import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { AccountBalances } from '@/types/accounts'

const getAccountBalances = async (addresses: string[]) => {
  const accountRequests = addresses.map((address) => axios.get(`/api/account?address=${address}`))
  const responses = await Promise.allSettled(accountRequests)

  const balances: AccountBalances = {}

  responses.forEach((response, index) => {
    if (response.status === 'fulfilled') {
      const balance = response.value.data.amount
      const minBalance = response.value.data['min-balance']
      balances[addresses[index]] = { balance, minBalance }
    } else {
      balances[addresses[index]] = null
    }
  })

  return balances
}

export default function useBalances(accountStrings: string[]) {
  // Split each `algorand:{chainId}:{address}` string to extract the address
  const addresses = accountStrings.map((account) => account.split(':').pop() as string).sort()

  const { data: balances = {}, isInitialLoading: isFetchingBalances } = useQuery<AccountBalances>({
    queryKey: ['balances', addresses],
    queryFn: () => getAccountBalances(addresses),
    enabled: addresses.length > 0
  })

  return { balances, isFetchingBalances }
}
