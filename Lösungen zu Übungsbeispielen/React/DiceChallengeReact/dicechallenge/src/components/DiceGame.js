import React, { useState } from "react";
import "./styles.css";
import image1 from "../assets/dice1.png";
import image2 from "../assets/dice2.png";
import image3 from "../assets/dice3.png";
import image4 from "../assets/dice4.png";
import image5 from "../assets/dice5.png";
import image6 from "../assets/dice6.png";

export default function DiceGame() {

  const [dice1, setDice1] = useState(image6)
  const [dice2, setDice2] = useState(image6)


  function rollDice() {
    const roll1 = Math.floor(Math.random() * 6);
    const roll2 = Math.floor(Math.random() * 6);

    let imageArray = [image1, image2, image3, image4, image5, image6]
    console.log("Roll Dice");

    setDice1(imageArray[roll1])
    setDice2(imageArray[roll2])

  }

  return (
    <div className="container">
      <h1>Start new Game</h1>
      <div className="dice">
        <p>Player 1</p>
        <img className="img1" src={dice1} />
      </div>
      <div className="dice">
        <p>Player 2</p>
        <img className="img2" src={dice2} />
      </div>
      <br />
      <button id="newGameButton" onClick={rollDice}>
        New Game
      </button>
    </div>
  );
}
