import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getGyms() {
  try {
    const gyms = await prisma.hussleGym.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    return gyms
  } catch (error) {
    console.error('Error fetching gyms:', error)
    throw error
  }
}

// Singleton pattern to prevent multiple Prisma Client instances
export function getPrismaClient() {
  return prisma
} 