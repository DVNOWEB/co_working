'use client'

import { useState } from 'react'
import { Range } from 'react-date-range'
import Image from 'next/image'
import useCountries from '@/app/hooks/useCountries'
import { SafeUser } from '@/app/types'

import { AiOutlineWifi } from 'react-icons/ai'
import { CgGym } from 'react-icons/cg'
import { FaCoffee, FaCreditCard } from 'react-icons/fa'
import { BiRestaurant } from 'react-icons/bi'
import { AiOutlineSafetyCertificate } from 'react-icons/ai'
import { MdLocationCity } from 'react-icons/md'
import { MdWineBar } from 'react-icons/md'
import { TbToolsKitchen2 } from 'react-icons/tb'
import { GrLounge } from 'react-icons/gr'
import { LuMonitorCheck } from 'react-icons/lu'

import ListingReservationModal from './ListingReservationModal'
import Heading from './Heading'
import ListingModal from '../modals/ListingModal'
import ButtonWfull from '../ButtonWfull'
import Reviews from './Reviews'
import ListingInfo from './ListingInfo'
import ListingMap from './ListingMap'

interface ListingPageProps {
  title: string
  address: string
  email: string
  facility: string[]
  description: string
  images: string[]
  locationValue: string
  price: number
  dateRange: Range
  totalPrice: number
  onChangeDate: (range: Range) => void
  onSubmit: () => void
  disabled?: boolean
  disabledDates?: Date[]
  id: string
  currentUser?: SafeUser | null
  // ListingInfo
  user: SafeUser
  guestCount: number
  roomCount: number
  deskCount: number
}

const ListingPage: React.FC<ListingPageProps> = ({
  title,
  address,
  email,
  facility = [],
  description,
  images = [],
  locationValue,
  price,
  dateRange,
  totalPrice,
  disabled,
  disabledDates,
  onChangeDate,
  onSubmit: onCreateReservation,
  id,
  currentUser,
  // ListingInfo
  user,
  guestCount,
  roomCount,
  deskCount,
}) => {
  const { getByValue } = useCountries()
  const location = getByValue(locationValue)
  const [isOpen, setIsOpen] = useState(false)
  const [mainImage, setMainImage] = useState(images[0])
  const [defaultImage, setDefaultImage] = useState(images[0])

  const handleReservationComplete = () => {
    setIsOpen(false) // This will close the modal
  }

  const pricePerDay = price
  const pricePerWeek = pricePerDay * 7 * 0.9
  const pricePerMonth = pricePerDay * 30 * 0.8

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

  return (
    <>
      <div className="w-full flex flex-col md:flex-row justify-center mt-24 gap-x-1 overflow-hidden custom-listing-border-radius">
        <div className="w-full h-[40vh] md:w-[70vw] md:h-[40vh] mb-1 overflow-hidden relative">
          <div className="flex">
            <Image
              alt="Property Image"
              src={mainImage}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        <div className="flex flex-row md:flex-col gap-1">
          <div className="flex gap-1">
            {images.slice(1, 3).map((image, index) => (
              <div
                key={index}
                className="md:w-[15vw] w-[23vw] md:h-[19.8vh] h-[15vh] overflow-hidden relative"
                onMouseEnter={() => setMainImage(image)}
                onMouseLeave={() => setMainImage(defaultImage)}>
                <Image
                  alt={`Image ${index}`}
                  src={image}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-1">
            {images.slice(3, 5).map((image, index) => (
              <div
                key={index}
                className="md:w-[15vw] w-[24vw] md:h-[19.9vh] h-[15vh] overflow-hidden relative"
                onMouseEnter={() => setMainImage(image)}
                onMouseLeave={() => setMainImage(defaultImage)}>
                <Image
                  alt={`Image ${index}`}
                  src={image}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content from PageSidebar left */}

      <div className="flex flex-col w-full md:flex-row justify-center">
        <div className="flex flex-col md:w-[70%]">
          <div className="flex flex-col md:pt-10 md:pr-10">
            <div className="w-full">
              <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
                address={address}
                email={email}
              />

              {Array.isArray(facility) && facility.length > 0 ? (
                <div className="flex flex-wrap mt-3 mb-3 gap-3">
                  {facility.map((facilityName, index) => (
                    <div
                      key={facilityName}
                      className="flex items-center gap-3 border uppercase font-rajhadi text-gray-600  border-gray-400 py-1 px-2 rounded-tr-lg rounded-bl-lg">
                      <span className="bg-white">
                        {
                          facilityIcons[
                            facilityName as keyof typeof facilityIcons
                          ]
                        }
                      </span>
                      <span>{facilityName}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No facilities available</p>
              )}
              <p className="flex mt-10 text-left text-gray-500 font-normal">
                {description}
              </p>
            </div>
            <ListingInfo
              user={user}
              guestCount={guestCount}
              roomCount={roomCount}
              deskCount={deskCount}
              address={address}
            />
          </div>
        </div>

        {/* Content from PageSidebar Right */}

        <div className="flex flex-col md:w-[30%] md:pt-10">
          <div className="w-full">
            <div className="flex flex-row items-center text-left gap-3 mb-6">
              <span className="text-2xl font-semibold text-gray-500">
                Pricing
              </span>
              <FaCreditCard className="text-3xl text-gray-500" />
            </div>
          </div>
          <div className="w-full py-3">
            <p className="py-2 text-gray-400">
              ${pricePerDay.toFixed(2)} / day
            </p>
            <p className="py-2 text-gray-400">
              ${pricePerWeek.toFixed(2)} / week{' '}
              <span className="text-red-600 border-red-500 border-[1px] px-1 custom-small-radius ml-2">
                10% Off
              </span>
            </p>
            <p className="py-2 text-gray-400">
              ${pricePerMonth.toFixed(2)} / month
              <span className="text-red-600 border-red-500 border-[1px] px-1 custom-small-radius ml-2">
                20% Off
              </span>
            </p>
          </div>
          <div className="flex flex-row justify-center">
            <div className="flex flex-row items-center py-4 gap-4 w-full">
              <ButtonWfull
                label="Book now"
                onClick={() => setIsOpen(true)}
                disabled={disabled}>
              </ButtonWfull>
            </div>
          </div>
          {isOpen && (
            <ListingModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="Choose dates"
              body={
                <ListingReservationModal
                  price={price}
                  address={address}
                  email={email}
                  title={title}
                  images={images}
                  facility={facility}
                  dateRange={dateRange}
                  totalPrice={totalPrice}
                  onChangeDate={(value) => onChangeDate(value)}
                  disabledDates={disabledDates}
                  disabled={disabled}
                  onSubmit={onCreateReservation}
                  onReservationComplete={handleReservationComplete}
                  onShowConfirmModal={() => setIsOpen(false)}
                />
              }
              actionLabel="Book now"
              disabled={false}
            />
          )}

          <Reviews />
          <div className="w-full block md:hidden custom-card-border-radius mb-10 min-h-[200px] max-h-[400px]">
            <ListingMap address={address} />
          </div>
        </div>
      </div>
    </>
  )
}
export default ListingPage
