import React from 'react'
import Thumb from './Thumb'
import InputImg from './InputImg'

const InputThumb = (props) => {
  const { id, name, src, onChange, iconPosition, onDelete, size, label } = props

  return src
    ? <Thumb id={id} src={src} onChange={onChange} position={iconPosition} onDelete={onDelete} />
    : <InputImg id={id} name={name} size={size} label={label} onChange={onChange} />
}

export default InputThumb
