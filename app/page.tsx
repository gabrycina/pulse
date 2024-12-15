import { getGyms } from '@/lib/api'
import GymList from '@/components/GymList'
import MapWithGyms from '@/components/MapWithGyms'

export default async function Home() {
  const gyms = await getGyms()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="w-full lg:w-1/2 pr-4">
          <GymList gyms={gyms} />
        </div>
        <div className="w-full lg:w-1/2 pl-4">
          <MapWithGyms gyms={gyms} />
        </div>
      </div>
    </main>
  )
}
