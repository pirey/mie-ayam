import { Success, Failure } from 'folktale/validation'

// TODO this atomic validation could be extracted to a separate module
const required = field => m =>
  m.trim() ? Success() : Failure([`Silahkan isi ${field}`])

const minlen = field => min => m =>
  m.trim().length > min ? Success() : Failure([`Input ${field} terlalu singkat`])



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

// TODO find a better way
const checkValid = ({ name, menus }) => {
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

const validate = ({ name, menus }) => {
  const errors = {
    name: validateName(name),
    menus: validateMenus(menus),
  }

  const isValid = checkValid(errors)

  return { errors, isValid }
}

export default validate
