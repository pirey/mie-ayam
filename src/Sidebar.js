import React from 'react'

const DetailInfo = () => {
  return (
    <div id="detail-info">
      <div className="detail-info-heading">
        <h3 className="detail-info-title">Mie Ayam Tumini</h3>
      </div>
      <div className="detail-info-thumbnail">
        <img alt="restaurant" className="img-responsive" src="//via.placeholder.com/500x300" />
      </div>
      <ul className="detail-info-menu media-list">
        <li className="media">
          <div className="media-left media-bottom">
            <img className="media-object" src="//via.placeholder.com/100x100" alt="mie ayam" />
          </div>
          <div className="media-body">
            <h4 className="media-heading cut cut-default">Mie Ayam Jumbo</h4>
            <h4 className="media-heading f24">Rp15.000</h4>
          </div>
        </li>
        <li className="media">
          <div className="media-left media-bottom">
            <img className="media-object" src="//via.placeholder.com/100x100" alt="mie ayam" />
          </div>
          <div className="media-body">
            <h4 className="media-heading cut cut-default">Mie Ayam Jumbo</h4>
            <h4 className="media-heading f24">Rp15.000</h4>
          </div>
        </li>
        <li className="media">
          <div className="media-left media-bottom">
            <img className="media-object" src="//via.placeholder.com/100x100" alt="mie ayam" />
          </div>
          <div className="media-body">
            <h4 className="media-heading cut cut-default">Mie Ayam Jumbo</h4>
            <h4 className="media-heading f24">Rp15.000</h4>
          </div>
        </li>
        <li className="media">
          <div className="media-left media-bottom">
            <img className="media-object" src="//via.placeholder.com/100x100" alt="mie ayam" />
          </div>
          <div className="media-body">
            <h4 className="media-heading cut cut-default">Mie Ayam Jumbo</h4>
            <h4 className="media-heading f24">Rp15.000</h4>
          </div>
        </li>
      </ul>
    </div>
  )
}

const FormAdd = ({ onSubmit }) => {
  return (
    <form id="form-add" onSubmit={onSubmit}>
      <div className="form-group">
        <label>Nama Tempat</label>
        <input className="form-control" />
      </div>
      <div className="clearfix">
        <label>Menu</label>
        <button className="btn btn-link pull-right no-pt">
          <i className="fa fa-plus"></i>&nbsp;Tambah menu
        </button>
      </div>
      <div className="list-group">
        <div className="list-group-item">
          <div className="form-group">
            <label>Nama Menu</label>
            <input className="form-control" />
          </div>
          <div className="form-group">
            <label>Harga</label>
            <input type="number" className="form-control" />
          </div>
          <div className="form-group">
            <button className="btn btn-danger">
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
        <div className="list-group-item">
          <div className="form-group">
            <label>Nama Menu</label>
            <input className="form-control" />
          </div>
          <div className="form-group">
            <label>Harga</label>
            <input type="number" className="form-control" />
          </div>
          <div className="form-group">
            <button className="btn btn-danger">
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="form-group">
        <button className="btn btn-primary">Simpan</button>
      </div>
    </form>
  )
}

const Sidebar = ({ active, onClose }) => {
  const className = ['panel panel-default']

  if (active) className.push('active')

  return (
    <div id="sidebar" className={className.join(' ')}>
      <div className="panel-heading">
        <button onClick={onClose} className="close"><span>&times;</span></button>
        <button className="btn btn-success">
          <i className="fa fa-plus"></i>
          &nbsp;Daftarkan Tempat Baru
        </button>
      </div>
      <div className="panel-heading">
        <input className="form-control" placeholder="Cari..." />
      </div>
      <div className="panel-body">
        <FormAdd onSubmit={e => e.preventDefault()} />
        <DetailInfo />
      </div>
    </div>
  )
}

export default Sidebar
