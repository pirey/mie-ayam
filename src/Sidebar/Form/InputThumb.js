import React from 'react'
import Thumb from './Thumb'
import InputImg from './InputImg'

const InputThumb = (props) => {
  const { id, name, src, onChange, iconPosition, onDelete, size, label, isLoading, } = props

  return src
    ? <Thumb id={id} src={src} onChange={onChange} position={iconPosition} onDelete={onDelete} isLoading={isLoading} />
    : <InputImg id={id} name={name} size={size} label={label} onChange={onChange} isLoading={isLoading} />
}

export default InputThumb
