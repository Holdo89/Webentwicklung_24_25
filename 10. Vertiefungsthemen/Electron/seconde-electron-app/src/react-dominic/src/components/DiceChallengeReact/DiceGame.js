import React from "react";
import "./styles.css";
import Header from "./Header";
import Dice from "./Dice";

export default function DiceGame() {
  let randomNumber1 = Math.ceil(Math.random()*6);
  let randomNumber2 = Math.ceil(Math.random()*6);
  let winner = 0;
  if(randomNumber1>randomNumber2){
    winner = 1
  }
  if(randomNumber1<randomNumber2){
    winner = 2
  }

  return (
    <div className="container">
      <Header winner={winner}/>
      <Dice player={1} value={randomNumber1}/>
      <Dice player={2} value={randomNumber2}/>
    </div>
  );
}
