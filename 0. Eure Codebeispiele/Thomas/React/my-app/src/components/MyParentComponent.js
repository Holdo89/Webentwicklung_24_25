import React from 'react'
import MyNestedComponent from './MyNestedComponent'

export default function MyParentComponent() {
  return (
    <div>
      <h1>Ich bin die Parent Komponente und zusätzlich die Komponente <MyNestedComponent/></h1>
    </div>
  )
}
