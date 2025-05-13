import React, { useState } from "react";
import "./style.css";

export default function MyButton() {
  const [isClicked, setIsClicked] = useState(false);

  function showAlert() {
    //alert("Hello from MyButton");
    setIsClicked(!isClicked)
  }

  return (
    <>
      <button style={{ backgroundColor: isClicked ? "red" : "blue" }} onClick={showAlert}>
        Alert
      </button>
    </>
  );
}
