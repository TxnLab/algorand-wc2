export type AccountBalance = {
  balance: number
  minBalance: number
}

export type AccountBalances = Record<string, AccountBalance | null>

export type SenderOption = {
  id: number
  address: string
  availableBalance: number
}
