'use client'

import { normalize } from 'path'
import { IconType } from 'react-icons'

interface ButtonProps {
  label: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  outline?: boolean
  danger?: boolean
  small?: boolean
  icon?: IconType
  children?: React.ReactNode
}

const ButtonWfull: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  danger,
  small,
  icon: Icon,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`custom-buttom-radius disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 transition w-full md:relative bottom-0 p-3 
        ${
          outline
            ? 'bg-white'
            : 'bg-green-600 shadow-lg border-2 shadow-black md:shadow-none '
        }
        ${outline ? 'border-gray-600' : 'border-green-600'}
        ${outline ? 'border-2 ' : 'border-1'}
        ${
          outline
            ? 'text-gray-600 text-xl font-semibold'
            : 'text-gray-800 font-semibold'
        }
        ${danger ? 'bg-red-600' : 'bg-green-600'}
        ${danger ? 'border-red-600' : 'border-green-600'}
        
        ${small ? 'bg-white' : 'bg-green-600'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'text-gray-600 text-sm' : 'text-white text-xl'}
        ${small ? 'border-gray-600' : 'border-gray-600'}
        ${small ? 'border-2' : 'border-2'}

        `}>
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-1/1
          "
        />
      )}
      {label}
      {children}
    </button>
  )
}

export default ButtonWfull
