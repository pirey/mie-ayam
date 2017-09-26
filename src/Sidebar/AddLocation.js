import React from 'react'
import { Success, Failure } from 'folktale/validation'

const required = field => m =>
  m.trim() ? Success() : Failure([`Silahkan isi ${field}`])

const minlen = field => min => m =>
  m.trim().length > min ? Success() : Failure([`Input ${field} terlalu singkat`])

const validateFormLocation = ({ name, menus }) => {
  const validateMenuName = (name) => {
    return Success()
      .concat(required('menu')(name))
      .concat(minlen('menu')(3)(name))
      .map(_ => []).merge()
  }

  const validateMenuPrice = (price) => {
    return Success()
      .concat(required('harga')(price))
      .map(_ => []).merge()
  }

  const validateName = (name) => {
    return Success()
      .concat(required('nama')(name))
      .concat(minlen('nama')(3)(name))
      .map(_ => []).merge()
  }

  const validateMenus = (menus) => {
    return menus.map(menu => {
      return {
        name: validateMenuName(menu.name),
        price: validateMenuPrice(menu.price),
      }
    })
  }

  const checkValid = ({ name, menus }) => {
    let err = false
    if (name.length > 0) return false
    else if (!menus) return true
    else if (Array.isArray(menus) && menus.length < 1) return true
    else if (Array.isArray(menus) && menus.length >= 1) {
      return menus.reduce((b,a) => {
        if (a.name.length > 0) return false
        if (a.price.length > 0) return false
        return true
      }, false)
    }
  }

  const errors = {
    name: validateName(name),
    menus: validateMenus(menus),
  }

  const isValid = checkValid(errors)

  return { errors, isValid }
}

const MAX_MENU = 4

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

class AddLocation extends React.Component {
  state = { ...initialState }

  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeInput = this.handleChangeInput.bind(this)
    this.handleChangeMenu = this.handleChangeMenu.bind(this)
    this.handleAddMenu = this.handleAddMenu.bind(this)
    this.handleRemoveMenu = this.handleRemoveMenu.bind(this)
  }
  setFormState(newState) {
    this.setState(prev => ({
      form: {
        ...prev.form,
        ...newState,
      }
    }))
  }
  resetErrors(field) {
    this.setState(_ => ({
      errors: { ...initialState.errors }
    }))
  }
  handleSubmit(e) {
    e.preventDefault()
    const { onSubmit } = this.props
    const { name, menus } = this.state.form

    const { errors, isValid } = validateFormLocation({ name, menus })

    if (isValid) {
      onSubmit({ name, menus })
    }
    else {
      this.setState(_ => ({ errors }) )
    }

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
  handleChangeMenu = (idx, field) => e => {
    const { value } = e.target
    const menus = this.state.form.menus.map((m, i) => {
      if (i !== idx) return m
      return { ...m, [field]: value }
    })
    this.setFormState({ menus })
  }
  handleRemoveMenu = idx => () => {
    this.resetErrors()
    this.setFormState({
      menus: this.state.form.menus.filter((m, i) => idx !== i),
    })
  }
  renderMenus() {
    const { menus } = this.state.form
    const { menus: errors } = this.state.errors
    return (
      <div className="list-group">
        {menus.map((m, i) => (
          <div key={i} className="list-group-item">
            <div className={`form-group ${ errors[i] && errors[i].name.length ? 'has-error' : '' }`}>
              <label className="control-label">Menu</label>
              <input value={m.name} onChange={this.handleChangeMenu(i, 'name')} className="form-control" />
              {errors[i] && errors[i].name && errors[i].name.map((e, k) => <p key={k} className="help-block">{e}</p>)}
            </div>
            <div className={`form-group ${ errors[i] && errors[i].price.length ? 'has-error' : '' }`}>
              <label className="control-label">Harga</label>
              <input value={m.price} onChange={this.handleChangeMenu(i, 'price')} type="number" className="form-control" />
              {errors[i] && errors[i].price && errors[i].price.map((e, k) => <p key={k} className="help-block">{e}</p>)}
            </div>
            <div className="form-group nomargin">
              <button type="button" onClick={this.handleRemoveMenu(i)} className="btn btn-link red">
                <i className="fa fa-trash-o"></i>&nbsp;Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }
  render() {
    const { onClose } = this.props
    const { menus } = this.state.form
    const { name } = this.state.errors
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            <button type="button" onClick={onClose} className="btn btn-link btn-lg"><i className="fa fa-chevron-left"></i></button>
          </h3>
        </div>
        <div className="panel-body">
          <h3 className="nomt mb30">Daftarkan tempat baru</h3>
          <form id="form-add" onSubmit={this.handleSubmit}>
            <div className={`form-group ${name.length ? 'has-error' : ''}`}>
              <label className="control-label">Nama Tempat</label>
              <input name="name" onChange={this.handleChangeInput} className="form-control" />
              {name && name.map(e => <p key={e} className="help-block">{e}</p>)}
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
