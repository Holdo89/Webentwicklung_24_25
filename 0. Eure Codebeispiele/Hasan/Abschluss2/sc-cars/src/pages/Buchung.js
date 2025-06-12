// src/pages/Buchung.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Buchung.css";

export default function Buchung() {
  const { datum } = useParams();
  const [angebot, setAngebot] = useState("");
  const [verfügbareZeiten, setVerfügbareZeiten] = useState([]);
  const [uhrzeit, setUhrzeit] = useState("");
  const [error, setError] = useState("");

  const angebote = [
    "Innenreinigung",
    "Außenreinigung",
    "Innen- und Außenreinigung",
    "Politur",
    "Kundenberatung",
    "Tiefenreinigung-Sitze",
    "Felgenreparatur",
    "Sonstiges (Begutachtung)"
  ];

  useEffect(() => {
    const zeitenNachAngebot = () => {
      switch (angebot) {
        case "Innenreinigung":
        case "Außenreinigung":
        case "Kundenberatung":
          return generiereZeiten("09:00", "17:00");
        case "Innen- und Außenreinigung":
          return generiereZeiten("09:00", "15:30");
        case "Politur":
          return generiereZeiten("10:00", "14:00");
        case "Tiefenreinigung-Sitze":
        case "Felgenreparatur":
        case "Sonstiges (Begutachtung)":
          return generiereZeiten("09:00", "15:00");
        default:
          return [];
      }
    };

    setVerfügbareZeiten(zeitenNachAngebot());
  }, [angebot]);

  const generiereZeiten = (start, ende) => {
    const zeiten = [];
    let [stunde, minute] = start.split(":").map(Number);
    const [endStunde, endMinute] = ende.split(":").map(Number);

    while (stunde < endStunde || (stunde === endStunde && minute <= endMinute)) {
      const h = stunde.toString().padStart(2, "0");
      const m = minute.toString().padStart(2, "0");
      zeiten.push(`${h}:${m}`);
      minute += 30;
      if (minute >= 60) {
        minute = 0;
        stunde++;
      }
    }
    return zeiten;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!angebot || !uhrzeit) {
      setError("Bitte wähle ein Angebot und eine Uhrzeit aus.");
      return;
    }

    setError("");
    alert(`Termin gebucht am ${datum} um ${uhrzeit} für ${angebot}`);
  };

  return (
    <div className="buchung-page">
      <div className="buchung-container">
        <h2 className="buchung-heading">
          Terminbuchung für <span className="buchung-highlight">{datum}</span>
        </h2>

        <form onSubmit={handleSubmit} className="buchung-form">
          <label className="buchung-label">
            Angebot:
            <select
              className="buchung-select"
              value={angebot}
              onChange={(e) => setAngebot(e.target.value)}
              required
            >
              <option value="">Bitte wählen</option>
              {angebote.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
          </label>

          {angebot && (
            <label className="buchung-label">
              Uhrzeit:
              <select
                className="buchung-select"
                value={uhrzeit}
                onChange={(e) => setUhrzeit(e.target.value)}
                required
              >
                <option value="">Bitte wählen</option>
                {verfügbareZeiten.map((zeit, idx) => (
                  <option key={idx} value={zeit}>{zeit}</option>
                ))}
              </select>
            </label>
          )}

          {error && <p className="buchung-error">{error}</p>}

          <button type="submit" className="buchung-button">
            Buchung abschließen
          </button>
        </form>
      </div>
    </div>
  );
}
