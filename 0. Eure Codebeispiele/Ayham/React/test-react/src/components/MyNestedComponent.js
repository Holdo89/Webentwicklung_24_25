import React from 'react'
import "./style.css"
import image from "./today.png"

export default function MyNestedComponent(p) {
return (
<div className='test' style={{color:p.color}}>
    Ich bin eine verschachtelte Komponente
    {p.t}
    <img src={image}/>
</div>
)
}
