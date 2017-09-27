import React from 'react'
import * as Modes from '../modes'

const MenuButton = ({ mode, onClick, onCancel }) => {
  return (
    <div id="menu-toggler">
      {
        mode !== Modes.SELECT_LOCATION && <button onClick={onClick} className="btn btn-lg btn-default">
          <i className="fa fa-bars"></i>
        </button>
      }
      {
        mode === Modes.SELECT_LOCATION && <button onClick={onCancel} className="btn btn-lg btn-default">
          <i className="fa fa-chevron-left"></i>
          &nbsp;&nbsp;Batal
        </button>
      }
    </div>
  )
}

export default MenuButton
