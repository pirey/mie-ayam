import React from 'react'

const InputImg = ({ id, name, onChange, size = 'm', classNames = '', label = '' }) => {
  const icon = {
    m: <i className="fa fa-camera fa-2x"></i>,
    l: <i className="fa fa-camera fa-4x"></i>,
  }

  return (
    <label htmlFor={id} className={`input-img text-center ${classNames}`}>
      {icon[size]}
      {label && <span className="input-label">{label}</span>}
      <input id={id} type="file" className="hidden" onChange={onChange} />
    </label>
  )
}


export default InputImg
