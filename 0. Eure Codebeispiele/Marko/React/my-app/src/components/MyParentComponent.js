import React, { useState } from "react";
import MyNestedComponent from "./MyNestedComponent";
import image from "./circle.webp";
import "../App.css";

export default function MyParentComponent() {
  
  const [count, setCount] = useState(0);

  function minusClick() {
    let newCount = count -1;
    setCount(newCount)
    console.log("Count: ", count);
  }
  function plusClick() {
    let newCount = count +1;
    setCount(newCount);
    console.log("Count: ", count);
  }
  return (
    <>
      <div className="nummer">{count}</div>
      <div className="rechner">
        <button onClick={minusClick}>-</button>
        <button onClick={plusClick}>+</button>
      </div>
    </>
  );
}
