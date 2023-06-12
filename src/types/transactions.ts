import { Transaction } from 'algosdk'

export interface MultisigMetadata {
  version: number
  threshold: number
  addrs: string[]
}

export interface SignerTransaction {
  txn: Transaction
  authAddr?: string
  msig?: MultisigMetadata
  signers?: string[]
  message?: string
}

export interface WalletTransaction {
  txn: string
  authAddr?: string
  msig?: MultisigMetadata
  signers?: string[]
  message?: string
}

export interface SignTxnOpts {
  message?: string
  // other options may be present, but are not standard
}

export type SignTxnParams = [WalletTransaction[], SignTxnOpts?]

export interface JsonRpcRequest<T = any> {
  id: number
  jsonrpc: string
  method: string
  params: T
}
