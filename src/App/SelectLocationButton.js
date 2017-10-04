import React from 'react'

const SelectLocationButton = ({ onClick }) => {
  return (
    <div id="location-selector">
      <div onClick={onClick} className="desc">Pilih Lokasi</div>
      <div className="arrow"></div>
    </div>
  )
}

export default SelectLocationButton
