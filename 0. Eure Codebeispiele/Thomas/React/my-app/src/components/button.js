import React from 'react'

export default function PressMe() {
    function pressMe(){
        alert("you pressed the button")
    }

  return (
    
      <button onClick={pressMe}>klick </button>
    
  )
}
