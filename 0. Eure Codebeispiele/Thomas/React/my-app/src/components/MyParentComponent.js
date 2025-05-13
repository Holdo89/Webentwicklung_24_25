import React, { useState } from "react";
import MyNestedComponent from "./MyNestedComponent";
import "./style.css";
import image from "./bild.jpg"

export  function MyParentComponent() {
  const name = "Hello World";
  const hello = `Hello,${name}`;
  const color= "red";
  const color1="blue";

  return (
    <div>
      <h1 style={{ color: "green" }}>
        Ich bin die Parent Komponente und zusätzlich die Komponente{" "}
      </h1>
      <MyNestedComponent color ={color1} text={name}/>
      <MyNestedComponent color ={color} text="hallo thomas"></MyNestedComponent>
      <p class="add">asdf</p>
      <p>{hello}</p>
      <img style={{hight:300,width:300}} className="img1" src={image} ></img>
    </div>
  );

}
export default function Button(){
  const[count,setCount]=useState(0)

  function erhöhen(){
    let newCount =count+1
    setCount(newCount)
  }
  function vermindern(){
    let newCount =count-1
    setCount(newCount)
  }

  return(
    <>
    <h1>{count}</h1>
    <button onClick={vermindern}>
      -
    </button>
    <button onClick={erhöhen}>
      +
    </button>
    </>
  );
}

