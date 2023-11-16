'use client'

import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

import Container from '../components/Container'
import HeadingAccount from '../components/HeadingAccount'
import AccountCard from '../components/account/AccountCard'

import { SafeReservation, SafeUser } from '../types'
import { useCallback, useState } from 'react'

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

  return (
    <>
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
          {reservations.map((reservation: any) => (
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
          {reservations.map((reservation: any) => (
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
    </>
  )
}

export default AccountClient
