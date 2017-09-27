import React                        from 'react'

import { withGoogleMap, GoogleMap } from 'react-google-maps'
import MarkerClusterer              from 'react-google-maps/lib/addons/MarkerClusterer'
import MyLocationMarker             from './MyLocationMarker'
import SelectedLocationMarker       from './SelectedLocationMarker'
import RestaurantMarker             from './RestaurantMarker'

const defaultOptions = {
  disableDefaultUI: true,
  disableDoubleClickZoom: true,
  minZoom: 13,
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

const Map = withGoogleMap(props => {
  const { selectedLocation, myLocation, center, markers, onMapLoad, onMapClick, onCenterChanged, onMarkerClick, onMarkerClose } = props
  return (
    <GoogleMap
      ref={onMapLoad}
      center={center || defaultCenter}
      onClick={onMapClick}
      onCenterChanged={onCenterChanged}
      defaultZoom={15}
      defaultCenter={defaultCenter}
      defaultOptions={defaultOptions}
    >
      {myLocation && <MyLocationMarker position={myLocation} />}
      {selectedLocation && <SelectedLocationMarker position={selectedLocation} />}
      <MarkerClusterer>
        {markers.map((m, i) => <RestaurantMarker
          onMarkerClose={() => onMarkerClose(m)}
          onClick={() => onMarkerClick(m)}
          key={i}
          {...m}
        /> )}
      </MarkerClusterer>
    </GoogleMap>
  )
})

export default Map
