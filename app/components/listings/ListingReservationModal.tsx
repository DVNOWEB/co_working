'use client'

import { useState } from 'react'
import useConfirmModal from '@/app/hooks/useConfirmModal'
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
import PaymentMetod from '../PaymentMetod'

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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)
  const openConfirmModal = useConfirmModal((state) => state.onOpen)

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method)
  }

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
    <div className="flex flex-col overflow-x-hidden overflow-y-auto outline-none focus:outline-none ">
      <div className="flex flex-col md:flex-row w-full">
        {/* Date and Calendar */}
        <div className="order-1 md:order-1 flex flex-col justify-between bg-white rounded-xl md:w-[50%] md:pr-3">
          <div className="flex flex-col justify-between gap-4 pr-2">
            <div>
              <hr className="mt-14 md:hidden" />
              <div className="my-3">
                <span className="text-5xl inline font-bold text-neutral-700">
                  Choose dates
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <Calendar
                value={dateRange}
                onChange={(value) => onChangeDate(value.selection)}
                disabledDates={disabledDates}
              />
            </div>
          </div>
          <div className="hidden md:block">
            <PaymentMetod
              onSelectPaymentMethod={handlePaymentMethodSelect}
              selectedMethod={selectedPaymentMethod}
            />
          </div>
        </div>

        {/* Image, Title, Address, Facilities */}
        <div className="order-2 md:order-2 flex justify-between flex-col md:pl-3 md:w-[50%]">
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
            <div className="my-3 gap-1 hidden md:block">
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
          {/*  Hide calendar on md:devices */}
          <div className="md:hidden">
            <Calendar
              value={dateRange}
              onChange={(value) => onChangeDate(value.selection)}
              disabledDates={disabledDates}
            />
          </div>

          {/* Total Price */}
          <div className="order-3 md:order-4 w-full">
            <div className="flex flex-row justify-between pt-6 my-5">
              <div className="text-2xl text-neutral-700 font-semibold">
                Total Price:
              </div>
              <div className="text-2xl text-neutral-700 font-semibold">
                ${totalPrice}
              </div>
            </div>
            <hr className="pb-1 md:hidden" />
          </div>
          {/* Button */}
          <div className="order-5 hidden md:block md:order-5 w-full">
            <div className="w-full">
              <ButtonWfull
                label="Book Now"
                onClick={() => {
                  onSubmit()
                  openConfirmModal()
                }}
                disabled={disabled}
              />
            </div>
          </div>
        </div>

        {/* Payment Method and Icons */}
        <div className="order-4 md:order-3 flex flex-col my-3 md:hidden">
          <div className="order-3 flex flex-col">
            <PaymentMetod
              onSelectPaymentMethod={handlePaymentMethodSelect}
              selectedMethod={selectedPaymentMethod}
            />
          </div>
        </div>
        {/* Button */}
        <div className="order-5 md:order-5 w-full md:hidden">
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
  )
}

export default ListingReservationModal
