import React                  from 'react'
import { Marker, InfoWindow } from "react-google-maps"
import eatIcon                from './eat.png'

const RestaurantMarker = ({ showInfo, position, nama, harga, onClick, onMarkerClose }) => (
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

export default RestaurantMarker
