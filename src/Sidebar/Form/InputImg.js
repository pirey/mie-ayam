import React from 'react'

const InputImg = ({ id, name, onChange, isLoading, size = 'm', classNames = '', label = '' }) => {
  const icon = {
    m: <i className="fa fa-camera fa-2x"></i>,
    l: <i className="fa fa-camera fa-4x"></i>,
  }

  return (
    <label htmlFor={id} className={`input-img text-center ${classNames} ${isLoading ? 'is-loading' : ''}`}>
      <div className={`loader ${isLoading ? '' : 'hidden'}`}>
        <i className="fa fa-circle-o-notch fa-3x fa-spin"></i>
      </div>
      {icon[size]}
      {!isLoading && label && <span className="input-label">{label}</span>}
      {!isLoading && <input id={id} type="file" className="hidden" onChange={onChange} />}
    </label>
  )
}


export default InputImg
