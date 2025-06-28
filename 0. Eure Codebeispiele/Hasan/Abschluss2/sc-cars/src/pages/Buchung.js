import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "../styles/Buchung.css";

export default function Buchung() {
  const { datum } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [angebot, setAngebot] = useState("");
  const [uhrzeit, setUhrzeit] = useState("");
  const [zeiten, setZeiten] = useState([]);
  const [vergeben, setVergeben] = useState([]);
  const [error, setError] = useState("");

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

  // Weiterleitung bei nicht-eingeloggtem Nutzer
  useEffect(() => {
    if (!user) navigate(`/login?redirect=/buchung/${datum}`);
  }, [user, navigate, datum]);

  // Lade bereits vergebene Zeiten vom Server
  useEffect(() => {
    fetch(`http://localhost:3001/vergebene-zeiten/${datum}`)
      .then((res) => res.json())
      .then((data) => setVergeben(data));
  }, [datum]);

  // Verfügbare Zeiten generieren und prüfen
  useEffect(() => {
    if (!angebot) return;

    let endStunde = 17.5;
    if (angebot === "Politur") endStunde = 15;
    else if (
      ["Felgenreparatur", "Tiefenreinigung-Sitze", "Sonstiges"].includes(
        angebot
      )
    )
      endStunde = 16;
    else if (angebot === "Innen- und Außenreinigung") endStunde = 17.5;

    const dauerMap = {
      Politur: 5,
      "Innenreinigung": 2,
      "Außenreinigung": 2,
      "Innen- und Außenreinigung": 3,
      "Felgenreparatur": 3.5,
      "Tiefenreinigung-Sitze": 3.5,
      Kundenberatung: 1.5,
      Sonstiges: 1.5,
    };
    const dauer = dauerMap[angebot];

    const slots = [];
    for (let h = 9; h <= endStunde - 0.5; h += 0.5) {
      const [hour, min] = [Math.floor(h), (h % 1) * 60];
      const zeit = `${hour.toString().padStart(2, "0")}:${min
        .toString()
        .padStart(2, "0")}`;

      // Prüfe Kollision mit bereits vergebenen Zeiträumen
      const konflikt = vergeben.some((v) => {
        const start = parseFloat(v.uhrzeit.replace(":", "."));
        const ende = start + dauerMap[v.angebot];
        const t = h;
        return t >= start && t < ende;
      });

      slots.push({ zeit, disabled: konflikt });
    }

    setZeiten(slots);
  }, [angebot, vergeben]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!angebot || !uhrzeit) {
      setError("Bitte Leistung und Uhrzeit wählen.");
      return;
    }

    const res = await fetch("http://localhost:3001/buchung", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        datum: new Date(datum).toISOString().split("T")[0],
        angebot,
        uhrzeit,
        benutzer_id: user.id,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Fehler bei Buchung.");
      return;
    }

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
            <label>
              Leistung
              <select
                value={angebot}
                onChange={(e) => {
                  setAngebot(e.target.value);
                  setUhrzeit("");
                }}
                required
              >
                <option value="">Bitte wählen</option>
                {angebote.map((a, i) => (
                  <option key={i}>{a}</option>
                ))}
              </select>
            </label>

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
                    <option key={i} value={z.zeit} disabled={z.disabled}>
                      {z.zeit} {z.disabled ? "⛔" : ""}
                    </option>
                  ))}
                </select>
              </label>
            )}

            {error && <div className="error-msg">{error}</div>}
            <button type="submit" className="submit-btn">
              Buchen
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
