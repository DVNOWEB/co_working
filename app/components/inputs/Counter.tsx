'use client'

import { useCallback } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

interface CounterProps {
  title: string
  subtitle: string
  value: number
  onChange: (value: number) => void
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1)
  }, [onChange, value])

  const onReduce = useCallback(() => {
    if(value === 1) {
      return
    }
    onChange(value - 1)
  }, [value, onChange])

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="form-normal">{title}</div>
        <div className="font-light text-gray-500">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 hover:opacity-80 transition cursor-pointer"
          onClick={onReduce}>
          <AiOutlineMinus size={20} />
        </div>
        <div className="font-light text-xl text-neutral-600">{value}</div>
        <div
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 hover:opacity-80 transition cursor-pointer"
          onClick={onAdd}>
          <AiOutlinePlus size={20} />
        </div>
      </div>
    </div>
  )
}

export default Counter
