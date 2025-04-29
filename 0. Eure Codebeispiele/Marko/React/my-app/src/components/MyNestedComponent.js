import React from "react";
import "./style.css";

export default function MyNestedComponent(props) {
  return (
    <>
      <div style={{color:props.color}}>{props.text}</div>
    </>
  );
}
