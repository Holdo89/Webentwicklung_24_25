import React from "react";
import MyParentComponent from "./components/MyParentComponent";
import MyGrandComponent from "./components/GrandParent";

export default function App() {
  return (
    <div>
      <MyGrandComponent />
    </div>
  );
}
