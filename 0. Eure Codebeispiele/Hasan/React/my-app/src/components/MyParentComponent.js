import React from 'react';
import MyNestedComponent from './MyNestedComponent';
import Button from './Button';
import './style.css';


export default function MyParentComponent({ count, onPlus, onMinus }) {
  let textVariable = "Das wird in der NestedComponent ausgegeben";
  let textVariable2 = "Mersad du Looser";
  let color = "yellow";

  return (
    <div style={{ color: 'blue', padding: '10px', marginBottom: '20px', border: '1px solid gray' }}>
      <p>Ich bin die Parent Komponente</p>
      <MyNestedComponent color={color} text={textVariable} />
      <MyNestedComponent text={textVariable2} />
      <p>Aktueller Zähler: {count}</p>
      <button onClick={onMinus}> - </button>
      <button onClick={onPlus}> + </button>
      <Button />
    </div>
  );
}

