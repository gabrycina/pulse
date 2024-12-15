import { getGyms } from '@/lib/api'
import GymList from '@/components/GymList'
import MapWithGyms from '@/components/MapWithGyms'

export default async function Home() {
  const gyms = await getGyms()

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-col lg:flex-row h-screen relative">
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative">
          <div className="h-full overflow-y-auto p-4 lg:p-6">
            <GymList gyms={gyms} />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent lg:hidden pointer-events-none" />
        </div>
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative">
          <MapWithGyms gyms={gyms} />
        </div>
      </div>
    </main>
  )
}
