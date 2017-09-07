import React from 'react'
import * as Modes from '../modes'

const MenuButton = ({ mode, onClick, onCancel }) => {
  return (
    <div id="menu-toggler">
      {
        mode !== Modes.SELECT_LOCATION && <button onClick={onClick} className="btn btn-default">
          <i className="fa fa-bars"></i>
        </button>
      }
      {
        mode === Modes.SELECT_LOCATION && <button onClick={onCancel} className="btn btn-default">
          <i className="fa fa-angle-left"></i>
          &nbsp;&nbsp;Batal
        </button>
      }
    </div>
  )
}

export default MenuButton
