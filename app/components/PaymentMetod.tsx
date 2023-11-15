import Image from 'next/image'
import { FaCreditCard } from 'react-icons/fa'

import PayPalIcon from '@/public/images/cc-paypal.svg'
import VisaIcon from '@/public/images/cc-visa.svg'
import MasterCardIcon from '@/public/images/cc-mastercard.svg'

interface PaymentMetodProps {
  onSelectPaymentMethod: (method: string) => void
  selectedMethod: string | null
}

const PaymentMetod: React.FC<PaymentMetodProps> = ({
  onSelectPaymentMethod,
  selectedMethod,
}) => {
  const isSelected = (method: string) => selectedMethod === method
  return (
    <div className="md:px-4">
      <div className="mb-2">
        <span className="text-neutral-700 text-xl font-bold inline pr-2">
          Choose Payment Method{' '}
        </span>
        <FaCreditCard
          className="inline text-neutral-700 text-xl mb-2"
          size={24}
        />
      </div>

      <div className="flex flex-row items-center justify-between md:pr-3 md:px-0 px-4 py-1">
        {/* PayPal Icon */}
        <div
          onClick={() => onSelectPaymentMethod('paypal')}
          className={`cursor-pointer hover:opacity-50 transition-all duration-300 ease-in-out ${
            selectedMethod === 'paypal'
              ? 'border-green-500 border-2 p-1 rounded-xl'
              : ''
          }`}>
          <Image
            src={PayPalIcon}
            alt="Pay with PayPal"
            width={80}
            height={90}
          />
        </div>

        {/* Visa and MasterCard Icons Group */}
        <div
          className={`flex items-center cursor-pointer hover:opacity-50 transition-all duration-300 ease-in-out ${
            isSelected('visa') || isSelected('mastercard')
              ? 'border-green-500 border-2 p-1 rounded-xl'
              : ''
          }`}>
          <Image
            src={VisaIcon}
            alt="Pay with Visa"
            width={70}
            height={90}
            onClick={() => onSelectPaymentMethod('visa')}
          />
          <Image
            src={MasterCardIcon}
            alt="Pay with MasterCard"
            width={70}
            height={90}
            onClick={() => onSelectPaymentMethod('mastercard')}
          />
        </div>
      </div>
    </div>
  )
}

export default PaymentMetod
