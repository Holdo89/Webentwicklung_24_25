import React from "react";

export default function Button() {
  const [color, setColor] = React.useState("blue");
  //const [isClicked, setIsClicked] = React.useState(false);

  function handleClick() {
    if (color === "blue") {
      setColor("red");
    } else {
      setColor("blue");
    }
  }
  //function showAlert() {
  //  setIsClicked(!isClicked);
  //}
  return (
    <div>
      <button style={{ backgroundColor: color }} onClick={handleClick}>
        klick mich
      </button>
    </div>
  );
}
