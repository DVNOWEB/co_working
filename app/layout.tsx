import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import ClientOnly from './components/ClientOnly'
import Navbar from './components/navbar/Navbar'
import RentModal from './components/modals/RentModal'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'

import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'

export const metadata: Metadata = {
  title: 'CO-WORKING',
  description: 'CO-WORKING for digital nomads',
}

const font = Poppins({
  subsets: ['latin-ext'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div>
          {children}
        </div>
      </body>
    </html>
  )
}
