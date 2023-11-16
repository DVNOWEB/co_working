import ClientOnly from '../components/ClientOnly'
import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations'
import AccountClient from './AccountClient'
import EmptyState from '../components/EmptyState'

const AccountPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState 
        title="You are not logged in!" 
        subtitle="Please login or register!"
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  })

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
        title="You have no reservations!"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <AccountClient
      reservations={reservations} 
      currentUser={currentUser}
      email={currentUser.email}
      />
    </ClientOnly>
  )
}

export default AccountPage