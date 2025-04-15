import React from "react";
import MyNestedComponent from "./MyNestedComponent";

export default function MyParentComponent() {
  return (
    <div>
      ich bin die Parent Komponente <MyNestedComponent />
    </div>
  );
}
