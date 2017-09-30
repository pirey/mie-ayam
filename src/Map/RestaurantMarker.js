import React      from 'react'
import { Marker } from "react-google-maps"
import eatIcon    from './eat.png'

const RestaurantMarker = ({ latLng, onClick, onMarkerClose }) => (
  <Marker
    icon={eatIcon}
    position={latLng}
    onClick={onClick}
  />
)

export default RestaurantMarker
