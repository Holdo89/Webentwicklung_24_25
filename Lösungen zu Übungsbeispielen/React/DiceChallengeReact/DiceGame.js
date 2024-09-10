import React from 'react'
import "./styles.css"

export default function DiceGame() {
  return (
<div className="container">
  <h1>Start new Game</h1>
  <div className="dice">
    <p>Player 1</p>
    <img className="img1" src="images/dice6.png" />
  </div>
  <div className="dice">
    <p>Player 2</p>
    <img className="img2" src="images/dice6.png" />
  </div>
  <br />
  <button id="newGameButton">New Game</button>
</div>
  )
}
