import algosdk, { algosToMicroalgos, isValidAddress, microalgosToAlgos } from 'algosdk'
import { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import useWalletConnectClient from '@/hooks/useWalletConnectClient'
import algodClient from '@/lib/algod'
import { base64ToUint8Array, formatJsonRpcRequest, getSignTxnRequestParams } from '@/utils'
import { ALGORAND_CHAINS } from '@/constants'
import { SenderOption } from '@/types/accounts'

export default function useTransaction() {
  const { client, session, accounts, balances } = useWalletConnectClient()

  const getBalance = useCallback(
    (address: string) => {
      const balance = balances[address]?.balance as number
      const minBalance = balances[address]?.minBalance as number
      const available = balance - minBalance
      if (available <= 0) {
        return 0
      }
      try {
        return microalgosToAlgos(available)
      } catch (error) {
        return 0
      }
    },
    [balances]
  )

  const senders = useMemo(
    () =>
      accounts.map((account, id) => {
        const address = account.split(':').pop()!
        return {
          id,
          address,
          availableBalance: getBalance(address)
        }
      }),
    [accounts, getBalance]
  )

  const [sender, setSender] = useState<SenderOption | null>(() => {
    const index = senders.findIndex((sender) => sender.availableBalance > 0)
    if (index === -1) {
      return null
    }
    return senders[index]
  })

  const [receiver, setReceiver] = useState<string>('')
  const [amount, setAmount] = useState<string>('')

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    // matches integers or floats up to 6 decimal places
    const regExp = /^\d+(?:\.\d{0,6})?$/gm

    if (value !== '' && value.match(regExp) === null) {
      return
    }

    setAmount(value)
  }

  const isReceiverValid = useMemo(() => isValidAddress(receiver), [receiver])
  const isReceiverInvalid = useMemo(
    () => receiver !== '' && !isReceiverValid,
    [isReceiverValid, receiver]
  )

  const isAmountValid = useMemo(() => {
    const maxAmount = (sender?.availableBalance ?? 0) - 0.001
    return amount !== '' && Number(amount) <= maxAmount
  }, [amount, sender?.availableBalance])

  const isAmountInvalid = useMemo(() => amount !== '' && !isAmountValid, [amount, isAmountValid])

  const isFormValid = useMemo(() => {
    const isSenderValid = isValidAddress(sender?.address ?? '')
    return isSenderValid && isReceiverValid && isAmountValid
  }, [isAmountValid, isReceiverValid, sender])

  const TOAST_ID = 'transaction'

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!client || !session || !sender || !isFormValid) {
      return
    }

    try {
      const from = sender.address
      const to = receiver
      const suggestedParams = await algodClient.getTransactionParams().do()

      const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from,
        to,
        amount: algosToMicroalgos(Number(amount)),
        suggestedParams
      })

      const signTxnParams = getSignTxnRequestParams([{ txn: transaction }])
      const request = formatJsonRpcRequest('algo_signTxn', [signTxnParams])

      toast.loading('Waiting for user to sign...', { id: TOAST_ID, duration: Infinity })

      const response = await client.request<(string | number[])[]>({
        chainId: ALGORAND_CHAINS.Testnet,
        topic: session.topic,
        request
      })

      const signedTxns =
        typeof response[0] === 'string'
          ? (response as string[]).map(base64ToUint8Array)
          : (response as number[][]).map((item) => Uint8Array.from(item))

      toast.loading('Sending transaction...', { id: TOAST_ID, duration: Infinity })

      const sentTransaction = await algodClient.sendRawTransaction(signedTxns).do()

      toast.success('Transaction successful!', { id: TOAST_ID, duration: 5000 })
      console.log(`Successfully sent transaction. Transaction ID: ${sentTransaction.txId}`)
    } catch (error) {
      toast.error('Transaction failed', { id: TOAST_ID })
      console.log('error', error)
    }
  }

  return {
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
  }
}

function useTxnToasts(id = 'txn') {
  const loadingToast = useCallback(
    (message: string) => {
      toast.loading(message, { id, duration: Infinity })
    },
    [id]
  )

  const successToast = useCallback(
    (message: string) => {
      toast.success(message, { id, duration: 5000 })
    },
    [id]
  )

  const errorToast = useCallback(
    (message: string) => {
      toast.error(message, { id })
    },
    [id]
  )

  return {
    loadingToast,
    successToast,
    errorToast
  }
}
