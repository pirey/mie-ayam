import React from 'react'
import Cleave from 'cleave.js/react'
import InputThumb from './InputThumb'

const Menus = (props) => {
  const { menus, errors, handleChangeMenuImg, handleDeleteMenuImg, handleChangeMenuInput, handleRemoveMenu, loading } = props
  return (
    <ul className="resto-menu media-list">
      {menus.map((menu, i) => (
        <li key={i} className="media">
          <div className="media-left">
            <InputThumb
              id={`thumb-${i}`}
              isLoading={loading[i]}
              src={menu.img.src}
              onChange={handleChangeMenuImg(i)}
              onDelete={handleDeleteMenuImg(i)}
              name="img"
            />
          </div>
          <div className="media-body">
            <label className={`form-group ${ errors[i] && errors[i].name.length ? 'has-error' : '' }`}>
              <input name="name" value={menu.name} onChange={handleChangeMenuInput(i, 'name')} placeholder="Nama menu" />
              {errors[i] && errors[i].name && errors[i].name.map((e, k) => <small key={k} className="help-block">{e}</small>)}
            </label>
            <label className={`menu-item-price form-group ${ errors[i] && errors[i].price.length ? 'has-error' : '' }`}>
              <Cleave
                value={menu.price}
                className={menu.price.trim().length > 0 ? 'f2' : ''}
                placeholder="Harga"
                onChange={handleChangeMenuInput(i, 'price')}
                options={{
                  numeral: true,
                  numeralDecimalMark: ',',
                  delimiter: '.',
                }}
              />
              {errors[i] && errors[i].price && errors[i].price.map((e, k) => <small key={k} className="help-block">{e}</small>)}
            </label>
            <button type="button" onClick={handleRemoveMenu(i)} className="btn btn-default btn-block" disabled={loading[i]}>
              <i className="fa fa-trash text-danger"></i>
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Menus
