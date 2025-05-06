import React from "react";
import "./style.css";
import myImage from "../components/IQRA.jpg";

export default function MyNestedComponent(props) {
  const name = "Mersad";
  const message = `Hallo ${name}`;
  return (
    <div style={{ backgroundColor: "grey", color: props.color }}>
      <img className="iqra" src={myImage} />
      Ich bin eine verschachtelte Komponente
      <p>{message}</p>
      {props.text}
      {props.textZwei}
    </div>
  );
}
