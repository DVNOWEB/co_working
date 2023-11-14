import Image from 'next/image'
import React from 'react'
import reviewIcon from '@/public/images/very_popular.png'
import { AiFillStar } from 'react-icons/ai'

const Reviews = () => {
  return (
    <div className="flex flex-col py-5 ">
      <div className="flex flex-row gap-2 items-center">
        <h3 className="text-2xl font-semibold text-gray-500 mt-2">Reviews</h3>
        <Image src={reviewIcon} alt="review icon" width={30} height={30} />
      </div>
      <div className="py-4">
        <div className="flex flex-row items-center gap-2 pt-8">
          <AiFillStar className="text-yellow-500 text-2xl" />
          <AiFillStar className="text-yellow-500 text-2xl" />
          <AiFillStar className="text-yellow-500 text-2xl" />
          <AiFillStar className="text-yellow-500 text-2xl" />
          <AiFillStar className="text-yellow-500 text-2xl" />
        </div>
        <div className="py-4">
          <p className="text-small font-normal text-zinc-500 pt-2">
            “Chill ambiance to focus and get work done. Restaurants nearby have
            a great variety. Staff is warm and welcoming.“
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-row items-center gap-2">
          <AiFillStar className="text-yellow-500 text-2xl" />
          <AiFillStar className="text-yellow-500 text-2xl" />
          <AiFillStar className="text-yellow-500 text-2xl" />
          <AiFillStar className="text-yellow-500 text-2xl" />
          <AiFillStar className="text-neutral-400 text-2xl" />
        </div>
        <div className="py-4">
          <p className="text-small font-normal text-zinc-500 pt-2">
            “Great place to work and eat! Free coffee and fruits motivated me to
            finish my work. If you are a member, you can still come to work even
            on holidays. The cafe and rooftop lounge are also perfect places to
            take a break and chill out.“
          </p>
        </div>
      </div>
    </div>
  )
}

export default Reviews
