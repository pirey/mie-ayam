import React from 'react'
import { rupiah } from '../lib/numberFormatter'

const MenuList = ({ menus }) => {
  return (
    <ul className="detail-info-menu media-list">
      {menus.map(menu => (
        <li key={menu.id} className="media">
          <div className="media-left media-bottom">
            <img className="media-object" src="//via.placeholder.com/100x100" alt="mie ayam" />
          </div>
          <div className="media-body">
            <h4 className="media-heading cut cut-default">{menu.name.toUpperCase()}</h4>
            <p className="menu-item-price">{rupiah(menu.price)}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

const DetailInfo = ({ onDelete, restaurant, onClose }) => {
  const { name, menus } = restaurant
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <button onClick={onClose} className="btn btn-link btn-lg"><i className="fa fa-chevron-left"></i></button>
        <button onClick={() => onDelete(restaurant.id)} className="btn btn-link btn-lg red"><i className="fa fa-trash-o"></i>&nbsp;Hapus</button>
      </div>
      <div className="panel-body">
        <div id="detail-info">
          <div className="detail-info-heading">
            <h3 className="detail-info-title">{name.toUpperCase()}</h3>
          </div>
          <div className="detail-info-thumbnail">
            <img alt="restaurant" className="img-responsive" src="//via.placeholder.com/500x300" />
          </div>
          <MenuList menus={menus} />
        </div>
      </div>
    </div>
  )
}

export default DetailInfo
