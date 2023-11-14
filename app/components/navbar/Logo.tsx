'use client'

interface LogoProps {
  isOpen: boolean
}

import { FaHome } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const Logo: React.FC<LogoProps> = ({ isOpen }) => {
  const router = useRouter()
  return (
    <div>
      {!isOpen && (
      <FaHome
        onClick={() => router.push('/')}
        className="
        bg-gray-100
        text-black-400 
        text-4xl 
        cursor-pointer 
        border-[1px]
        border-black-400
        rounded-full
        p-1.5
        "
      />
      )}
    </div>
  )
}

export default Logo
