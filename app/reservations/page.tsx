import ClientOnly from '../components/ClientOnly'
import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations'
import OwnerReservationClient from './OwnerReservationClient'
import EmptyState from '../components/EmptyState'

const OwnerReservationPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized!"
          subtitle="Please login or register!"
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({ authorId: currentUser.id })

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="You have no reservations!"
          subtitle="Please create a listing for your property!"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <OwnerReservationClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default OwnerReservationPage
