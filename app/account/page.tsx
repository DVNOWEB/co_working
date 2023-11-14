import ClientOnly from '../components/ClientOnly'
import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations'
import AccountClient from './AccountClient'

const AccountPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <div> Unauthorized! Please login or register! </div>
      </ClientOnly>
    )
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  })

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <div> You have no reservations! </div>
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