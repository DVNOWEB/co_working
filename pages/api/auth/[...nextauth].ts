import { PrismaAdapter } from '@next-auth/prisma-adapter'
import nextAuth, { AuthOptions } from 'next-auth'
import GoogleProvide from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

import prisma from '@/app/libs/prismadb'


export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvide({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'john@doe.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error('Email and password are required')


        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if(!user || !user?.hashedPassword) throw new Error('Invalid credentials')

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)

        if(!isCorrectPassword) throw new Error('Invalid credentials')

        return user
      }

    })
  ],
  pages: {
    signIn: '/'
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default nextAuth(authOptions)
