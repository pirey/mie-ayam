import React from 'react'

const MAX_MENU = 8

class AddLocation extends React.Component {
  state = {
    name: '',
    menus: []
  }
  constructor() {
    super()
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddMenu = this.handleAddMenu.bind(this)
    this.handleRemoveMenu = this.handleRemoveMenu.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    const { onSubmit } = this.props
    onSubmit(this.state)
  }
  handleNameChange(e) {
    const { name, value } = e.target
    this.setState(prev => ({
      [name]: value
    }))
  }
  handleAddMenu() {
    const menus = this.state.menus.concat([{
      name: '',
      price: '',
    }])
    if (menus.length <= MAX_MENU) this.setState({ menus })
  }
  handleMenuChange = (idx, field) => e => {
    const { value } = e.target
    const menus = this.state.menus.map((m, i) => {
      if (i !== idx) return m
      return { ...m, [field]: value }
    })
    this.setState({ menus })
  }
  handleRemoveMenu = idx => () => {
    this.setState({
      menus: this.state.menus.filter((m, i) => idx !== i),
    })
  }
  renderMenus() {
    const { menus } = this.state
    return (
      <div className="list-group">
        {menus.map((m, i) => (
          <div key={i} className="list-group-item">
            <div className="form-group">
              <label>Nama Menu</label>
              <input value={m.name} onChange={this.handleMenuChange(i, 'name')} className="form-control" />
            </div>
            <div className="form-group">
              <label>Harga</label>
              <input value={m.price} onChange={this.handleMenuChange(i, 'price')} type="number" className="form-control" />
            </div>
            <div className="form-group">
              <button type="button" onClick={this.handleRemoveMenu(i)} className="btn btn-danger">
                <i className="fa fa-times"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }
  render() {
    const { onClose } = this.props
    const { menus } = this.state
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            <button type="button" onClick={onClose} className="btn btn-link btn-lg"><i className="fa fa-chevron-left"></i></button>
            Daftarkan Tempat Baru
          </h3>
        </div>
        <div className="panel-body">
          <form id="form-add" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Nama Tempat</label>
              <input name="name" onChange={this.handleNameChange} className="form-control" />
            </div>
            {this.renderMenus()}
            {
              menus.length < MAX_MENU && <div className="form-group">
                <button type="button" onClick={this.handleAddMenu} className="btn btn-link no-pt">
                  <i className="fa fa-plus"></i>&nbsp;Tambah menu
                </button>
              </div>
            }
            <div className="form-group">
              <button onClick={this.handleSubmit} className="btn btn-primary btn-block">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default AddLocation
