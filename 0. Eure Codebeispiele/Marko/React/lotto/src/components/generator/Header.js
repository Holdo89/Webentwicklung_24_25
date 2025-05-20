import React from 'react'
import "./style.css"

export default function Header() {
  return (
    <div>
        <h1>Lotto Zahlen Vorhersage</h1>
        <p>Diese App kann die Lottozahlen vorhersagen</p>
        <div className='resultHeader'>Result</div>
    </div>
  )
}
