'use client'

import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const googleMapsApiKey = 'AIzaSyDku3g_6HIqE3hxYs-oVsYPMbwPykTlQeM'

interface ListingMapProps {
  address: string
}

const ListingMap: React.FC<ListingMapProps> = ({ address }) => {
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  })
  const mapContainerStyle = {
    width: '100%',
    height: '340px',
  }

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const geocodeAddress = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${googleMapsApiKey}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        const data = await response.json()

        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location
          setCenter({ lat, lng })
        } else {
          setError('No results found for the address')
        }
      } catch (error) {
        setError('Error geocoding address: ' + error)
      } finally {
        setLoading(false)
      }
    }
    geocodeAddress()
  }, [address])

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      {loading ? (
        <div>Loading map...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="custom-card-border-radius overflow-hidden">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}>
            <Marker position={center} label={address} title="Listing Address" />
          </GoogleMap>
        </div>
      )}
    </LoadScript>
  )
}

export default ListingMap



