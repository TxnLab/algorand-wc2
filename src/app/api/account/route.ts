import { NextResponse } from 'next/server'
import algodClient from '../../../lib/algod'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get('address')

  if (!address) {
    return new Response('Missing address', { status: 400 })
  }

  const accountInfo = await algodClient.accountInformation(address).do()

  return NextResponse.json(accountInfo)
}
