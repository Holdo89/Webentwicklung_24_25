import React from 'react'
import MyNestedComponent from './MyNestedComponent'

export default function MyParentComponent() {
  return (
    <div>
      Ich bin die Parent Komponente

      <MyNestedComponent/>
    </div>
  )
}
