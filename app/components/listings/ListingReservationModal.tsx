'use client'

import { Range } from 'react-date-range'
import Image from 'next/image'
import Calendar from '../Calendar'

import { AiOutlineMail, AiOutlineWifi } from 'react-icons/ai'
import { CgGym } from 'react-icons/cg'
import { FaCoffee } from 'react-icons/fa'
import { BiRestaurant } from 'react-icons/bi'
import { AiOutlineSafetyCertificate } from 'react-icons/ai'
import { MdLocationCity } from 'react-icons/md'
import { MdWineBar } from 'react-icons/md'
import { TbToolsKitchen2 } from 'react-icons/tb'
import { GrLounge } from 'react-icons/gr'
import { LuMonitorCheck } from 'react-icons/lu'
import { PiMapPinLight } from 'react-icons/pi'

import ButtonWfull from '../ButtonWfull'

interface ListingReservationModalProps {
  price: number
  dateRange: Range
  totalPrice: number
  onChangeDate: (range: Range) => void
  onSubmit: () => void
  disabled?: boolean
  disabledDates?: Date[]
  title: string
  address: string
  email: string
  images: string[]
  facility: string[]
}

const ListingReservationModal: React.FC<ListingReservationModalProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  title,
  address,
  email,
  images = [],
  facility = [],
}) => {
  const facilityIcons = {
    Wifi: <AiOutlineWifi size={16} />,
    Gym: <CgGym size={16} />,
    Coffee: <FaCoffee size={16} />,
    Restaurant: <BiRestaurant size={16} />,
    Safety: <AiOutlineSafetyCertificate size={16} />,
    Location: <MdLocationCity size={16} />,
    Bar: <MdWineBar size={16} />,
    Technology: <LuMonitorCheck size={16} />,
    Kitchen: <TbToolsKitchen2 size={16} />,
    Lounge: <GrLounge size={16} />,
  }

  return (
    <>
      <div className="flex flex-wrap md:flex-row w-full">
        <div className="flex flex-col justify-between bg-white rounded-xl w-[50%] md:pr-3">
          <div className="flex flex-col items-center gap-1 p-2">
            <div>
              <span className="text-5xl inline font-bold text-neutral-700">
                Choose dates
              </span>
            </div>
            <Calendar
              value={dateRange}
              onChange={(value) => onChangeDate(value.selection)}
              disabledDates={disabledDates}
            />
          </div>
          <div className="flex flex-col">
            Choose Payment Method
            <div className="flex flex-row justify-between md:pr-3">
              <div>Pay Pall</div>
              <div>Credit Card</div>
            </div>
          </div>
        </div>
        {/* Image col right */}
        <div className="flex flex-wrap justify-between flex-col md:pl-3 w-[50%]">
          <Image
            className="custom-card-border-radius"
            src={images[0]}
            alt="Property Image"
            width={800}
            height={300}
          />
          <div className="flex flex-col">
            <div className="text-2xl mt-5 font-semibold">{title}</div>
            <div className="flex flex-col mt-1">
              <span className="flex items-baseline gap-2 font-light text-gray-500">
                <PiMapPinLight size={16} />
                {address}
              </span>
              <span className="flex items-baseline gap-2 font-light text-gray-500">
                <AiOutlineMail size={15} />
                {email}
              </span>
            </div>
            {/* Facilities */}
            <div className="my-3 gap-1">
              {facility && facility.length > 0 && (
                <div className="flex flex-wrap mt-3 mb-3 gap-3">
                  {facility.map((facilityName, index) => (
                    <div
                      key={facilityName}
                      className="flex items-center gap-1 border uppercase rajdhani-font text-gray-500 border-gray-400 py-[1px] px-[5px] rounded-tr-lg rounded-bl-lg">
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
              )}
            </div>
          </div>
          {/* Footer */}
          <div className="flex flex-col">
            <div className="flex flex-row justify-between my-3">
              <div className="text-2xl font-semibold">Total Price:</div>
              <div className="text-2xl font-semibold">${totalPrice}</div>
            </div>
            <div className="w-full">
              <ButtonWfull
                label="Book Now"
                onClick={onSubmit}
                disabled={disabled}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListingReservationModal
