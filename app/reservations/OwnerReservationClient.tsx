'use client'

import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'

import { useCallback, useState } from 'react'
import { SafeReservation, SafeUser } from '../types'

import Container from '../components/Container'
import HeadingAccount from '../components/HeadingAccount'
import AccountCard from '../components/account/AccountCard'
import { isAfter, parseISO, startOfToday } from 'date-fns'

interface OwnerReservationClientProps {
  reservations: SafeReservation[]
  currentUser?: SafeUser | null
}

const OwnerReservationClient: React.FC<OwnerReservationClientProps> = ({
  reservations,
  currentUser,
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
        .catch(() => {
          toast.error('Something went wrong.')
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
    <>
      <Container>
        <div className="pt-24 pb-10">
          <HeadingAccount
            title="New Reservations"
            subtitle="Bookings on your properties"
          />
        </div>
      </Container>

      <div className="flex flex-row py-3 xl:px-20 lg:px-8 md:px-10 sm:px-5 px-5 bg-neutral-700">
        <span className="px-2 text-white text-2xl font-bold">New Reservations</span>
      </div>

      <Container>
        <div>
          {newReservations.map((reservation: any) => (
            <AccountCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel guest reservation"
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>

      <div className="flex flex-row py-3 xl:px-20 lg:px-8 md:px-10 sm:px-5 px-5 bg-neutral-700">
        <span className="px-2 text-white text-2xl font-bold">
          Old Reservations
        </span>
      </div>
        <Container>
          <div>
            {oldReservations.map((reservation: any) => (
              <AccountCard
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deletingId === reservation.id}
                actionLabel="Cancel guest reservation"
                currentUser={currentUser}
              />
            ))}
          </div>
        </Container>
    </>
  )
}

export default OwnerReservationClient
