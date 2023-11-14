import iconfooter from '@/public/images/iconfooter.png'
import iconfooter1 from '@/public/images/iconfooter1.png'

import Image from 'next/image'
import { FaFacebook, FaInstagram, FaPinterest, FaRegCopyright } from 'react-icons/fa'


const Footer = () => {
  return (
    <div className="flex flex-row items-center">
      <div className="footer-bg w-full responsive">
        {/* HEADING DIV */}
        <div className="flex flex-row justify-start xs:ml-[100px] p-6 w-46 md:w-[683px] md:pl-20">
          <p className="text-white tracking-wide pt-10 text-3xl md:text-5xl font-bold font-poppins md:leading-[64px]">
            Tired of{' '}
            <span className="text-yellow-400">working in the jungle?</span>{' '}
            Enjoy our fast wifi!
          </p>
        </div>

        {/* ROW DIV *3 */}

        <div className="w-full flex flex-col lg:flex-row justify-evenly flex-wrap pl-6 md:pl-0 md:pt-20">
          <div className="flex flex-wrap flex-col text-white font-bold text-2xl mb-2">
            CUSTOMER CHOICE
            <div className="font-light text-lg">
              <p className="md:w-[264px]">
                Our customers has spoken, asking us to provide clear information
                about what facilities a co-working have. We listened and created
                logos for you, all for you to receive the information in a
                smooth and fast way with us at CO-Working Bangkok
              </p>
            </div>
          </div>

          <div className="flex flex-wrap flex-col text-white font-bold text-2xl mb-2">
            SOCIALS
            <div className="font-light text-lg ">
              <p className="w-[296px]">
                Our customers generally likes being socials, therefore some of
                our places arranges:
              </p>
              <p className="w-[296px]">
                <span> - Gatherings</span>
                <span> - Afterworks</span>
                <span> - Movienights</span>
                <span> - Pool</span>
                <span> - Pingpong</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap flex-col text-white font-bold text-2xl mb-2">
            EXTRAS
            <div className="font-light text-lg">
              <p className="w-[294px] md:h-auto">Free cancelation</p>
              <p className="w-[294px] md:h-auto">Flexibel bookings</p>
            </div>
            <div>
              CONTACT
              <div className="font-light text-lg">
                <p className="w-[264px]">
                  <span>info@coworkingbangkok.com</span>
                  <span>
                    <a href="mailto:info@coworkingbangkok.com" />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* ROW DIV SPACE-BETWINE *2  */}

        <div className="flex flex-row justify-between items-center m-6 pt-6 md:px-16 text-white font-bold text-2xl">
          <div className="flex flex-row gap-2">
            <Image
              src={iconfooter}
              alt="icon footer"
              width={120}
              height={50}
              className="object-contain"
            />
            <Image
              src={iconfooter1}
              alt="icon footer"
              width={140}
              height={50}
              className="object-contain"
            />
          </div>
          <div className="flex flex-row gap-2">
            <FaInstagram className="text-3xl md:text-4xl" />
            <FaFacebook className="text-3xl md:text-4xl" />
            <FaPinterest className="text-3xl md:text-4xl" />
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="flex flex-row justify-center text-white font-medium gap-3 pb-5">
         <FaRegCopyright size={24}/><span>CO-WORKING Bangkok 2023</span>
        </div>
      </div>
    </div>
  )
}

export default Footer
