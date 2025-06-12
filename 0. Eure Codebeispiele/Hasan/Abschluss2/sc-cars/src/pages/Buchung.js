// src/pages/Buchung.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Buchung() {
  const { datum } = useParams();
  const navigate = useNavigate();
  const [angebot, setAngebot] = useState("");
  const [verfügbareZeiten, setVerfügbareZeiten] = useState([]);
  const [uhrzeit, setUhrzeit] = useState("");

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

  // Generiert Zeitfenster je nach Angebot
  useEffect(() => {
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
    setUhrzeit("");  // Zurücksetzen der Uhrzeit, wenn Angebot neu gewählt wird
  }, [angebot]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Termin gebucht am ${datum} um ${uhrzeit} für ${angebot}`);
    navigate("/");  // Nach Buchung zurück zur Startseite
  };

  return (
    <div className="buchung-page" style={{ maxWidth: "500px", margin: "2rem auto", padding: "1rem", border: "1px solid #ccc", borderRadius: "12px" }}>
      <h2>Terminbuchung für den {datum}</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label>Angebot:</label>
          <select value={angebot} onChange={(e) => setAngebot(e.target.value)} required style={{ width: "100%", padding: "0.5rem" }}>
            <option value="">Bitte wählen</option>
            {angebote.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {angebot && (
          <div>
            <label>Uhrzeit:</label>
            <select value={uhrzeit} onChange={(e) => setUhrzeit(e.target.value)} required style={{ width: "100%", padding: "0.5rem" }}>
              <option value="">Bitte wählen</option>
              {verfügbareZeiten.map((zeit, idx) => (
                <option key={idx} value={zeit}>{zeit}</option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" disabled={!uhrzeit} style={{ padding: "0.75rem", backgroundColor: "#3d8bfd", color: "white", borderRadius: "8px", border: "none" }}>
          Buchung abschließen
        </button>
      </form>
    </div>
  );
}
