'use client'

import hero1 from '@/public/images/hero1.jpg'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className="relative flex flex-col">
      <Image
        className="w-full lg:h-[70vh] md:h-[60vh] sm:h-[60vh] h-[60vh] object-cover object-top"
        src={hero1}
        alt="Hero Image"
        priority
      />

      <div className="absolute top-60 inset-0 flex justify-center">
        <div className="text-center text-white relative responsive">
          <h1 className="text-white font-extrabold relative mix-overlay hero-text">
            CO-WORKING
            <span className="text-center absolute font-semibold tracking-wider mix-blend-difference hero-span bottom-3 sm:bottom-5 md:bottom-6 right-0">
              BANGKOK
            </span>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Hero


