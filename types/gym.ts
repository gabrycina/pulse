export interface Gym {
  id: string
  name: string
  location: string
  dayPassPrice: number
  amenities: string[]
  imageUrl?: string
  website: string
  coordinates: {
    lng: number
    lat: number
  }
} 