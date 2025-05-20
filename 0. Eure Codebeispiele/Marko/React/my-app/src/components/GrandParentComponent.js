import React from 'react'
import MyParentComponent from './MyParentComponent'
import Button from './Button'

export default function GrandParentComponent() {
    
  return (
    <div>
      <MyParentComponent/>
      <Button/>
    </div>
  )
}
