import React, { useState } from 'react'
import Header from './Header';
import Dice from './Dice';

export default function DiceGame() {
  const [player1,setPlayer1]=useState(1);
  const [player2,setPlayer2]=useState(1);
  const[winner,setWinner]=useState("")
}

function rollDice(){
    const roll1=Math.ceil(Math.random()*6)
    const roll2=Math.ceil(Math.random()*6)
    setPlayer1(roll1);
    setPlayer2(roll2);

if (roll1 > roll2) {
      setWinner(" Spieler 1 gewinnt!");
    } else if (roll2 > roll1) {
      setWinner(" Spieler 2 gewinnt!");
    } else {
      setWinner(" Unentschieden!");
    }

}
return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Würfelspiel</h1>
      <Header winnerText={winner} />
      <Dice player1={player1} player2={player2} />
      <button onClick={rollDice} style={{ padding: "10px 20px", fontSize: "18px" }}>
        Würfeln
      </button>
    </div>
  );

