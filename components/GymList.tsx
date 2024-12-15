'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HussleGym } from "@prisma/client"
import { useState } from "react"
import GymFilters from "./GymFilters"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface GymListProps {
  gyms: HussleGym[]
}

export default function GymList({ gyms }: GymListProps) {
  const [filteredGyms, setFilteredGyms] = useState<HussleGym[]>(gyms)
  const [open, setOpen] = useState(false)

  const getWhatsAppLink = (gym: HussleGym) => {
    const phoneNumber = "447479994384"
    const message = encodeURIComponent(
      `Hi Filippo! \n\nI'd like to book a day pass for ${gym.name} (${gym.location}).\n\nCould you help me with that?`
    )
    return `https://wa.me/${phoneNumber}?text=${message}`
  }

  return (
    <div className="space-y-4">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-2">
            Pulse <span className="text-yellow-500">⚡</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">Find the best gym day passes in London</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" className="w-full sm:w-auto">
              Filter Gyms
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <GymFilters
              gyms={gyms}
              onFilterChange={setFilteredGyms}
              onClose={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {filteredGyms.map((gym) => (
          <Card key={gym.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{gym.name}</CardTitle>
              <CardDescription>{gym.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {gym.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                    >
                      {amenity}
                    </span>
                  ))}
                  {gym.amenities.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{gym.amenities.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">£{gym.dayPassPrice.toFixed(2)}</span>
                  <a 
                    href={getWhatsAppLink(gym)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button>Book Pass</Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredGyms.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No gyms found matching your filters
          </div>
        )}
      </div>
    </div>
  )
} 