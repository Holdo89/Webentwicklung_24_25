import React, { useState } from 'react';

export default function Button() {
  const [isBlue, setIsBlue] = useState(true);

  function handleClick() {
    alert("Button wurde geklickt!");
    setIsBlue(!isBlue);
  }

  const buttonStyle = {
    backgroundColor: isBlue ? 'blue' : 'red',
    color: 'yellow',
    padding: '10px 20px',
    border: 'none',
    marginTop: '10px'
  };

  return (
    <button onClick={handleClick} style={buttonStyle}>
      Klick mich!
    </button>
  );
}
