import { NextResponse } from 'next/server'

import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'

interface IParams {
  reservationId?: string
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
){
  const currentUser = await getCurrentUser()

  if(!currentUser) return NextResponse.error()

  const { reservationId } = params

  if(!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid Credentials')
  }

  // Delete reservation if user is the owner of the reservation or the listing owner of the reservation
  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        {
          userId: currentUser.id
        },
        {
          listing: { userId: currentUser.id }
        }
      ]
    }
  })
  return NextResponse.json(reservation)
}

// PUT /api/reservations/[reservationId]
export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return NextResponse.error()

  const { reservationId } = params

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid Credentials')
  }

  try {
    const body = await request.json()
    const { startDate, endDate, totalPrice } = body

    // Retrieve the reservation to check if the currentUser is the owner or the listing owner
    const existingReservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: { listing: true }
    });

    if (!existingReservation || (existingReservation.userId !== currentUser.id && existingReservation.listing.userId !== currentUser.id)) {
      throw new Error('Unauthorized access');
    }

    // Update reservation
    const updatedReservation = await prisma.reservation.update({
      where: { id: reservationId },
      data: { startDate, endDate, totalPrice },
    });

    return NextResponse.json(updatedReservation)
  } catch (error) {
    // Handle errors
    throw new Error('Failed to update reservation')
  }
}


// // PUT /api/reservations/[reservationId]
// export async function PUT(request: Request, { params }: { params: IParams }) {
//   const currentUser = await getCurrentUser()

//   if (!currentUser) return NextResponse.error()

//   const { reservationId } = params

//   if (!reservationId || typeof reservationId !== 'string') {
//     throw new Error('Invalid Credentials')
//   }

//   try {
//     const body = await request.json()
//     const { startDate, endDate, totalPrice } = body

//     // Update reservation if user is the owner of the reservation
//     const updatedReservation = await prisma.reservation.update({
//       where: {
//         id: reservationId,
//         userId: currentUser.id,
//       },
//       data: {
//         startDate,
//         endDate,
//         totalPrice,
//       },
//     })

//     return NextResponse.json(updatedReservation)
//   } catch (error) {
//     // Handle errors
//     throw new Error('Failed to update reservation')
//   }
// }