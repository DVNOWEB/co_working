export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/account',
    '/reservations',
    '/listings',
  ]
}

