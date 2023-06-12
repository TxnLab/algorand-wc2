'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Toaster from '@/components/layout/Toaster'
import { ClientContextProvider } from '@/context/ClientContext'

export default function Providers({ children }: React.PropsWithChildren) {
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ClientContextProvider>{children}</ClientContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

      <Toaster />
    </>
  )
}
