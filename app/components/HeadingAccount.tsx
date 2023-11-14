'use client'

import { FaUser } from "react-icons/fa"
import { GoDotFill } from "react-icons/go"

interface HeadingProps {
  title: string
  subtitle?: string
}

const HeadingAccount: React.FC<HeadingProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="text-4xl md:text-2xl font-bold text-gray-700">
        <FaUser className="inline-block align-baseline mr-2" size={20} />
        {title}
      </div>
      <div className="font-bold text-gray-700 mt-2">
        <GoDotFill
          className="inline-block align-center mr-2 text-green-400"
          size={20}
        />
        {subtitle}
      </div>
    </div>
  )
}

export default HeadingAccount
