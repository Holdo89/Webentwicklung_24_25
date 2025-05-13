import React from 'react'
import myImage from '../components/one2.jpg'

export default function MyNestedComponent(props) {
  const name = 'Cristiano Ronaldo';
  const greetingMessage = `Hello, ${name}`;

  return (
    <div style={{color:props.color}}><br></br>
    <img className='asd' src={myImage}></img>
           Ich bin eine verschachtelte Komponente
            <br></br>
            <p>{greetingMessage}</p>
            {props.text}
            

    </div>
  )
}
