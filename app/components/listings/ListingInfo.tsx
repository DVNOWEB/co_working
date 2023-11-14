'use client'

import { SafeUser } from '@/app/types'
import ListingMap from './ListingMap'


interface ListingInfoProps {
  user: SafeUser
  guestCount: number
  roomCount: number
  deskCount: number
  address: string
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  guestCount,
  roomCount,
  deskCount,
  address,
}) => {

  return (
    <div className="col-span-4 flex flex-col my-10 gap-10">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row item-center text-xl font-semibold gap-2">
          <div>Hosted by {user?.email}</div>
        </div>
        <p>Capacity:</p>
        <div className="flex flex-row items-center gap-4 font-light text-gray-500">
          <div>{guestCount} guests,</div>
          <div>{roomCount} rooms,</div>
          <div>{deskCount} desc</div>
        </div>
      </div>
      <div className="flex flex-col w-full custom-card-border-radius mb-10 min-h-[200px] max-h-[400px]">
        <ListingMap 
        address={address} 
        />
      </div>
    </div>
  )
}

export default ListingInfo

