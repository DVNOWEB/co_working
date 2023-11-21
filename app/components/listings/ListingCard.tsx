'use client'

import { useRouter } from 'next/navigation'
import { Listing, Reservation } from '@prisma/client'

import { SafeReservation, SafeUser } from '@/app/types'
import useCountries from '@/app/hooks/useCountries'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'
import Image from 'next/image'

import { FaStar } from 'react-icons/fa'
import { SlLocationPin } from 'react-icons/sl'
import { AiOutlineWifi } from 'react-icons/ai'
import { CgGym } from 'react-icons/cg'
import { FaCoffee } from 'react-icons/fa'
import { BiRestaurant } from 'react-icons/bi'
import { AiOutlineSafetyCertificate } from 'react-icons/ai'
import { MdLocationCity } from 'react-icons/md'
import { MdWineBar } from 'react-icons/md'
import { TbToolsKitchen2 } from 'react-icons/tb'
import { GrLounge } from 'react-icons/gr'
import { LuMonitorCheck } from 'react-icons/lu'
import Button from '../Button'

interface ListingCardProps {
  data: Listing
  reservation?: SafeReservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: SafeUser | null
  startDelay?: number
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
  startDelay = 0,
}) => {
  const router = useRouter()
  const { getByValue } = useCountries()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const location = getByValue(data.locationValue)

  const facilityIcons = {
    Wifi: <AiOutlineWifi size={22} />,
    Gym: <CgGym size={22} />,
    Coffee: <FaCoffee size={22} />,
    Restaurant: <BiRestaurant size={22} />,
    Safety: <AiOutlineSafetyCertificate size={22} />,
    Location: <MdLocationCity size={22} />,
    Bar: <MdWineBar size={22} />,
    Technology: <LuMonitorCheck size={22} />,
    Kitchen: <TbToolsKitchen2 size={22} />,
    Lounge: <GrLounge size={22} />,
  }

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) {
        return
      }
      onAction?.(actionId)
    },
    [onAction, actionId, disabled]
  )

  useEffect(() => {
    
    const getRandomImageIndex = () => {
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * data.images.length)
      } while (newIndex === currentImageIndex)
      return newIndex
    }

    let intervalId: number | undefined

    const timeoutId = setTimeout(() => {
      intervalId = window.setInterval(() => {
        setCurrentImageIndex(getRandomImageIndex())
      }, 6000) as unknown as number 
    }, startDelay)

    return () => {
      clearTimeout(timeoutId)
      if (intervalId !== undefined) {
        clearInterval(intervalId)
      }
    }
  }, [currentImageIndex, data.images.length, startDelay])


  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }

    return data.price
  }, [reservation, data])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  return (
    // Card layout
    <div
      onClick={() => {
        router.push(`/listings/${data.id}`)
      }}
      className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2">
        <div className="aspect-auto h-[598px] relative overflow-hidden custom-card-border-radius">
          <Image
            fill
            alt="Listing"
            src={data.images[currentImageIndex]}
            className="h-[598px] absolute object-cover"
          />
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-white custom-input-radius px-2 py-1">
            <FaStar className="text-yellow-500" />
            <span className="text-gray-600">4.8</span>
          </div>
          {/* Info layout */}

          <div className="h-[249px] bg-gradient-to-b from-white to-neutral-900-opacity-100 overflow-hidden rounded-tr-[35px] rounded-bl-[35px] absolute bottom-2 left-5 right-5">
            <div className="flex flex-col font-semibold text-2xl bg-gradient-to-b from-white opacity-100 ">
              <h3 className="p-6 pb-2">{data.title}</h3>
              <div className="flex flex-row pl-6">
                <SlLocationPin />
                <span className="text-zinc-700 text-lg font-medium pl-1 rajdhani-font">
                  {location?.label}, {location?.region}
                </span>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center p-6 mt-3 gap-2">
              <div className="flex flex-wrap justify-start items-center gap-1">
                {data.facility.map((facilityName, index) => (
                  <span
                    key={facilityName}
                    className="bg-white p-[2px] rounded-tr-lg rounded-bl-lg">
                    {facilityIcons[facilityName as keyof typeof facilityIcons]}
                  </span>
                ))}
              </div>
              <div className="w-[128px] h-[34px] px-2 py-1 bg-white rounded-tr-2xl rounded-bl-2xl justify-center items-center gap-2.5 inline-flex">
                <div>
                  <span className="text-neutral-700 text-base font-extrabold">
                    ${price}
                  </span>
                  {!reservation && (
                    <span className="text-neutral-700 text-sm">/day</span>
                  )}
                </div>
              </div>
              {onAction && actionLabel && (
                <Button
                  disabled={disabled}
                  small
                  label={actionLabel}
                  onClick={handleCancel}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingCard
