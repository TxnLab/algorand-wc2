# Algorand + WalletConnect 2.0

🔗 Live demo - https://algorand-wc2.vercel.app/

## Overview

This is an example implementation of a React dApp using the standalone client for [WalletConnect](https://docs.walletconnect.com/2.0) v2 and [Web3Modal](https://web3modal.com/) to:

- handle pairings
- manage sessions
- send JSON-RPC requests to a paired wallet

It is built using [Next.js](https://nextjs.org/) v13 (App router) and incorporates modern tooling.

<!-- 1. Connect a wallet with a QR code using the new [Web3Modal](https://web3modal.com/) library
2. Sign transactions using the [Sign API](https://docs.walletconnect.com/2.0/web/sign/dapp-usage) -->

## Key Components

### WalletConnect client

This implementation creates a React Context to manage the WalletConnect client and session state:

- [/src/context/ClientContext.tsx](https://github.com/TxnLab/algorand-wc2/blob/main/src/context/ClientContext.tsx)

The client is initialized with a unique project ID, which can be obtained from [WalletConnect Cloud](https://cloud.walletconnect.com/).

```ts
import Client from '@walletconnect/sign-client'

const client = await Client.init({
  projectId: '<YOUR_PROJECT_ID>',
  // optional parameters
  relayUrl: '<YOUR RELAY URL>',
  metadata: {
    name: 'Example Dapp',
    description: 'Example Dapp',
    url: '#',
    icons: ['https://walletconnect.com/walletconnect-logo.png']
  }
})
```

### Web3Modal

[Web3Modal](https://web3modal.com/) is used to display the QR code or link to pair a wallet.

By default it will suggest a variety of Ethereum wallets, but setting `explorerExcludedWalletIds` to `'ALL'` will disable this behavior. A full description of the available options can be found in the [documentation](https://docs.walletconnect.com/2.0/web/web3modal/react/sign-api/options).

```ts
import { Web3Modal } from '@web3modal/standalone'

const web3Modal = new Web3Modal({
  projectId: '<YOUR_PROJECT_ID>',
  themeMode: 'light',
  walletConnectVersion: 2,
  explorerExcludedWalletIds: 'ALL'
})
```

### Signing Requests

The [Sign API](https://docs.walletconnect.com/2.0/web/sign/dapp-usage) is used to sign transactions, which are sent to the paired wallet as a JSON-RPC request. Algorand wallets currently support a single RPC method, `algo_signTxn`, which accepts an array of transaction objects for `params`.

```ts
// Simplified example

const request = {
  id: 1, // unique integer
  jsonrpc: '2.0',
  method: 'algo_signTxn',
  params: [
    {
      txn: '<BASE64_ENCODED_TRANSACTION>'
      // optional properties
    }
    // other transaction objects
  ]
}

const signedTxns = await client.request({
  chainId: 'algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDe', // Algorand Testnet
  topic: session.topic,
  request
})

const result = await algodClient.sendRawTransaction(signedTxns).do()
```

The signing logic for the simple pay transaction in this example can be found in:

- [/src/components/page/Transaction/Transaction.hooks.ts](https://github.com/TxnLab/algorand-wc2/blob/main/src/components/page/Transaction/Transaction.hooks.ts)

More transaction examples will be added soon.

## Local Development

Install the app's dependencies:

```bash
pnpm install
```

Set up your local environment variables:

```bash
cp .env.local.example .env.local
```

Your `.env.local` file now contains the following environment variables:

- `NEXT_PUBLIC_PROJECT_ID` (placeholder) - You can generate your own project ID at https://cloud.walletconnect.com
- `NEXT_PUBLIC_RELAY_URL` (already set) - You can use the default relay server at `wss://relay.walletconnect.org`

You may also set the following optional environment variables:

- `NEXT_PUBLIC_NODE_URL` - Defaults to `https://testnet-api.algonode.cloud`
- `NEXT_PUBLIC_NODE_PORT` - Defaults to `443`
- `NEXT_PUBLIC_NODE_TOKEN` - Defaults to `''`

Start the development server:

```bash
pnpm run dev
```

## Support

If you have questions or need further guidance on migrating your Algorand dApp to WalletConnect 2.0, please join the Algorand Discord. The `#wallet-connect` channel is dedicated to discussions related to WalletConnect on Algorand.

[Join Algorand Discord](https://discord.com/invite/algorand)

## Author

This example project was created by Doug Richar ([doug.algo](https://doug.algo.xyz)). You can reach me on Twitter [@drichar](https://twitter.com/drichar).
