if (!process.env.NEXT_PUBLIC_PROJECT_ID)
  throw new Error('`NEXT_PUBLIC_PROJECT_ID` env variable is missing.')

export const DEFAULT_PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID
export const DEFAULT_RELAY_URL = process.env.NEXT_PUBLIC_RELAY_URL

export const DEFAULT_LOGGER = 'debug'

export const DEFAULT_APP_METADATA = {
  name: 'Algorand + WalletConnect 2.0 Example App',
  description: 'Demonstrates how to use WalletConnect 2.0 with Algorand',
  url: 'https://algorand-wc2.vercel.app',
  icons: ['https://algorand-wc2.vercel.app/algo.svg']
}

export const DEFAULT_CHAINS = [
  'algorand:mFgazF-2uRS1tMiL9dsj01hJGySEmPN2',
  'algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDe',
  'algorand:wGHE2Pwdvd7S12BL5FaOP20EGYesN73k'
]

export const DEFAULT_REQUIRED_NAMESPACES = {
  algorand: {
    chains: DEFAULT_CHAINS,
    methods: ['algo_signTxn'],
    events: []
  }
}
