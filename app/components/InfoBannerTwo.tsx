'use client'

import Image from 'next/image'
import coffeeIcon from '../../public/images/coffeeIcon.svg'

const InfoBannerTwo = () => {
  return (
    <div className="bg-neutral-800 w-full py-16 md:py-0">
      <div className="flex flex-col md:flex-row m-auto">
        <div className="w-full md:ml-10 md:w-1/3 bg-neutral-800 p-6 md:p-12 flex justify-center md:justify-start items-center">
          <div className="w-36 md:ml-16 md:w-[190px] bg-red-50 rounded-[50%] h-auto pt-6 pb-6 flex flex-col justify-center items-center">
            <Image
              className="object-scale-down w-20 md:w-36"
              src={coffeeIcon}
              alt="coffeeIcon"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-neutral-800 p-6 md:p-12 flex justify-center items-center m-auto">
          <div className="flex justify-center items-center">
            <p className="text-white tracking-wide text-2xl md:text-5xl font-bold font-poppins md:leading-[64px]">
              Do you <span className="text-yellow-400">love coffee</span> as
              much as us? Most of our places have{' '}
              <span className="text-yellow-400">free coffee!</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoBannerTwo
