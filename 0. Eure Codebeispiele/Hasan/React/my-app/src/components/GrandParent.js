import React, { useState } from "react";
import MyParentComponent from "./MyParentComponent";

export default function MyGrandComponent() {
  const [count, setCount] = useState(0);
  function handleClickPlus() {
    let newCount = count + 1;
    setCount(newCount);
    console.log(count);
  }
  function handleClickMinus() {
    let newCount = count - 1;
    setCount(newCount);
    console.log(count);
  }
  return (
    <div>
      <MyParentComponent />
      <MyParentComponent />
      <p>{count}</p>
      <button onClick={handleClickMinus}> - </button>
      <button onClick={handleClickPlus}> + </button>
    </div>
  );
}
