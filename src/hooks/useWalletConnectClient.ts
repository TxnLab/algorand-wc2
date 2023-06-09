import { useContext } from 'react'
import { ClientContext } from '@/context/ClientContext'

export default function useWalletConnectClient() {
  const context = useContext(ClientContext)
  if (context === undefined) {
    throw new Error('useWalletConnectClient must be used within a ClientContextProvider')
  }
  return context
}
