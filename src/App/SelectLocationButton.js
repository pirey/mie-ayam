import React from 'react'

const SelectLocationButton = ({ onClick }) => {
  return (
    <div id="add-location-button">
      <div onClick={onClick} className="add-location-button-desc">Pilih Lokasi</div>
      <div className="add-location-button-arrow"></div>
    </div>
  )
}

export default SelectLocationButton
