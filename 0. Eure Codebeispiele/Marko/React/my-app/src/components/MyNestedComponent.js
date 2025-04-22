import React from 'react'
import "./style.css"

export default function MyNestedComponent() {
  return (
    <div className='nested' style={{color:'red', fontFamily:'cursive' }}>
      Ich bin eine verschachtelte Komponente
    </div>
  )
}
