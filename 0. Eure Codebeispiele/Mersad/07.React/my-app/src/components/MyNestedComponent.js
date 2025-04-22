import React from "react";
import "./style.css";

export default function MyNestedComponent(props) {
  const name = "Mersad";
  const message = `Hallo ${name}`;
  return (
    <div style={{ backgroundColor: "grey", color: props.color }}>
      Ich bin eine verschachtelte Komponente
      <p>{message}</p>
      {props.text}
      {props.textZwei}
    </div>
  );
}
