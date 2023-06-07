import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import { classNames } from '@/utils/tailwind'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Algorand + WalletConnect 2.0 Example App',
  description: 'Demonstrates how to use WalletConnect 2.0 with Algorand'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={classNames(inter.className, 'bg-gray-900 min-h-screen')}>
        <Header />
        {children}
      </body>
    </html>
  )
}
