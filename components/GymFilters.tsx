import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { HussleGym } from "@prisma/client"
import { useEffect, useState } from "react"

interface GymFiltersProps {
  gyms: HussleGym[]
  onFilterChange: (filteredGyms: HussleGym[]) => void
  onClose: () => void
}

export default function GymFilters({ gyms, onFilterChange }: GymFiltersProps) {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])

  // Get unique amenities from all gyms
  const allAmenities = Array.from(
    new Set(gyms.flatMap(gym => gym.amenities))
  ).sort()

  // Get min and max prices
  const prices = gyms.map(gym => gym.dayPassPrice)
  const minPrice = Math.floor(Math.min(...prices))
  const maxPrice = Math.ceil(Math.max(...prices))

  useEffect(() => {
    // Initialize price range with actual min/max
    setPriceRange([minPrice, maxPrice])
  }, [minPrice, maxPrice])

  useEffect(() => {
    // Filter gyms based on selected criteria
    const filtered = gyms.filter(gym => {
      const priceInRange = gym.dayPassPrice >= priceRange[0] && gym.dayPassPrice <= priceRange[1]
      const hasSelectedAmenities = selectedAmenities.length === 0 || 
        selectedAmenities.every(amenity => gym.amenities.includes(amenity))
      return priceInRange && hasSelectedAmenities
    })

    onFilterChange(filtered)
  }, [selectedAmenities, priceRange, gyms, onFilterChange])

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>Filter Gyms</DialogTitle>
      </DialogHeader>

      <div className="space-y-6">
        {/* Price Range Filter */}
        <div>
          <Label>Price Range (£{priceRange[0]} - £{priceRange[1]})</Label>
          <Slider
            min={minPrice}
            max={maxPrice}
            step={1}
            value={[priceRange[0], priceRange[1]]}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mt-2"
          />
        </div>

        {/* Amenities Filter */}
        <div>
          <Label className="mb-3 block">Amenities</Label>
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-4">
            {allAmenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={() => handleAmenityChange(amenity)}
                />
                <label
                  htmlFor={amenity}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Reset Filters */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setSelectedAmenities([])
            setPriceRange([minPrice, maxPrice])
          }}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  )
} 