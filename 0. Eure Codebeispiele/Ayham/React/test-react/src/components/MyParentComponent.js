import React from 'react'
import MyNestedComponent from './MyNestedComponent'


export default function MyParentComponent() {
    const name =["Bobo","Toto",6]
    const textColor = 'green';
return (
<div style={{color:'blue',fontSize:'5rem'}}>
    Ich bin Parent Komponente
    <p><MyNestedComponent t={'+'+name}/></p>
    <MyNestedComponent t={' '+6}/>
    <MyNestedComponent color={textColor}/>
    <p>hello {name}</p>
</div>
)
}
