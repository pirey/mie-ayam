import React       from 'react'
import DetailInfo  from './DetailInfo'
import AddLocation from './AddLocation/AddLocation'
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
    const { mode, active, onClose, onResetMode, selectedMarker, onAddLocation, onRemoveLocation } = this.props
    return (
      <div id="sidebar" className={active ? 'active' : ''}>
        {mode === Modes.EXPLORE && <Explore onInitSelect={this.handleInitSelect} onClose={onClose} />}
        {mode === Modes.ADD_LOCATION && <AddLocation onSubmit={onAddLocation} onClose={onResetMode} />}
        {mode === Modes.DETAIL && <DetailInfo onDelete={onRemoveLocation} restaurant={selectedMarker} onClose={onResetMode} />}
      </div>
    )
  }
}

export default Sidebar
