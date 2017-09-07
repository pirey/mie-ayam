import React from 'react'

const AddLocation = ({ onClose, onSubmit }) => {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">
          <button onClick={onClose} className="btn btn-link btn-lg"><i className="fa fa-chevron-left"></i></button>
          Daftarkan Tempat Baru
        </h3>
      </div>
      <div className="panel-body">
        <form id="form-add" onSubmit={onSubmit}>
          <div className="form-group">
            <label>Nama Tempat</label>
            <input className="form-control" />
          </div>
          <div className="clearfix">
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
        </form>
      </div>
      <div className="panel-footer">
        <button className="btn btn-primary">Simpan</button>
      </div>
    </div>
  )
}

export default AddLocation
