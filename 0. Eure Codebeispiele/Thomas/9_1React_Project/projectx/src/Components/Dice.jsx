import React from 'react'

function Dice({ player1, player2 }) {
  return (
    <div style={{ fontSize: "36px", marginBottom: "20px" }}>
      <p>Spieler 1:🎲 {player1}</p>
      <p>Spieler 2:🎲 {player2}</p>
    </div>
  );
}

export default Dice;