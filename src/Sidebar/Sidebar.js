import React       from 'react'
import FormRestaurant  from './Form/FormRestaurant'
import Explore     from './Explore'
import * as Modes  from '../modes'

class Sidebar extends React.Component {
  constructor() {
    super()
    this.handleInitSelect = this.handleInitSelect.bind(this)
  }
  handleInitSelect() {
    const { onClose, onChangeMode } = this.props
    onChangeMode(Modes.SELECT_LOCATION)
    onClose()
  }
  render() {
    const { mode, active, onClose, onResetMode, selectedMarker, onAddLocation, onRemoveLocation, onUpdateLocation } = this.props
    return (
      <div id="sidebar" className={active ? 'active' : ''}>
        {mode === Modes.EXPLORE && <Explore onInitSelect={this.handleInitSelect} onClose={onClose} />}
        {mode === Modes.ADD_LOCATION && <FormRestaurant onSubmit={onAddLocation} onClose={onResetMode} />}
        {mode === Modes.DETAIL && <FormRestaurant onSubmit={onUpdateLocation} onDelete={onRemoveLocation} restaurant={selectedMarker} onClose={onResetMode} />}
      </div>
    )
  }
}

export default Sidebar
