import React          from 'react'
import FormEdit       from './Form/FormEdit'
import FormAdd        from './Form/FormAdd'
import Explore        from './Explore'
import * as Modes     from '../modes'

const Sidebar = (props) => {
    const { mode, active, onClose, onResetMode, selectedMarker, onCreateLocation, onRemoveLocation, onUpdateLocation, onSelectionMode, onPartialUpdate, onUpload, onDeleteFile, onDeleteRef } = props
    return (
      <div id="sidebar" className={active ? 'active' : ''}>
        {mode === Modes.EXPLORE && <Explore onInitSelect={onSelectionMode} onClose={onClose} />}
        {mode === Modes.ADD_LOCATION && <FormAdd onSubmit={onCreateLocation} onClose={onResetMode} onUpload={onUpload} />}
        {mode === Modes.DETAIL && <FormEdit onSubmit={onUpdateLocation} onDelete={onRemoveLocation} onPartialUpdate={onPartialUpdate} restaurant={selectedMarker} onClose={onResetMode} onUpload={onUpload} onDeleteFile={onDeleteFile} onDeleteRef={onDeleteRef} />}
      </div>
    )
}

export default Sidebar
