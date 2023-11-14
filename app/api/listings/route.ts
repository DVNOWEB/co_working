import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'


export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return NextResponse.error()
    }

    const body = await request.json()
    const {
      title,
      city,
      address,
      email,
      description,
      facilities,
      roomCount,
      deskCount,
      guestCount,
      location,
      price,
      images,
    } = body

    // Validate required fields
    if (!title || !city || !address || !email || !description || !images || !Array.isArray(images)) {
      return NextResponse.error()
    }

    // Store the image URLs in an array
    const imageUrls = images.map((image) => {
      return image
    })

    // Validate and handle facilities
    const facility = Array.isArray(facilities) ? facilities : []

    const listing = await prisma.listing.create({
      data: {
        title,
        city,
        address,
        email,
        description,
        images: imageUrls,
        facility,
        roomCount,
        deskCount,
        guestCount,
        locationValue: location ? location.value : '',
        price: parseInt(price, 10) || 0,
        userId: currentUser.id,
      },
    })

    return NextResponse.json(listing)
  } catch (error) {
    console.error('Error creating listing:', error)
    return NextResponse.error()
  }
}
