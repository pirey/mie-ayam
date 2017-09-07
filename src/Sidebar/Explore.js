import React from 'react'

const Explore = ({ onInitSelect, onClose }) => {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <button onClick={onClose} className="close"><span>&times;</span></button>
        <button className="btn btn-success" onClick={onInitSelect}>
          <i className="fa fa-plus"></i>
          &nbsp;Daftarkan Tempat Baru
        </button>
      </div>
    </div>
  )
}

export default Explore
