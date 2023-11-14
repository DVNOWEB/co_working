'use client'

import hero1 from '@/public/images/hero1.jpg'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className="relative">
      {/* Image placed at the top */}
      <Image
        className="w-full lg:h-[80vh] md:h-[60vh] sm:h-[60vh] h-[60vh] object-cover object-top"
        src={hero1}
        alt="Hero Image"
      />

      {/* Dark overlay to make the image slightly darker */}
      <div className="absolute inset-0 bg-gray opacity-10"></div>

      {/* Text centered on top of the image */}
      <div className="absolute inset-0 flex items-center justify-center pb-36">
        <div className="text-center text-white relative">
          <h1 className="text-white font-extrabold mix-blend-overlay hero-text">
            CO-WORKING
          </h1>
          <span className="text-white font-semibold tracking-wider mix-blend-difference hero-span absolute bottom-2 sm:bottom-5 md:bottom-7 right-0">
            BANGKOK
          </span>
        </div>
      </div>
    </div>
  )
}

export default Hero


