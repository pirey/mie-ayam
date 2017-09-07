import React from 'react'
import locIcon from '../Map/loc.png'

const Explore = ({ onInitSelect, onClose }) => {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <button onClick={onClose} className="close"><span>&times;</span></button>
        <button className="btn btn-link btn-lg" onClick={onInitSelect}>
          <span style={{marginRight: 10}}><img style={{width: 24, height: 24}} src={locIcon} alt="daftarkan tempat baru" /></span>
          Daftarkan Tempat Baru
        </button>
      </div>
    </div>
  )
}

export default Explore
