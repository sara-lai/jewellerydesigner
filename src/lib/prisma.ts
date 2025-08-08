//from: https://www.prisma.io/docs/guides/nextjs

import { PrismaClient } from '@prisma/client' // '../src/app/generated/prisma' (some tutorials)

const globalForPrisma = global as unknown as { 
    prisma: PrismaClient
}

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma