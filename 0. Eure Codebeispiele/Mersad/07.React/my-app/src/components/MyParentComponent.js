import React from "react";
import MyNestedComponent from "./MyNestedComponent";

export default function MyParentComponent() {
  let input = "Ich bin cool";
  let second = "Hasan nicht :)";
  let color = "yellow";
  return (
    <div>
      ich bin die Parent Komponente <MyNestedComponent />
      <MyNestedComponent text={input} />
      <MyNestedComponent textZwei={second} />
      <MyNestedComponent color={color} />
    </div>
  );
}
