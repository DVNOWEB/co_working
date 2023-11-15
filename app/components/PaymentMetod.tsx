'use client'

import Image from 'next/image'
import { FaCreditCard } from 'react-icons/fa'

import PayPalIcon from '@/public/images/cc-paypal.svg'
import VisaIcon from '@/public/images/cc-visa.svg'
import MasterCardIcon from '@/public/images/cc-mastercard.svg'

const PaymentMetod = () => {
  return (
    <div className="px-4">
      <div className='mb-2'>
        <span className="text-neutral-700 text-xl font-bold inline pr-2">
          Choose Payment Method{' '}
        </span>
        <FaCreditCard
          className="inline text-neutral-700 text-xl mb-2"
          size={24}
        />
      </div>

      <div className="flex flex-row justify-between md:pr-3">
        <div className="active:border-2 active:text-green-700">
          <Image
            className="hover:opacity-50 transition-all duration-300 ease-in-out"
            src={PayPalIcon}
            alt="Pay with PayPal"
            width={90}
            height={90}
          />
        </div>
        <div className="flex flex-row items-center justify-between active:border-2 active:text-green-700">
          <Image
            className="hover:opacity-50 transition-all duration-300 ease-in-out"
            src={VisaIcon}
            alt="Pay with Visa"
            width={80}
            height={80}
          />
          <Image
            className="hover:opacity-50 transition-all duration-300 ease-in-out"
            src={MasterCardIcon}
            alt="Pay with MasterCard"
            width={80}
            height={80}
          />
        </div>
      </div>
    </div>
  )
}

export default PaymentMetod
