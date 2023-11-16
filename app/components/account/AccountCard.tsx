'use client'

import { useRouter } from 'next/navigation'
import { Listing } from '@prisma/client'

import { SafeReservation, SafeUser } from '@/app/types'
import useCountries from '@/app/hooks/useCountries'
import { useCallback, useMemo } from 'react'
import { format, parseISO } from 'date-fns'
import Image from 'next/image'

import { FaPencilAlt } from 'react-icons/fa'
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
import { FcCancel } from 'react-icons/fc'

interface ListingWithFlexibleDate extends Omit<Listing, 'createdAt'> {
  createdAt: string | Date
}

interface AccountCardProps {
  data: ListingWithFlexibleDate
  reservation?: SafeReservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: SafeUser | null
  isOld?: boolean
}

const AccountCard: React.FC<AccountCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
  isOld = false,
}) => {
  const router = useRouter()
  const { getByValue } = useCountries()
  
  const cardStyle = isOld ? { opacity: 0.5 } : {}

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

  const createdAtDate =
    typeof data.createdAt === 'string'
      ? parseISO(data.createdAt)
      : data.createdAt

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }

    return data.price
  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  return (
    // Card list layout
    <>
      <div style={cardStyle}>
        {/* Image */}
        <div className="flex flex-row justify-between">
          <div className="flex gap-5 col-span-1 cursor-pointer group">
            <div
              onClick={() => {
                router.push(`/listings/${data.id}`)
              }}
              className="aspect-auto py-10 px-5 overflow-hidden">
              <Image
                width={350}
                height={200}
                alt="Listing"
                src={data.images[0]} // Use 'data.images' instead of 'data.imageSrc'
                className="object-cover group-hover:scale-110 transition-all duration-500 custom-card-border-radius"
              />
            </div>
            {/* Info */}
            <div className="flex py-12 px-1 aspect-auto relative">
              <div className="flex flex-col justify-between ">
                <div className="flex flex-col">
                  <h3 className="pb-2 font-semibold text-2xl bg-gradient-to-b from-white">
                    {data.title}
                  </h3>
                  <div className="py-5">
                    <hr />
                  </div>
                  <p className="text-zinc-500 text-base md:font-normal hidden md:block">
                    This is a toplist with the best co-working
                    <br />
                    spaces in the {location?.label}, {location?.region}
                  </p>
                </div>
                <div className="flex py-9 absolute bottom-0 font-bold">
                  {reservationDate && (
                    <span className="text-neutral-600 text-base font-bold">
                      {reservationDate}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Price */}
          <div className="flex py-12 flex-col justify-between relative">
            <div className="flex flex-col gap-5">
              {!isOld && (
                <FaPencilAlt className="text-3xl text-zinc-800 cursor-pointer" />
              )}
              <div className="flex ">
                {onAction && actionLabel && (
                  <FcCancel
                    className="text-3xl text-neutral-800 cursor-pointer"
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleCancel}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-row absolute bottom-0 py-9 gap-1">
              <span className="text-neutral-700 text-base font-bold">$</span>
              <span className="text-neutral-600 text-base font-medium">
                {price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountCard
