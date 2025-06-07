import React from 'react'

export default function RegisterInput({type,placeholder, value,onChange}) {
  return (
   <input  type={type}
          placeholder={placeholder} required
          value={value}
          onChange={onChange}
          className='register-input'/>
  )
}
