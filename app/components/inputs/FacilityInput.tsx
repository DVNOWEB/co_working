'use client'

import { IconType } from "react-icons"

interface FacilityInputProps {
  icon: IconType
  label: string
  selected?: boolean
  onClick: (value: string) => void
}

const FacilityInput: React.FC<FacilityInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
       custom-input-radius flex flex-col gap-3 p-4 border-2 rounded-xl hover:border-neutral-500 transition cursor-pointer ${
       selected ? 'border-neutral-500' : 'border-gray-200'
        } 
      `}
      >
      <Icon size={30} />
      <div className='font-semibold'>
        {label}
      </div>
    </div>
  )
}

export default FacilityInput