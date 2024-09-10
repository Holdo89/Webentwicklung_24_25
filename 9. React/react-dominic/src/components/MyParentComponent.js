import MyNestedComponent from "./MyNestedComponent";

export default function MyParentComponent() {
  let color = "green";
  let componentVisibility = false;
  return (
    <>
      <div>Ich bin die Parent Komponente</div>
      button
      <MyNestedComponent color={color} componentVisibility={componentVisibility} />
    </>
  );
}
