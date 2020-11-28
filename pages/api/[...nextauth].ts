import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth'
import Adapters from 'next-auth/adapters'
import Providers from 'next-auth/providers'

require('dotenv').config()

declare namespace globalThis {
  let prisma: PrismaClient
}

function getPersistentPrismaClient() {
  // Ensure the Prisma instance is re-used during hot-reloading
  // Otherwise, a new client would be created on every reload
  globalThis.prisma ||= new PrismaClient()
  return globalThis.prisma
}

const prisma =
  process.env.NODE_ENV === 'production'
    ? new PrismaClient()
    : getPersistentPrismaClient()

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
}

export default (req, res) => NextAuth(req, res, options)
