import React       from 'react'
import FormRestaurant  from './Form/FormRestaurant'
import Explore     from './Explore'
import * as Modes  from '../modes'

const Sidebar = (props) => {
    const { mode, active, onClose, onResetMode, selectedMarker, onAddLocation, onRemoveLocation, onUpdateLocation, onSelectionMode } = props
    return (
      <div id="sidebar" className={active ? 'active' : ''}>
        {mode === Modes.EXPLORE && <Explore onInitSelect={onSelectionMode} onClose={onClose} />}
        {mode === Modes.ADD_LOCATION && <FormRestaurant onSubmit={onAddLocation} onClose={onResetMode} />}
        {mode === Modes.DETAIL && <FormRestaurant onSubmit={onUpdateLocation} onDelete={onRemoveLocation} restaurant={selectedMarker} onClose={onResetMode} />}
      </div>
    )
}

export default Sidebar
