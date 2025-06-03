import React, { useState } from 'react';

const tipps = [
  "Trinke genug Wasser während des Trainings.",
  "Achte auf korrekte Ausführung – Qualität vor Quantität!",
  "Aufwärmen nicht vergessen: 5-10 Minuten genügen.",
  "Regelmäßiger Schlaf unterstützt Muskelwachstum.",
  "Ernähre dich ausgewogen für bessere Leistung."
];

export default function TippDesTages() {
  const [tipp, setTipp] = useState("");

  function neuerTipp() {
    const zufall = Math.floor(Math.random() * tipps.length);
    setTipp(tipps[zufall]);
  }

  return (
    <div className="tipp-container">
      <button id="button2" onClick={neuerTipp}>Tipp des Tages</button>
      <p id="tipp-text">{tipp}</p>
    </div>
  );
}
