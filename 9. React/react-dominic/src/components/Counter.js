import React, { useEffect } from 'react'
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0)

    useEffect(() => {
      console.log("Komponente wurde neuu gerendert");
    })

    useEffect(() => {
      console.log("Komponente wurde neuu gerendert");
    },[])

    useEffect(() => {
      console.log("Komponente wurde neuu gerendert");
    })

    function handleIncrement(){
      setCount(count+1)
      console.log("Count: ",count)  
    }

  return (
    <div style={{color:"white"}}>
      {count}
    <button onClick={handleIncrement}>+</button>
    </div>
  )
}

export default Counter
