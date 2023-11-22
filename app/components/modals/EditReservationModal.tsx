'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Range } from 'react-date-range'
import Calendar from '../Calendar'
import ButtonListingModal from '../ButtonListingModal'
import { calculateTotalPrice } from '@/app/libs/priceUtils'
import axios from 'axios'
import toast from 'react-hot-toast'

interface EditReservationModalProps {
  reservationId: string
  originalDateRange: Range
  price: number
  onReservationUpdated: () => void
  onCancel: () => void
}

const EditReservationModal: React.FC<EditReservationModalProps> = ({
  reservationId,
  originalDateRange,
  price,
  onReservationUpdated,
  onCancel,
}) => {
  const [dateRange, setDateRange] = useState<Range>(originalDateRange)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [isUpdating, setIsUpdating] = useState<boolean>(false)

  useEffect(() => {
    const newTotalPrice = calculateTotalPrice(
      price,
      dateRange.startDate,
      dateRange.endDate
    )
    setTotalPrice(newTotalPrice)
  }, [dateRange, price])

  const handleUpdateReservation = useCallback(() => {
    if (!reservationId || !dateRange.startDate || !dateRange.endDate) {
      toast.error('Missing reservation details')
      return
    }

    setIsUpdating(true)
    axios
      .put(`/api/reservations/${reservationId}`, {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        totalPrice,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Reservation updated successfully')
          onReservationUpdated()
        } else {
          throw new Error('Failed to update reservation')
        }
      })
      .catch((error) => {
        toast.error('Failed to update reservation')
      })
      .finally(() => {
        setIsUpdating(false)
      })
  }, [reservationId, dateRange, totalPrice, onReservationUpdated])


  return (
    <div className="custom-border-radius border-gray-100 border-1 shadow-lg shadow-black px-5 my-5 overflow-hidden">
      <Calendar
        value={dateRange}
        onChange={(value) => setDateRange(value.selection)}
      />

      <div className="flex flex-row justify-end my-10 font-bold">
        <span className="font-normal pr-2">New Total Price: </span> $
        {totalPrice.toString()}
      </div>

      <div className="flex flex-col gap-3 my-10 ">
        <ButtonListingModal
          label="Confirm Changes"
          onClick={handleUpdateReservation}
        />
        <ButtonListingModal danger label="Cancel Changes" onClick={onCancel} />
      </div>
    </div>
  )
}

export default EditReservationModal
