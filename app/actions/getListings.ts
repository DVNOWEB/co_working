import prisma from '@/app/libs/prismadb'

export interface IListingsParams {
  userId?: string
  guestCount?: number
  roomCount?: number
  deskCount?: number
  startDate?: string
  endDate?: string
  locationValue?: string
  facility?: string
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      deskCount,
      locationValue,
      startDate,
      endDate,
      facility,
    } = params

    let query: any = {}

    if (userId) {
      query.userId = userId
    }

    if (facility) {
      query.facility = facility
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      }
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      }
    }

    if (deskCount) {
      query.deskCount = {
        gte: +deskCount,
      }
    }

    if (locationValue) {
      query.locationValue = locationValue
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }))

    return safeListings
  } catch (error: any) {
    throw new Error(error)
  }
}