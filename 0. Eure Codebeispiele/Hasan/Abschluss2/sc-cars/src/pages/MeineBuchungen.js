// src/pages/MeineBuchungen.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "../styles/MeineBuchungen.css"; // 🎨 CSS ausgelagert

import {
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

export default function MeineBuchungen() {
  const { user } = useAuth(); // 👤 Angemeldeter Benutzer
  const [buchungen, setBuchungen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3001/meine-buchungen/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setBuchungen(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Fehler beim Laden deiner Buchungen.");
        setLoading(false);
      });
  }, [user]);

  const handleStorno = (id) => {
    fetch(`http://localhost:3001/buchung/${id}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        setBuchungen((prev) => prev.filter((b) => b.id !== id));
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  };

  const now = new Date();

  return (
    <>
      <Navbar />

      <div className="meine-buchungen-container">
        <div className="meine-buchungen-wrapper">
          <Typography
            variant="h4"
            align="center"
            className="meine-buchungen-title"
          >
            Meine Buchungen
          </Typography>

          {loading && (
            <div className="meine-buchungen-loading">
              <CircularProgress />
            </div>
          )}

          {error && (
            <Alert severity="error" sx={{ marginBottom: "1rem" }}>
              {error}
            </Alert>
          )}

          {!loading && buchungen.length === 0 && (
            <Typography align="center" className="meine-buchungen-empty">
              Du hast noch keine Buchungen.
            </Typography>
          )}

          {buchungen.map((b) => {
            const dt = new Date(b.datum);
            const [h, m] = b.uhrzeit.split(":").map(Number);
            dt.setHours(h, m, 0);

            const diffH = (dt - now) / (1000 * 60 * 60);
            const stornierbar = diffH >= 24;

            return (
              <div key={b.id} className="buchung-box">
                <Typography className="buchung-datum">
                  <strong>📆 Datum:</strong>{" "}
                  {new Date(b.datum).toLocaleDateString("de-DE")} um {b.uhrzeit}
                </Typography>
                <Typography className="buchung-angebot">
                  <strong>🔧 Leistung:</strong> {b.angebot}
                </Typography>
                <Typography className="buchung-zeitstempel">
                  ⏱️ Erstellt:{" "}
                  {new Date(b.erstellt_am).toLocaleString("de-DE")}
                </Typography>

                <Button
                  variant="contained"
                  onClick={() => handleStorno(b.id)}
                  disabled={!stornierbar}
                  className={`buchung-storno-btn ${
                    stornierbar ? "aktiv" : "deaktiviert"
                  }`}
                >
                  {stornierbar
                    ? "🗑️ Buchung stornieren"
                    : "❌ Stornierung nicht mehr möglich"}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
