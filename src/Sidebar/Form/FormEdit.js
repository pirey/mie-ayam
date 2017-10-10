import React from 'react'
import validate from './validate'
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

// const menuItem = {
//   name: '',
//   price: '',
//   img: {
//     src: '',
//     ref: '',
//   },
// }

class FormEdit extends React.Component {
  constructor({ restaurant }) {
    super()
    this.state = {
      form: assign(initialState.form, restaurant),
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
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentWillUpdate(props, nextState) {
    console.log('next state', nextState)
  }
  componentWillReceiveProps({ restaurant }) {
    if (!restaurant) return
    if (restaurant.id !== this.state.form.id)
      this.setState({ form: restaurant })
  }
  /* set nested state */
  setNState(field, newState) {
    this.setState(prev => {
      return {
        [field]: {
          ...prev[field],
          ...newState,
        }
      }
    })
  }
  setMenuState({ idx, ...rest }) {
    const menus = this.state.form.menus.map((m, i) =>
      (i === idx) ? { ...m, ...rest } : m)
    this.setNState('form', { menus })
  }
  resetErrors(field) {
    this.setState(_ => ({
      errors: { ...initialState.errors }
    }))
  }
  handleDelete(id) {
    const { onDelete, onDeleteFile } = this.props

    const del = ref => ref
      ? onDeleteFile(ref).then(_ => _, _ => Promise.resolve())
      : Promise.resolve()

    const { img, menus } = this.state.form
    const imgTask = del(img.ref)
    const menuTasks = menus.map(m => del(m.img.ref))

    const ps = [imgTask, ...menuTasks]
    return Promise.all(ps).then(_ => onDelete(id))
  }
  handleChangeInput(e) {
    const { name, value } = e.target
    this.setNState('form', {
      [name]: value,
    })
  }
  handleAddMenu() {
    const { onCreateMenu } = this.props
    const { id } = this.state.form
    const { menus } = this.state.form
    const dummyMenu = {
      img: { ref: '', src: '' },
      name: 'nama menu',
      price: '0'
    }
    if (menus.length < MAX_MENU) {
      onCreateMenu(id, dummyMenu).then(menu => {
        console.log('menu created', menu)
        this.setNState('form', {
          menus: menus.concat(menu)
        })
      })
    }
  }
  handleRemoveMenu = idx => () => {
    const { onDeleteFile, onDeleteRef } = this.props
    const { id }           = this.state.form
    const { id: menuId }   = this.state.form.menus[idx]
    const { ref }          = this.state.form.menus[idx].img
    const menus = this.state.form.menus.filter((m, i) => idx !== i)
    const deleteIfExists = ref => ref ? onDeleteFile(ref) : Promise.resolve()
    deleteIfExists(ref)
      .then(_ => _, _ => Promise.resolve()) // ignore error (usually non existent ref)
      .then(_ => onDeleteRef(`${id}/menus/${menuId}`))
      .then(_ => {
        this.resetErrors()
        this.setNState('form', { menus })
      })
  }
  handleDeleteImg() {
    const { onDeleteFile, onPartialUpdate } = this.props
    const { id } = this.state.form
    const { ref } = this.state.form.img
    const img = {
      ref: '',
      src: '',
    }
    onDeleteFile(ref)
      .then(_ => onPartialUpdate(id, { img }))
      .then(_ => this.setNState('form', { img }))
  }
  handleDeleteMenuImg = idx => () => {
    const { onDeleteFile, onPartialUpdate } = this.props
    const { id }           = this.state.form
    const { id: menuId }   = this.state.form.menus[idx]
    const { ref }          = this.state.form.menus[idx].img
    const img = {
      ref: '',
      src: '',
    }
    onDeleteFile(ref)
      .then(_ => onPartialUpdate(`${id}/menus/${menuId}`, { img }))
      .then(_ => this.setMenuState({ idx, img }))
  }
  handleChangeImg(e) {
    const { onUpload, onPartialUpdate, onDeleteFile } = this.props
    const input   = e.target

    if (!input.files) return

    const file = input.files[0]
    const { id }  = this.state.form
    const { ref } = this.state.form.img
    const deleteIfExists = ref => ref ? onDeleteFile(ref) : Promise.resolve()

    deleteIfExists(ref)
      .then(_ => _, _ => Promise.resolve()) // ignore error when deleting old img
      .then(_ => onUpload(file))
      .then(img => {
        return onPartialUpdate(id, { img }).then(_ => img)
      })
      .then(img => this.setNState('form', { img }))
  }
  handleChangeMenuImg = idx => e => {
    const { onUpload, onPartialUpdate, onDeleteFile } = this.props
    const input          = e.target

    if (!input.files) return

    const file = input.files[0]
    const { id }         = this.state.form
    const { id: menuId } = this.state.form.menus[idx]
    const { ref }        = this.state.form.menus[idx].img
    const deleteIfExists = ref => ref ? onDeleteFile(ref) : Promise.resolve()
    deleteIfExists(ref)
      .then(_ => _, _ => Promise.resolve()) // ignore error when deleting old img
      .then(_ => onUpload(file))
      .then(img => {
        return onPartialUpdate(`${id}/menus/${menuId}`, { img }).then(_ => img)
      })
      .then(img => this.setMenuState({ idx, img }))
  }
  handleChangeMenuInput = (idx, field) => e => {
    const { rawValue, value } = e.target // get raw value from cleave.js
    const menus = this.state.form.menus.map((m, i) => {
      if (i !== idx) return m
      return { ...m, [field]: rawValue || value }
    })
    this.setNState('form', { menus })
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
        onDelete={this.handleDelete}
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
