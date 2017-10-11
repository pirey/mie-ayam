import React from 'react'
import * as Modes from '../modes'

const CancelButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="btn btn-lg btn-link">
      <i className="fa fa-chevron-left"></i>
    </button>
  )
}

const ToggleButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="btn btn-lg btn-link">
      <i className="fa fa-bars"></i>
    </button>
  )
}

const Navbar = ({ mode, onToggle, onCancel }) => {
  return (
    <div id="navbar">
      {mode !== Modes.SELECT_LOCATION && <ToggleButton onClick={onToggle} />}
      {mode === Modes.SELECT_LOCATION && <CancelButton onClick={onCancel} />}
      <a className="btn btn-lg btn-link font-weight-bold trans-bg">
        Mie Ayam
      </a>
    </div>
  )
}

export default Navbar
