import React, { useState } from "react";

export default function Button() {

  const [color, setColor]= useState("blue");
    

  function handleClick() {

    alert("You clicked me");
    if (color === "blue"){
    setColor("red");
    }
    else{
      setColor("blue")
    }
  }


  return (
    <div>
      <button style={{backgroundColor:color}} onClick={handleClick}>Click me</button>
    </div>
  );
}
