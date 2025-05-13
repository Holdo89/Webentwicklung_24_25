import React from 'react'
import MyParentComponent from './components/MyParentComponent'
import GrandParentComponent from './components/GrandParentComponent'
import MyButton from './components/MyNestedComponent'

export default function App() {
  return (
    <div>
      <GrandParentComponent/>
      <MyButton/>
    </div>
    
  )
}


