import algosdk, { Transaction } from 'algosdk'
import { JsonRpcRequest, SignerTransaction, WalletTransaction } from '@/types/transactions'

const getPayloadId = (): number => {
  const date = Date.now() * Math.pow(10, 3)
  const extra = Math.floor(Math.random() * Math.pow(10, 3))
  return date + extra
}

export const formatJsonRpcRequest = <T = any>(method: string, params: T): JsonRpcRequest => {
  return {
    id: getPayloadId(),
    jsonrpc: '2.0',
    method,
    params
  }
}

export const encodeUnsignedTransactionInBase64 = (txn: Transaction): string => {
  return Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64')
}

export const base64ToUint8Array = (data: string) => {
  return Uint8Array.from(window.atob(data), (value) => value.charCodeAt(0))
}

export function composeTransaction(transaction: SignerTransaction, signerAddress?: string) {
  let signers: WalletTransaction['signers']

  if (signerAddress && !(transaction.signers || []).includes(signerAddress)) {
    signers = []
  }

  const txnRequestParams: WalletTransaction = {
    txn: encodeUnsignedTransactionInBase64(transaction.txn)
  }

  if (Array.isArray(signers)) {
    txnRequestParams.signers = signers
  }

  if (transaction.authAddr) {
    txnRequestParams.authAddr = transaction.authAddr
  }

  if (transaction.message) {
    txnRequestParams.message = transaction.message
  }

  if (transaction.msig) {
    txnRequestParams.msig = transaction.msig
  }

  return txnRequestParams
}

export const getSignTxnRequestParams = (
  txns: SignerTransaction[] | SignerTransaction[][],
  signerAddress?: string
) => {
  // If `txns` is a single array, convert it to an array of arrays
  if (!Array.isArray(txns[0])) {
    txns = [txns as SignerTransaction[]]
  }

  return (txns as SignerTransaction[][]).flatMap((txGroup) =>
    txGroup.map<WalletTransaction>((txGroupDetail) =>
      composeTransaction(txGroupDetail, signerAddress)
    )
  )
}
