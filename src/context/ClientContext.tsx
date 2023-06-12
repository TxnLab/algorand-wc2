'use client'

import Client from '@walletconnect/sign-client'
import { PairingTypes, SessionTypes } from '@walletconnect/types'
import { getAppMetadata, getSdkError } from '@walletconnect/utils'
import { Web3Modal } from '@web3modal/standalone'
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useBalances from '@/hooks/useBalances'
import {
  DEFAULT_APP_METADATA,
  DEFAULT_CHAINS,
  DEFAULT_LOGGER,
  DEFAULT_PROJECT_ID,
  DEFAULT_RELAY_URL,
  DEFAULT_REQUIRED_NAMESPACES
} from '@/constants'
import { AccountBalances } from '@/types/accounts'

interface IContext {
  client: Client | undefined
  session: SessionTypes.Struct | undefined
  connect: (pairing?: { topic: string }) => Promise<void>
  disconnect: () => Promise<void>
  isInitializing: boolean
  relayerRegion: string
  pairings: PairingTypes.Struct[]
  accounts: string[]
  balances: AccountBalances
  isFetchingBalances: boolean
  setRelayerRegion: any
}

export const ClientContext = createContext<IContext>({} as IContext)

const web3Modal = new Web3Modal({
  projectId: DEFAULT_PROJECT_ID!,
  themeMode: 'light',
  walletConnectVersion: 2,
  // explorerRecommendedWalletIds: [
  //   '5864e2ced7c293ed18ac35e0db085c09ed567d67346ccb6f58a0327a75137489'
  // ],
  explorerExcludedWalletIds: 'ALL'
})

export const ClientContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState<Client>()
  const [pairings, setPairings] = useState<PairingTypes.Struct[]>([])
  const [session, setSession] = useState<SessionTypes.Struct>()

  const [isInitializing, setIsInitializing] = useState(false)
  const prevRelayerValue = useRef<string>('')

  const [accounts, setAccounts] = useState<string[]>([])
  const [relayerRegion, setRelayerRegion] = useState<string>(DEFAULT_RELAY_URL!)

  const { balances, isFetchingBalances } = useBalances(accounts)

  const reset = () => {
    setSession(undefined)
    setAccounts([])
    setRelayerRegion(DEFAULT_RELAY_URL!)
  }

  const onSessionConnected = useCallback(async (session: SessionTypes.Struct) => {
    // temporary fix to filter duplicate accounts from chains I'm not requesting
    let _session = { ...session }
    _session.namespaces.algorand.accounts = _session.namespaces.algorand.accounts.filter(
      (account) => DEFAULT_CHAINS.some((chain) => account.startsWith(chain))
    )

    const allAccounts = Object.values(_session.namespaces)
      .map((namespace) => namespace.accounts)
      .flat()

    setSession(_session)
    setAccounts(allAccounts)
  }, [])

  const connect = useCallback(
    async (pairing?: { topic: string }) => {
      if (typeof client === 'undefined') {
        throw new Error('WalletConnect is not initialized')
      }

      try {
        const { uri, approval } = await client.connect({
          pairingTopic: pairing?.topic,
          requiredNamespaces: DEFAULT_REQUIRED_NAMESPACES
        })

        if (uri) {
          web3Modal.openModal({ uri, standaloneChains: DEFAULT_CHAINS })
        }

        const session = await approval()
        await onSessionConnected(session)

        setPairings(client.pairing.getAll({ active: true }))
      } catch (error) {
        console.error(error)
      } finally {
        web3Modal.closeModal()
      }
    },
    [client, onSessionConnected]
  )

  const disconnect = useCallback(async () => {
    if (typeof client === 'undefined') {
      throw new Error('WalletConnect is not initialized')
    }
    if (typeof session === 'undefined') {
      throw new Error('Session is not connected')
    }

    try {
      await client.disconnect({
        topic: session.topic,
        reason: getSdkError('USER_DISCONNECTED')
      })
    } catch (error) {
      console.error('SignClient.disconnect failed:', error)
    } finally {
      reset()
    }
  }, [client, session])

  const subscribeToEvents = useCallback(
    async (client: Client) => {
      if (typeof client === undefined) {
        throw new Error('WalletConnect is not initialized')
      }

      client.on('session_event', (args) => {
        console.log('EVENT', 'session_event', args)
      })

      client.on('session_update', ({ topic, params }) => {
        console.log('EVENT', 'session_update', { topic, params })
        const { namespaces } = params
        const session = client.session.get(topic)
        const updatedSession = { ...session, namespaces }
        onSessionConnected(updatedSession)
      })

      client.on('session_delete', () => {
        console.log('EVENT', 'session_delete')
        reset()
      })
    },
    [onSessionConnected]
  )

  const checkPersistedState = useCallback(
    async (client: Client) => {
      if (typeof client === 'undefined') {
        throw new Error('WalletConnect is not initialized')
      }
      setPairings(client.pairing.getAll({ active: true }))

      if (typeof session !== 'undefined') return

      if (client.session.length) {
        const lastKeyIndex = client.session.keys.length - 1
        const restoredSession = client.session.get(client.session.keys[lastKeyIndex])
        await onSessionConnected(restoredSession)
        return restoredSession
      }
    },
    [onSessionConnected, session]
  )

  const createClient = useCallback(async () => {
    try {
      setIsInitializing(true)

      const client = await Client.init({
        logger: DEFAULT_LOGGER,
        relayUrl: relayerRegion,
        projectId: DEFAULT_PROJECT_ID!,
        metadata: getAppMetadata() || DEFAULT_APP_METADATA
      })

      setClient(client)
      prevRelayerValue.current = relayerRegion
      await subscribeToEvents(client)
      await checkPersistedState(client)
    } catch (error) {
      throw error
    } finally {
      setIsInitializing(false)
    }
  }, [checkPersistedState, relayerRegion, subscribeToEvents])

  useEffect(() => {
    if (!client) {
      createClient()
    } else if (prevRelayerValue.current !== relayerRegion) {
      client.core.relayer.restartTransport(relayerRegion)
      prevRelayerValue.current = relayerRegion
    }
  }, [client, createClient, relayerRegion])

  const contextValue = useMemo(
    () => ({
      accounts,
      balances,
      client,
      connect,
      disconnect,
      isFetchingBalances,
      isInitializing,
      pairings,
      relayerRegion,
      session,
      setRelayerRegion
    }),
    [
      accounts,
      balances,
      client,
      connect,
      disconnect,
      isFetchingBalances,
      isInitializing,
      pairings,
      relayerRegion,
      session,
      setRelayerRegion
    ]
  )

  return (
    <ClientContext.Provider
      value={{
        ...contextValue
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}
