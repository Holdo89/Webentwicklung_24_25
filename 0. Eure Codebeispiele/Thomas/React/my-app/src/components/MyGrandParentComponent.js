import React from 'react'
import MyParentComponent from './MyParentComponent'
import Button from './MyParentComponent'

export default function MyGrandParentComponent() {
  return (
    <>
      <MyParentComponent/>
      <Button/>
      
    </>
  )
}
