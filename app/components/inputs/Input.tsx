'use client'

import { BiDollar } from 'react-icons/bi'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface InputProps {
  id: string
  label: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disabled ,
  formatPrice,
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-4/6 mt-8 m-auto relative flex ">
      {formatPrice && (
        <BiDollar size={24} className="absolute top-1 left-3 text-gray-400" />
      )}
      <label
        className={`
        absolute
        text-xl
        text-gray-700
        font-semibold
        -translate-y-9
        top-0
        left-0
        errors[id] ? 'text-red-500' : 'text-gray-700'
      `}>
        {label}
      </label>
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
          custom-input-radius
          flex-grow
          w-100
          p-1
          pt-1
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-red-500' : 'border-gray-300'}
          ${errors[id] ? 'focus:border-red-500' : 'focus:border-gray-700'}

          `}
      />
    </div>
  )
}

export default Input