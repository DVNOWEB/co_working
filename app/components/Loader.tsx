'use client'

import { PuffLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[70vh]">
      <PuffLoader color="green" size={100} />
    </div>
  )
}

export default Loader