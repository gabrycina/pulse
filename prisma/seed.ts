import { PrismaClient } from '@prisma/client'
import { hussleGyms } from '../data/hussle-gyms'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Delete existing records
  await prisma.hussleGym.deleteMany()

  // Insert all gyms
  for (const gym of hussleGyms) {
    const result = await prisma.hussleGym.create({
      data: {
        id: gym.id,
        name: gym.name,
        location: gym.location,
        dayPassPrice: gym.dayPassPrice,
        amenities: gym.amenities,
        imageUrl: gym.imageUrl,
        website: gym.website,
        coordinates: gym.coordinates,
      },
    })
    console.log(`Created gym with id: ${result.id}`)
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 