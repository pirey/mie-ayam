import React       from 'react'
import DetailInfo  from './DetailInfo'
import AddLocation from './AddLocation'
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
    const { mode, active, onClose, onResetMode } = this.props
    return (
      <div id="sidebar" className={active ? 'active' : ''}>
        {mode === Modes.EXPLORE && <Explore onInitSelect={this.handleInitSelect} onClose={onClose} />}
        {mode === Modes.ADD_LOCATION && <AddLocation onClose={onResetMode} onSubmit={e => e.preventDefault()} />}
        {mode === Modes.DETAIL && <DetailInfo onClose={onClose} />}
      </div>
    )
  }
}

export default Sidebar
