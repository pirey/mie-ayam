import React from 'react'

const DetailInfo = ({ onClose }) => {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <button onClick={onClose} className="close"><span>&times;</span></button>
        <h3 className="panel-title">Detail Info</h3>
      </div>
      <div className="panel-body">
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
      </div>
    </div>
  )
}

export default DetailInfo
