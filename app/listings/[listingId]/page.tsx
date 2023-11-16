import getCurrentUser from '@/app/actions/getCurrentUser'
import getListingById from '@/app/actions/getListingById'
import ClientOnly from '@/app/components/ClientOnly'
import ListingClient from './ListingClient'
import getReservations from '@/app/actions/getReservations'
import EmptyState from '@/app/components/EmptyState'

interface IParams {
  listingId?: string
}

const ListingPage = async ({ params } : { params: IParams }) => {
  const listing = await getListingById(params)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState
        title="Listing not found"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} reservations={reservations} />
    </ClientOnly>
  )
}

export default ListingPage
