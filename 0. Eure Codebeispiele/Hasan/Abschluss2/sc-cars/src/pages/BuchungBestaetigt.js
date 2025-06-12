// src/pages/BuchungBestaetigt.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BuchungBestaetigt() {
  const location = useLocation();
  const navigate = useNavigate();
  const { datum, angebot, uhrzeit } = location.state || {};

  // Wenn kein state vorhanden ist (z.B. direkter Aufruf), zurück zur Startseite
  if (!datum || !angebot || !uhrzeit) {
    navigate("/");
    return null;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "3rem auto", padding: "2rem", border: "1px solid #ccc", borderRadius: "12px", textAlign: "center" }}>
      <h2>Buchungsbestätigung</h2>
      <p>Vielen Dank für Ihre Buchung!</p>
      <p><strong>Datum:</strong> {datum}</p>
      <p><strong>Leistung:</strong> {angebot}</p>
      <p><strong>Uhrzeit:</strong> {uhrzeit} Uhr</p>

      <button
        onClick={() => navigate("/")}
        style={{ marginTop: "2rem", padding: "0.75rem 1.5rem", backgroundColor: "#3d8bfd", color: "white", borderRadius: "8px", border: "none" }}
      >
        Zurück zur Startseite
      </button>
    </div>
  );
}
