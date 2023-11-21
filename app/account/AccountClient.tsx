'use client'

import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { isAfter, isBefore, parseISO, startOfToday } from 'date-fns'

import Container from '../components/Container'
import HeadingAccount from '../components/HeadingAccount'
import AccountCard from '../components/account/AccountCard'

import { SafeReservation, SafeUser } from '../types'
import { useCallback, useState } from 'react'
import Footer from '../components/Footer'

interface AccountClientProps {
  reservations: SafeReservation[]
  currentUser?: SafeUser | null
  email: string | null
}
const AccountClient: React.FC<AccountClientProps> = ({
  reservations,
  currentUser,
  email,
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled')
          router.refresh()
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error)
        })
        .finally(() => {
          setDeletingId('')
        })
    },
    [router]
  )

  const isReservationOld = (startDate: string) => {
    return !isAfter(parseISO(startDate), startOfToday())
  }

  const sortedReservations = [...reservations].sort(
    (a, b) => parseISO(b.startDate).getTime() - parseISO(a.startDate).getTime()
  )

  const newReservations = sortedReservations.filter(
    (reservation) => !isReservationOld(reservation.startDate)
  )

  const oldReservations = sortedReservations.filter((reservation) =>
    isReservationOld(reservation.startDate)
  )


  return (
    <div>
      <Container>
        <div className="pt-24 pb-10">
          <HeadingAccount title="Account" subtitle={`${currentUser?.email}`} />
        </div>
      </Container>

      <div className="flex flex-row py-3 xl:px-20 lg:px-8 md:px-10 sm:px-5 px-5 bg-neutral-700">
        <span className="px-2 text-white text-2xl font-bold">Bookings</span>
      </div>

      <Container>
        <div>
          {newReservations.map((reservation) => (
            <AccountCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel Reservation"
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>

      {/* If old bookings or dates move to Old bookings */}
      <div className="flex flex-row py-3 xl:px-20 lg:px-8 md:px-10 sm:px-5 px-5 bg-neutral-700">
        <span className="px-2 text-white text-2xl font-bold">Old Bookings</span>
      </div>
      <Container>
        <div>
          {oldReservations.map((reservation) => (
            <AccountCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              isOld={true}
              onAction={undefined} // No action for old bookings
              disabled={true}
              actionLabel="Expired"
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
      <Footer />
    </div>
  )
}

export default AccountClient
