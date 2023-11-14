'use client'

import { AiOutlineMail } from 'react-icons/ai'
import { FaGlobe } from 'react-icons/fa'
import { PiMapPinLight } from 'react-icons/pi'

interface HeadingProps {
  title: string
  address: string
  email: string
  subtitle?: string
  left?: boolean
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  address,
  email,
  left,
}) => {
  return (
    <div className="flex flex-col">
      <div className="text-4xl font-bold text-gray-700">{title}</div>

      <div className="flex items-baseline gap-2 font-light text-gray-500 mt-2">
        <FaGlobe size={13} />
        {subtitle}
      </div>

      <div className="flex items-baseline gap-2 font-light text-gray-500">
        <PiMapPinLight size={15} />
        {address}
      </div>

      <div className="flex items-baseline gap-2 font-light text-gray-500 mb-2">
        <AiOutlineMail size={13} />
        {email}
      </div>
    </div>
  )
}

export default Heading
