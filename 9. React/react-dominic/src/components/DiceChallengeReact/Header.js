import React from 'react'

export default function Header({winner}) {
  return (
    <div>
      {winner===0 && <h1>Unentschieden</h1>}
      {winner===1 && <h1>🚩Spieler 1 ist Sieger</h1>}
      {winner===2 && <h1>Spieler 2 ist Sieger 🚩</h1>}
    </div>
  )
}
