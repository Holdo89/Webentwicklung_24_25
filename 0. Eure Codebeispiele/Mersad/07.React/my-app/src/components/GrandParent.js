import React from "react";
import MyParentComponent from "./MyParentComponent";

export default function MyGrandComponent() {
  return (
    <div>
      <MyParentComponent />
      <MyParentComponent />
    </div>
  );
}
