'use client'

import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef } from 'react'
import { Gym } from '@/types/gym'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

interface MapProps {
  gyms: Gym[]
}

export function Map({ gyms }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-0.1276, 51.5074],
      zoom: 12
    })

    map.current.addControl(new mapboxgl.NavigationControl())

    gyms.forEach((gym) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div class="p-2">
          <h3 class="font-bold">${gym.name}</h3>
          <p class="text-sm text-gray-500">${gym.location}</p>
          <p class="text-sm font-bold mt-1">£${gym.dayPassPrice.toFixed(2)}</p>
        </div>`
      )

      new mapboxgl.Marker()
        .setLngLat([gym.coordinates.lng, gym.coordinates.lat])
        .setPopup(popup)
        .addTo(map.current!)
    })

    return () => map.current?.remove()
  }, [gyms])

  return <div ref={mapContainer} className="w-full h-full rounded-lg" />
}