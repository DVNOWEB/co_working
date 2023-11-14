'use client'

import Image from 'next/image'
import imageBennerOne from '../../public/images/InfoBannerOne.png'



const InfoBannerOne = () => {
  return (
    <div className="flex flex-row px-6 flex-wrap">
      <div className="w-full flex flex-wrap justify-center items-center">
        <div className="w-full sm:w-[268px] md:w-[589px] h-auto md:h-[295px] flex justify-center items-center">
          <div className="w-full h-auto">
            <p className="text-black tracking-wide text-3xl sm:text-3xl md:text-5xl font-bold font-poppins leading-[36px] md:leading-[64px]">
              Not sure how long you will stay? We always have{' '}
              <span className="text-teal-500">flexible booking </span>
              <span className="text-black">and </span>
              <span className="text-teal-500">free cancellation!</span>
            </p>
          </div>
        </div>
        <div className="w-full md:w-[483px] h-auto md:h-[571.06px] flex flex-col justify-center items-center">
          <Image
            className="rounded-lg p-2"
            src={imageBennerOne}
            alt="InfoBannerOne"
            width={1200}
            height={800}
            layout="responsive"
          />
        </div>
      </div>
    </div>
  )
}

export default InfoBannerOne


