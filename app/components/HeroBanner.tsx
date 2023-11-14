'use client'

import { MdOutlineThumbUpOffAlt } from 'react-icons/md'
import { useState } from 'react'

const HeroBanner = () => {
  const [selected, setSelected] = useState(false)

  const handleLike = () => {
    setSelected(!selected)

    setTimeout(() => {
      setSelected(false)
    }
    , 3000)
  }

  return (
    <div className="absolute top-2/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row justify-center text-center gap-2 p-4 bg-opacity-80 bg-white rounded-xl shadow-md w-1/2">
      <div className="flex flex-row justify-center items-center">
        <h2 className="text-gray font-Rajdhani text-32 font-light">
          Short term <b className="font-bold">workspaces</b> at prime{' '}
          <b className="font-bold">locations</b>!
        </h2>
        <span className="pl-2 flex-shrink-0">
          <MdOutlineThumbUpOffAlt
            className={`icon text-4xl cursor-pointer ${
              selected
                ? ' text-green-600 transition'
                : 'text-yellow-400 hover:text-yellow-500 transition'
            }`}
            onClick={handleLike}
          />
        </span>
      </div>
    </div>
  )
}

export default HeroBanner


