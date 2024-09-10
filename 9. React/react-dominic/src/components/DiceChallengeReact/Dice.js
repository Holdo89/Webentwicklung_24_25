import React from "react";
import "./styles.css";
import dice6 from "./images/dice6.png"
import dice5 from "./images/dice5.png"
import dice4 from "./images/dice4.png"
import dice3 from "./images/dice3.png"
import dice2 from "./images/dice2.png"
import dice1 from "./images/dice1.png"

export default function DiceGame({value, player}) {
  let source = ""
  if(value === 1){
    source = dice1
  }  
  else if(value === 2){
    source = dice2
  }
  else if(value === 3){
    source = dice3
  }
  else if(value === 4){
    source = dice4
  }
  else if(value === 5){
    source = dice5
  }
  else if(value === 6){
    source = dice6
  }
  return (
    <>
      <div className="dice">
        <p>Player {player}</p>
        <img className="img1" src={source} />
      </div>
    </>
  );
}
