'use client'

import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Range } from 'react-date-range'

import { SafeReservation, SafeUser } from '@/app/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'

import { facilities } from '@/app/components/Facilities'
import ListingPage from '@/app/components/listings/ListingPage'
import Container from '@/app/components/Container'
// import ListingInfo from '@/app/components/listings/ListingInfo'

import useLoginModal from '@/app/hooks/useLoginModal'
import Footer from '@/app/components/Footer'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

interface ListingClientProps {
  reservations?: SafeReservation[]
  listing: any & {
    user: SafeUser
  }
  currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal()
  const router = useRouter()

  const desabledDates = useMemo(() => {
    let dates: Date[] = []

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })
      dates = [...dates, ...range]
    })

    return dates
  }, [reservations])

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  // Create a new reservation
  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }
    setIsLoading(true)

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success('Reservation successfully created')
        setDateRange(initialDateRange)
        router.push('/account')
      })
      .catch(() => {
        toast.error('Something went wrong!')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [currentUser, dateRange, listing?.id, loginModal, router, totalPrice])

  // We will change the total price when the date range changes
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      )
      // calculate the total price
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])

  const facility = useMemo(() => {
    const facilityData = facilities.find(
      (item) => item.label === listing.facility
    )
    return facilityData ? facilityData.label : '' // Access the 'label' property
  }, [listing.facility])

  return (
    <>
      <Container>
        <div className="max-w.screen-lg mx-auto">
          <div className="flex flex-col gap-6">
            <ListingPage
              title={listing.title}
              images={listing.images}
              address={listing.address}
              email={listing.email}
              facility={listing.facility}
              description={listing.description}
              locationValue={listing.locationValue}
              id={listing.id}
              currentUser={currentUser}
              price={listing.price}
              totalPrice={totalPrice}
              dateRange={dateRange}
              onChangeDate={(value) => setDateRange(value)}
              onSubmit={onCreateReservation}
              disabled={isLoading}
              disabledDates={desabledDates}
              // ListingInfo
              user={listing.user}
              guestCount={listing.guestCount}
              roomCount={listing.roomCount}
              deskCount={listing.deskCount}
            />
          </div>
          {/* <div>
            <ListingInfo
              user={listing.user}
              guestCount={listing.guestCount}
              roomCount={listing.roomCount}
              deskCount={listing.deskCount}
              address={listing.address}
            />
          </div> */}
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default ListingClient
