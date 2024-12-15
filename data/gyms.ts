import { Gym } from "@/types/gym"

export const gyms: Gym[] = [
  {
    id: "1",
    name: "PureGym London Wall",
    location: "City of London",
    dayPassPrice: 9.99,
    amenities: ["24/7 Access", "Free Weights", "Cardio Machines", "Showers"],
    website: "https://www.puregym.com/gyms/london-wall/",
    imageUrl: "/images/puregym-london.jpg",
    coordinates: {
      lng: -0.0918,
      lat: 51.5169
    }
  },
  {
    id: "2",
    name: "Fitness First Bishopsgate",
    location: "Liverpool Street",
    dayPassPrice: 15.00,
    amenities: ["Pool", "Sauna", "Classes", "Personal Training"],
    website: "https://www.fitnessfirst.co.uk/gyms/london-bishopsgate/",
    imageUrl: "/images/fitness-first.jpg",
    coordinates: {
      lng: -0.0814,
      lat: 51.5179
    }
  },
  {
    id: "3",
    name: "Third Space Tower Bridge",
    location: "Tower Bridge",
    dayPassPrice: 30.00,
    amenities: ["Luxury Facilities", "Spa", "Classes", "Restaurant"],
    website: "https://www.thirdspace.london/tower-bridge/",
    imageUrl: "/images/third-space.jpg",
    coordinates: {
      lng: -0.0736,
      lat: 51.5047
    }
  }
] 