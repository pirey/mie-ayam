import React from 'react'
import validate from './validate'
import { restaurantImgRef } from '../../lib/firebase'
import FormRestaurant from './FormRestaurant'

const MAX_MENU = 7

const assign = (a,b) => Object.assign({}, a, b)

// define init state here, so it can be reused
const initialState = {
  form: {
    name: '',
    img: {
      src: '',
      ref: '',
    },
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
  img: {
    src: '',
    ref: '',
  },
}

class FormEdit extends React.Component {
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
    this.handleChangeMenuInput = this.handleChangeMenuInput.bind(this)
    this.handleChangeMenuImg = this.handleChangeMenuImg.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddMenu = this.handleAddMenu.bind(this)
    this.handleRemoveMenu = this.handleRemoveMenu.bind(this)
    this.handleDeleteMenuImg = this.handleDeleteMenuImg.bind(this)
    this.handleDeleteImg = this.handleDeleteImg.bind(this)
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
    const menus = this.state.form.menus.concat([menuState])
    if (menus.length <= MAX_MENU) this.setFormState({ menus })
  }
  handleRemoveMenu = idx => () => {
    this.resetErrors()
    this.setFormState({
      menus: this.state.form.menus.filter((m, i) => idx !== i),
    })
  }
  handleDeleteImg() {
    const ref = this.state.form.img.ref
    console.log('deleting img', ref)
    restaurantImgRef.child(ref).delete().then(_ => {
      const img = {
        ref: '',
        src: '',
      }
      this.setFormState({ img })
    })
  }
  handleDeleteMenuImg = idx => () => {
    const ref = this.state.form.menus[idx].img.ref
    console.log('deleting image', ref)
    restaurantImgRef.child(ref).delete().then(_ => {
      const img = {
        ref: '',
        src: '',
      }
      this.setMenuImgState({ idx, img })
    })
  }
  resetErrors(field) {
    this.setState(_ => ({
      errors: { ...initialState.errors }
    }))
  }
  handleChangeImg(e) {
    const { onUpload } = this.props
    const input = e.target
    if (input.files && input.files[0]) {
      const { name } = input.files[0]
      onUpload(name, input.files[0]).then(snapshot => {
        const url = snapshot.downloadURL
        const img = {
          src: url,
          ref: name,
        }
        this.setFormState({ img })
      })
    }
  }
  setMenuImgState({ idx, img }) {
    const menus = this.state.form.menus.map((m, i) => {
      const withImg = {
        ...m,
        img,
      }
      return (i === idx) ? withImg : m
    })
    this.setFormState({ menus })
  }
  handleChangeMenuImg = idx => e => {
    const { onUpload } = this.props
    const input = e.target
    if (input.files && input.files[0]) {
      const { name } = input.files[0]
      onUpload(name, input.files[0]).then(snapshot => {
        const url = snapshot.downloadURL
        const img = {
          src: url,
          ref: name,
        }
        this.setMenuImgState({ idx, img })
      })
    }
  }
  handleChangeMenuInput = (idx, field) => e => {
    const { rawValue, value } = e.target // get raw value from cleave.js
    const menus = this.state.form.menus.map((m, i) => {
      if (i !== idx) return m
      return { ...m, [field]: rawValue || value }
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
  render() {
    return (
      <FormRestaurant
        form={this.state.form}
        errors={this.state.errors}
        onDelete={this.props.onDelete}
        onClose={this.props.onClose}
        handleAddMenu={this.handleAddMenu}
        handleRemoveMenu={this.handleRemoveMenu}
        handleSubmit={this.handleSubmit}
        handleChangeMenuInput={this.handleChangeMenuInput}
        handleChangeMenuImg={this.handleChangeMenuImg}
        handleDeleteMenuImg={this.handleDeleteMenuImg}
        handleChangeInput={this.handleChangeInput}
        handleChangeImg={this.handleChangeImg}
        handleDeleteImg={this.handleDeleteImg}
      />
    )
  }
}

export default FormEdit
