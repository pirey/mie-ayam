import React from 'react'
import { Marker } from 'react-google-maps'
import icon from './loc.png'

const SelectedLocationMarker = ({ position }) => {
  return (
    <Marker position={position} icon={icon} />
  )
}

export default SelectedLocationMarker

