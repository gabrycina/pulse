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
    const phoneNumber = "447479994384" // Remove spaces and + for WhatsApp URL
    const message = encodeURIComponent(
      `Hi Filippo! \n\nI'd like to book a day pass for ${gym.name} (${gym.location}).\n\nCould you help me with that?`
    )
    return `https://wa.me/${phoneNumber}?text=${message}`
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Pulse</h1>
          <p className="text-muted-foreground">Find the best gym day passes in London</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary">
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

      <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
        <div className="grid grid-cols-1 gap-6">
          {filteredGyms.map((gym) => (
            <Card key={gym.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{gym.name}</CardTitle>
                <CardDescription>{gym.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
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
    </div>
  )
} 