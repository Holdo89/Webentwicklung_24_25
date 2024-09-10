export default function MyNestedComponent(props) {
if(props.componentVisibility)
  return (
    <div style={{color:props.color}}>
      Ich bin eine verschachtelte Komponente
    </div>
  )
else{
    return null;
}
}
