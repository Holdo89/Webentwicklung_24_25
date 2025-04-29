import React from 'react'
import MyNestedComponent from './MyNestedComponent'
import './style.css'
export default function MyParentComponent() {

  let textVariable = "Das wird in der NestedComponent ausgegeben";
  let textVariable2 = "Mersad du Looser"
  let color = "yellow";

  return (
    <div style={{ color: 'blue', padding: '10px' }}>
      Ich bin die Parent Komponente
       <MyNestedComponent color = {color} text = {textVariable} />
       <MyNestedComponent text = {textVariable2} />
       
    </div>
  )
}
