'use client'

import { HussleGym } from '@prisma/client'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef } from 'react'

interface MapWithGymsProps {
  gyms: HussleGym[]
}

export default function MapWithGyms({ gyms }: MapWithGymsProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

    if (map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-0.118092, 51.509865], // London coordinates
      zoom: 11
    })

    // Add navigation control
    map.current.addControl(new mapboxgl.NavigationControl())

    // Add markers for each gym
    gyms.forEach((gym) => {
      const coordinates = gym.coordinates as { lng: number; lat: number }
      
      // Create marker element
      const el = document.createElement('div')
      el.className = 'marker'
      el.style.backgroundColor = '#FF0000'
      el.style.width = '20px'
      el.style.height = '20px'
      el.style.borderRadius = '50%'
      el.style.cursor = 'pointer'

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <strong>${gym.name}</strong><br>
          ${gym.location}<br>
          £${gym.dayPassPrice.toFixed(2)}
        `)

      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat([coordinates.lng, coordinates.lat])
        .setPopup(popup)
        .addTo(map.current!)
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [gyms])

  return (
    <div>
      <div ref={mapContainer} style={{ height: 'calc(100vh - 12rem)' }} />
    </div>
  )
} 