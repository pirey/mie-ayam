import React from 'react'
import { Success, Failure, collect } from 'folktale/validation'

const MAX_MENU = 8

const extractErrors = xs =>
  xs.reduce((a, b) =>
    a.concat(b.fold(
      e =>Failure([e]),
      _ => Failure([''])
    )), Success()).value

const required = field => m =>
  m.trim() ? Success() : Failure([`Silahkan isi ${field}`])

const minlen = field => m =>
  m.length >= 3 ? Success() : Failure([`${field} terlalu singkat`])

const minlenRequired = field => m => Success().concat(required(field)(m)).concat(minlen(field)(m))

const validateAll = validate => xs =>
  xs.map(validate)

const validateMenu = m => Success().concat(minlenRequired('menu')(m.name))

const validateMenus = validateAll(validateMenu)

const validateName = minlenRequired('Nama tempat')

const validate = ({ name, menus }) => {
  const raw = {
    name: validateName(name),
    menus: validateMenus(menus),
  }
  const validation = Success().concat(raw.name).concat(collect(raw.menus))
  return ({ raw, validation })
}

class AddLocation extends React.Component {
  state = {
    form: {
      name: '',
      menus: [],
    },
    errors: {
      name: '',
      menus: [],
    }
  }
  constructor() {
    super()
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
  handleSubmit(e) {
    e.preventDefault()
    const { onSubmit } = this.props
    const { name, menus } = this.state.form
    const { validation, raw } = validate({ name, menus })

    const handleFail = e => {
      const errors = {
        name: raw.name.fold(e => e, _ => []),
        menus: extractErrors(raw.menus),
      }
      this.setState({ errors })
      console.log('fail', errors)
    }

    const handleSuccess = _ => {
      console.log('success')
      onSubmit(this.state.form)
    }

    validation.fold(handleFail, handleSuccess)
  }
  handleNameChange(e) {
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
  handleMenuChange = (idx, field) => e => {
    const { value } = e.target
    const menus = this.state.form.menus.map((m, i) => {
      if (i !== idx) return m
      return { ...m, [field]: value }
    })
    this.setFormState({ menus })
  }
  handleRemoveMenu = idx => () => {
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
            <div className={`form-group ${(errors &&errors[i]) ? 'has-error' : ''}`}>
              <label className="control-label">Menu</label>
              <input value={m.name} onChange={this.handleMenuChange(i, 'name')} className="form-control" />
              {errors && errors[i] && errors[i].map((e, k) => <p key={k} className="help-block">{e}</p>)}
            </div>
            <div className="form-group">
              <label className="control-label">Harga</label>
              <input value={m.price} onChange={this.handleMenuChange(i, 'price')} type="number" className="form-control" />
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
            <div className={`form-group ${name ? 'has-error' : ''}`}>
              <label className="control-label">Nama Tempat</label>
              <input name="name" onChange={this.handleNameChange} className="form-control" />
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
