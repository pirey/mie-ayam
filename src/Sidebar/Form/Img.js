import React from 'react'
import ReactImg from 'react-image'

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="preloader-overlay">
        <i className="fa fa-circle-o-notch fa-3x fa-spin"></i>
      </div>
      <i className="fa fa-3x fa-circle invicible"></i>
    </div>
  )
}

const Img = ({ src, ...rest }) => {
  return <ReactImg src={src} loader={<Preloader />} {...rest} />
}

export default Img
