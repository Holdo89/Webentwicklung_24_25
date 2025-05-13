import React from "react";
import MyParentComponent from "./components/MyParentComponent";
import MyGrandComponent from "./components/GrandParent";
import Button from "./components/Button";

export default function App() {
  return (
    <div>
      <MyGrandComponent />
      <Button />
    </div>
  );
}
