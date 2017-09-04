import React from 'react'

import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";
import MyLocation from './MyLocation'
import eatIcon from './eat.png'

const WarungMarker = ({ showInfo, position, nama, harga, onClick, onMarkerClose }) => (
  <Marker
    icon={eatIcon}
    position={position}
    title={nama}
    onClick={onClick}
  >
    {showInfo && <InfoWindow onCloseClick={onMarkerClose}>
      <div>
        <h3 style={{textTransform: 'capitalize', margin: '5px 0'}}>{nama}</h3>
        <div>Rp{harga}</div>
      </div>
    </InfoWindow>}
  </Marker>
)

const Map = withGoogleMap(props => {
  const { myLocation, center, markers, onMapLoad, onMapClick, onCenterChanged, onMarkerClick, onMarkerClose } = props
  const defaultOptions = {
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    zoomControl: true,
    fullscreenControl: true,
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
      onCenterChanged={onCenterChanged}
      defaultZoom={15}
      defaultCenter={defaultCenter}
      defaultOptions={defaultOptions}
    >
      {myLocation && <MyLocation position={myLocation} />}
      <MarkerClusterer>
        {markers.map((m, i) => <WarungMarker
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
