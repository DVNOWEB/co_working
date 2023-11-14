import ClientOnly from '../components/ClientOnly'

import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations'
import OwnerReservationClient from './OwnerReservationClient'

const OwnerReservationPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <div>
          <p>You must be signed in to view this page!</p>
        </div>
      </ClientOnly>
    )
  }

  const reservations = await getReservations({ authorId: currentUser.id })

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <div>
          <p>You have no reservations!</p>
        </div>
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
