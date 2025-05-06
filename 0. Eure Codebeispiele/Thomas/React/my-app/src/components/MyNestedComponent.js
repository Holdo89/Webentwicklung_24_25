import React from 'react'

export default function MyNestedComponent(props) {
  return (
    <div style={{color:props.color}}>
      {props.text}
    </div>
  )
}
