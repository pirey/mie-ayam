import React from 'react'
import validate from './validate'
import { restaurantImgRef } from '../../lib/firebase'
// import { rupiah } from '../lib/numberFormatter'

const MAX_MENU = 7

const assign = (a,b) => Object.assign({}, a, b)

// define init state here, so it can be reused
const initialState = {
  form: {
    name: '',
    img: '',
    menus: [],
  },
  errors: {
    name: '',
    menus: [],
  }
}

const menuState = {
  name: '',
  price: '',
  img: '',
}

const InputImg = ({ id, name, onChange, size = 'm', classNames = '', label = '' }) => {
  const icon = {
    m: <i className="fa fa-camera fa-2x"></i>,
    l: <i className="fa fa-camera fa-4x"></i>,
  }

  return (
    <label htmlFor={id} className={`input-img text-center ${classNames}`}>
      {icon[size]}
      {label && <span className="input-label">{label}</span>}
      <input id={id} type="file" className="hidden" onChange={onChange} />
    </label>
  )
}

class FormRestaurant extends React.Component {
  constructor({ restaurant }) {
    super()
    const form = restaurant ? assign(initialState.form, restaurant) : initialState.form
    console.log('form', form)
    console.log('restaurant', restaurant)
    this.state = {
      form,
      errors: initialState.errors,
    }

    this.handleChangeImg = this.handleChangeImg.bind(this)
    this.handleChangeInput = this.handleChangeInput.bind(this)
    this.handleChangeMenu = this.handleChangeMenu.bind(this)
    this.handleChangeMenuImg = this.handleChangeMenuImg.bind(this)
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
    console.log('form state', this.state.form)
    const { name, value } = e.target
    this.setFormState({
      [name]: value,
    })
  }
  handleAddMenu() {
    const menus = this.state.form.menus.concat([menuState])
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
  handleChangeImg(e) {
    const input = e.target
    if (input.files && input.files[0]) {
      const { name } = input.files[0]
      restaurantImgRef.child(name).put(input.files[0]).then(snapshot => {
        console.log(snapshot)
        const url = snapshot.downloadURL
        this.setFormState({ img: url })
      })
    }
  }
  setMenuImgState({ idx, url }) {
    const menus = this.state.form.menus.map((m, i) => {
      const withImg = {
        ...m,
        img: url,
      }
      return (i === idx) ? withImg : m
    })
    this.setFormState({ menus })
  }
  handleChangeMenuImg = idx => e => {
    const input = e.target
    if (input.files && input.files[0]) {
      const { name } = input.files[0]
      restaurantImgRef.child(name).put(input.files[0]).then(snapshot => {
        console.log(snapshot)
        const url = snapshot.downloadURL
        this.setMenuImgState({ idx, url })
      })
    }
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
              {
                menu.img && <img className="media-object" src={menu.img} alt="mie ayam" />
              }
              {
                !menu.img && <InputImg id={`input-img-${menu.id}`} name="img" onChange={this.handleChangeMenuImg(i)} className="media-object" />
              }
            </div>
            <div className="media-body">
              <h4 className="media-heading cut cut-default">
                <label className={`form-group ${ errors[i] && errors[i].name.length ? 'has-error' : '' }`}>
                  <input name="name" value={menu.name} onChange={this.handleChangeMenu(i, 'name')} placeholder="Nama" />
                  {errors[i] && errors[i].name && errors[i].name.map((e, k) => <small key={k} className="help-block">{e}</small>)}
                </label>
              </h4>
              <h4 className="media-heading">
                <label className={`menu-item-price form-group ${ errors[i] && errors[i].price.length ? 'has-error' : '' }`}>
                  <input name="price"
                    value={menu.price}
                    onChange={this.handleChangeMenu(i, 'price')}
                    placeholder="Harga"
                    className={menu.price.trim().length > 0 ? 'f2' : ''}
                  />
                  {errors[i] && errors[i].price && errors[i].price.map((e, k) => <small key={k} className="help-block">{e}</small>)}
                </label>
              </h4>
              <div>
                <button type="button" onClick={this.handleRemoveMenu(i)} className="btn btn-danger btn-block">
                  Hapus
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }
  render() {
    const { onDelete, onClose } = this.props
    const { name, id, menus, img } = this.state.form
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
                <label className={`form-group ${nameError.length ? 'has-error' : ''}`}>
                  <input name="name" value={name} onChange={this.handleChangeInput} placeholder="Nama tempat" />
                  {nameError && nameError.map(e => <small key={e} className="help-block">{e}</small>)}
                </label>
              </h3>
            </div>
            <div className="detail-info-thumbnail">
              {img && <img alt="restaurant" className="img-responsive" src={img} />}
              {
                !img &&  <InputImg id="restaurant-img" name="img" size="l" label="Tambahkan foto lokasi" onChange={this.handleChangeImg} />
              }
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
