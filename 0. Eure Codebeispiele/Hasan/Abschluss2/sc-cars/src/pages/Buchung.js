import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "../styles/Buchung.css"; // 🎨 Buchungs-Styling

export default function Buchung() {
  const { datum } = useParams(); // 📅 Datum aus URL
  const navigate = useNavigate();
  const { user } = useAuth(); // 👤 Aktueller Benutzer

  // 🧠 Zustände
  const [angebot, setAngebot] = useState("");
  const [uhrzeit, setUhrzeit] = useState("");
  const [zeiten, setZeiten] = useState([]);
  const [error, setError] = useState("");

  // 🔐 Weiterleitung zum Login, falls nicht eingeloggt
  useEffect(() => {
    if (!user) {
      navigate(`/login?redirect=/buchung/${datum}`);
    }
  }, [user, navigate, datum]);

  // 📋 Mögliche Leistungen
  const angebote = [
    "Innenreinigung",
    "Außenreinigung",
    "Innen- und Außenreinigung",
    "Politur",
    "Kundenberatung",
    "Tiefenreinigung-Sitze",
    "Felgenreparatur",
    "Sonstiges",
  ];

  // 🕒 Dynamische Uhrzeiten je nach Angebot
  useEffect(() => {
    if (!angebot) return;

    let endHour = 17;
    let endMinute = 30;

    // ⏰ Je nach Angebot die maximale Endzeit festlegen
    switch (angebot) {
      case "Politur":
        endHour = 15;
        endMinute = 0;
        break;
      case "Tiefenreinigung-Sitze":
      case "Felgenreparatur":
      case "Sonstiges":
        endHour = 16;
        endMinute = 0;
        break;
      default:
        endHour = 17;
        endMinute = 30;
    }

    // 📅 Zeit-Slots von 9:00 bis zur erlaubten Endzeit generieren
    const slots = [];
    for (let h = 9; h <= endHour; h++) {
      slots.push(`${h.toString().padStart(2, "0")}:00`);
      if (h !== endHour || endMinute === 30) {
        slots.push(`${h.toString().padStart(2, "0")}:30`);
      }
    }

    setZeiten(slots);
  }, [angebot]);

  // ✅ Buchung absenden
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!angebot || !uhrzeit) {
      setError("Bitte wähle eine Leistung und eine Uhrzeit.");
      return;
    }

    const response = await fetch("http://localhost:3001/buchung", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        datum: new Date(datum).toISOString().split("T")[0],
        angebot,
        uhrzeit,
        benutzer_id: user.id,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Ein Fehler ist aufgetreten.");
      return;
    }

    // 🎉 Erfolgreich gebucht – weiter zur Bestätigung
    navigate("/bestaetigt", {
      state: { datum, angebot, uhrzeit },
    });
  };

  return (
    <>
      <Navbar />

      <div className="buchung-container">
        <div className="buchung-card">
          <h2 className="buchung-title">
            Buchung am {new Date(datum).toLocaleDateString("de-DE")}
          </h2>

          <form onSubmit={handleSubmit} className="buchung-form">
            {/* 🛠️ Leistungsauswahl */}
            <label>
              Leistung
              <select
                value={angebot}
                onChange={(e) => setAngebot(e.target.value)}
                required
              >
                <option value="">Bitte wählen</option>
                {angebote.map((a, i) => (
                  <option key={i}>{a}</option>
                ))}
              </select>
            </label>

            {/* ⏰ Uhrzeit nur anzeigen, wenn Leistung gewählt */}
            {angebot && (
              <label>
                Uhrzeit
                <select
                  value={uhrzeit}
                  onChange={(e) => setUhrzeit(e.target.value)}
                  required
                >
                  <option value="">Bitte wählen</option>
                  {zeiten.map((z, i) => (
                    <option key={i}>{z}</option>
                  ))}
                </select>
              </label>
            )}

            {/* ⚠️ Fehlermeldung */}
            {error && <div className="error-msg">{error}</div>}

            {/* ✅ Absenden */}
            <button type="submit" className="submit-btn">
              Buchen
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
