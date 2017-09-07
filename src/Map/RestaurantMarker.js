import React                  from 'react'
import { Marker } from "react-google-maps"
import eatIcon                from './eat.png'

const RestaurantMarker = ({ position, onClick, onMarkerClose }) => (
  <Marker
    icon={eatIcon}
    position={position}
    onClick={onClick}
  />
)

export default RestaurantMarker
