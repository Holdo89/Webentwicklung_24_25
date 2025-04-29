import React from "react";
import MyNestedComponent from "./MyNestedComponent";
import image from "./circle.webp"

export default function MyParentComponent() {
  const name = "Marko";
  const greetingMessage = `Hallo, ${name}`;
  let textVariable = "Das hier ist irgendeiner Text";
  let number= 3;
  let color="red"
  return (
    <div>
      Ich bin die Parent Komponente
      <img width="300px" height="300px" src={image}></img>
      <div className="nested" style={{ color: "red", fontFamily: "cursive" }}>
        {greetingMessage}
        <p>Ich bin eine verschachtelte Komponente.</p>
        <p>Wie kann ich dir Helfen, {name}?</p>
      </div>
      <MyNestedComponent color={color} text={textVariable} myNumber={number}/>
      <MyNestedComponent text={"Wie geht's dir den?"} />
      <MyNestedComponent color={color} text={"React ist sehr cool"} />
    </div>
  );








}

