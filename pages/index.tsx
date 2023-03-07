import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import AddressForm from '@/components/google'
import AddressForms from '@/components/maps'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
<div>
<AddressForm onAddressSelect={function (address: any): void {
        throw new Error('Function not implemented.')
      } } />

      {/* <AddressForms /> */}
</div>
  )
}
