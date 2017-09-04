import React from 'react'

import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";
import MyLocation from './MyLocation'
import eatIcon from './eat.png'

const WarungMarker = ({ position }) => {
  return (
    <Marker icon={eatIcon} position={position} />
  )
}

const Map = withGoogleMap(props => {
  const { myLocation, center, markers, onMapLoad, onMapClick } = props
  const defaultOptions = {
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    zoomControl: true,
    minZoom: 12,
    maxZoom: 20,
    styles: [
      {
        featureType: 'transit',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }]
      },
    ]
  }
  const defaultCenter = { lat: -7.801394959643029, lng: 110.36470413208008 }
  return (
    <GoogleMap
      ref={onMapLoad}
      center={center || defaultCenter}
      onClick={onMapClick}
      defaultZoom={15}
      defaultCenter={defaultCenter}
      defaultOptions={defaultOptions}
    >
      {myLocation && <MyLocation position={myLocation} />}
      <MarkerClusterer>
        {markers.map((m, i) => (
          <WarungMarker key={i} {...m} />
        ))}
      </MarkerClusterer>
    </GoogleMap>
  )
})

export default Map
