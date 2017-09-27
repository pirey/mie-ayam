import React from 'react'
import validate from './validate'
// import { rupiah } from '../lib/numberFormatter'

const MAX_MENU = 7

// define init state here, so it can be reused
const initialState = {
  form: {
    name: '',
    menus: [],
  },
  errors: {
    name: '',
    menus: [],
  }
}

class FormRestaurant extends React.Component {
  constructor({ restaurant }) {
    super()
    this.state = {
      form: restaurant || initialState.form,
      errors: initialState.errors,
    }
    this.handleChangeInput = this.handleChangeInput.bind(this)
    this.handleChangeMenu = this.handleChangeMenu.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddMenu = this.handleAddMenu.bind(this)
    this.handleRemoveMenu = this.handleRemoveMenu.bind(this)
  }
  componentWillReceiveProps({ restaurant }) {
    if (!restaurant) return
    if (restaurant.id !== this.state.form.id)
      this.setState({ form: restaurant })
  }
  setFormState(newState) {
    this.setState(prev => ({
      form: {
        ...prev.form,
        ...newState,
      }
    }))
  }
  handleChangeInput(e) {
    const { name, value } = e.target
    this.setFormState({
      [name]: value,
    })
  }
  handleAddMenu() {
    const menus = this.state.form.menus.concat([{
      name: '',
      price: '',
    }])
    if (menus.length <= MAX_MENU) this.setFormState({ menus })
  }
  handleRemoveMenu = idx => () => {
    this.resetErrors()
    this.setFormState({
      menus: this.state.form.menus.filter((m, i) => idx !== i),
    })
  }
  resetErrors(field) {
    this.setState(_ => ({
      errors: { ...initialState.errors }
    }))
  }
  handleChangeMenu = (idx, field) => e => {
    const { value } = e.target
    const menus = this.state.form.menus.map((m, i) => {
      if (i !== idx) return m
      return { ...m, [field]: value }
    })
    this.setFormState({ menus })
  }
  handleSubmit(e) {
    e.preventDefault()
    const { onSubmit } = this.props
    const { form } = this.state
    const { errors, isValid } = validate(form)
    if (isValid) {
      onSubmit(form)
    }
    else {
      this.setState(_ => ({ errors }) )
    }
  }
  renderMenus() {
    const { menus } = this.state.form
    const { menus: errors } = this.state.errors
    return (
      <ul className="detail-info-menu media-list">
        {menus.map((menu, i) => (
          <li key={i} className="media">
            <div className="media-left">
              <img className="media-object" src="//via.placeholder.com/100x100" alt="mie ayam" />
              <button type="button" onClick={this.handleRemoveMenu(i)} className="btn btn-link red mt10 btn-block">
                <i className="fa fa-trash-o"></i>
              </button>
            </div>
            <div className="media-body">
                <h4 className="media-heading cut cut-default">
                  <div className={`form-group ${ errors[i] && errors[i].name.length ? 'has-error' : '' }`}>
                    <input name="name" value={menu.name} onChange={this.handleChangeMenu(i, 'name')} placeholder="Menu" />
                    {errors[i] && errors[i].name && errors[i].name.map((e, k) => <small key={k} className="help-block">{e}</small>)}
                  </div>
                </h4>
                <div className={`menu-item-price form-group ${ errors[i] && errors[i].price.length ? 'has-error' : '' }`}>
                  <input name="price" value={menu.price} onChange={this.handleChangeMenu(i, 'price')} placeholder="Harga" />
                  {errors[i] && errors[i].price && errors[i].price.map((e, k) => <small key={k} className="help-block">{e}</small>)}
                </div>
              </div>
            </li>
        ))}
      </ul>
    )
  }
  render() {
    const { onDelete, onClose } = this.props
    const { name, id, menus } = this.state.form
    const { name: nameError } = this.state.errors
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <button onClick={onClose} className="btn btn-link btn-lg"><i className="fa fa-chevron-left"></i></button>
          <button form="detail-info" type="submit" className="btn btn-link btn-lg primary"><i className="fa fa-check"></i> Simpan</button>
          {onDelete && <button onClick={() => onDelete(id)} className="btn btn-link btn-lg red"><i className="fa fa-trash-o"></i>&nbsp;Hapus</button>}
        </div>
        <div className="panel-body">
          <form onSubmit={this.handleSubmit} id="detail-info">
            <div className="detail-info-heading">
              <h3 className="detail-info-title">
                <div className={`form-group ${nameError.length ? 'has-error' : ''}`}>
                  <input name="name" value={name} onChange={this.handleChangeInput} placeholder="Nama tempat" />
                  {nameError && nameError.map(e => <small key={e} className="help-block">{e}</small>)}
                </div>
              </h3>
            </div>
            <div className="detail-info-thumbnail">
              <img alt="restaurant" className="img-responsive" src="//via.placeholder.com/500x300" />
            </div>
            {this.renderMenus()}
            {
              menus.length < MAX_MENU && <div className="form-group">
                <button type="button" onClick={this.handleAddMenu} className="btn btn-link btn-block">
                  <i className="fa fa-plus"></i>&nbsp;Tambah menu
                </button>
              </div>
            }
          </form>
        </div>
      </div>
    )
  }
}

export default FormRestaurant
