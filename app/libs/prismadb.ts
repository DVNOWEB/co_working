import { PrismaClient } from '@prisma/client'

// add prisma to the NodeJS global type
declare global {
  var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()

// prevent multiple instances of Prisma Client in development
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client