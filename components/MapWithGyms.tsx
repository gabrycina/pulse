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

  const getWhatsAppLink = (gym: HussleGym) => {
    const phoneNumber = "447479994384"
    const message = encodeURIComponent(
      `Hi Filippo! \n\nI'd like to book a day pass for ${gym.name} (${gym.location}).\n\nCould you help me with that?`
    )
    return `https://wa.me/${phoneNumber}?text=${message}`
  }

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
      
      // Create marker element with white circle background
      const el = document.createElement('div')
      el.className = 'marker'
      el.style.fontSize = '20px'
      el.style.backgroundColor = 'white'
      el.style.borderRadius = '50%'
      el.style.width = '32px'
      el.style.height = '32px'
      el.style.display = 'flex'
      el.style.alignItems = 'center'
      el.style.justifyContent = 'center'
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)'
      el.style.cursor = 'pointer'
      el.innerHTML = '🏋🏻'

      // Create popup with booking button
      const popup = new mapboxgl.Popup({ 
        offset: 25,
        maxWidth: '300px',
        className: 'custom-popup'
      })
        .setHTML(`
          <style>
            .mapboxgl-popup-close-button {
              padding: 8px 12px !important;
              font-size: 20px !important;
              color: #666 !important;
              right: 4px !important;
              top: 4px !important;
            }
            .mapboxgl-popup-close-button:hover {
              background-color: #f3f4f6 !important;
              color: #000 !important;
            }
          </style>
          <div style="font-family: system-ui, sans-serif; padding-right: 12px;">
            <div style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">
              ${gym.name}
            </div>
            <div style="color: #666; font-size: 14px; margin-bottom: 8px;">
              ${gym.location}
            </div>
            <div style="
              display: flex; 
              justify-content: space-between; 
              align-items: center; 
              margin-top: 12px;
              gap: 24px;
            ">
              <div style="font-weight: 600; font-size: 18px;">
                £${gym.dayPassPrice.toFixed(2)}
              </div>
              <a 
                href="${getWhatsAppLink(gym)}"
                target="_blank"
                rel="noopener noreferrer"
                style="
                  background-color: #000;
                  color: white;
                  padding: 8px 16px;
                  border-radius: 6px;
                  text-decoration: none;
                  font-size: 14px;
                  font-weight: 500;
                  white-space: nowrap;
                "
              >
                Book Pass
              </a>
            </div>
          </div>
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
    <div className="h-full w-full">
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  )
} 