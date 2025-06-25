// src/pages/MeineBuchungen.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

export default function MeineBuchungen() {
  const { user } = useAuth();
  const [buchungen, setBuchungen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3001/meine-buchungen/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setBuchungen(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Fehler beim Laden deiner Buchungen.");
        setLoading(false);
      });
  }, [user]);

  const handleStorno = (id) => {
    fetch(`http://localhost:3001/buchung/${id}`, {
      method: "DELETE",
    })
      .then(async res => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        setBuchungen(prev => prev.filter(b => b.id !== id));
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      });
  };

  const now = new Date();

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #2b2b2b, #1a1a1a)",
          padding: "3rem 1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: "2rem",
            borderRadius: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(150, 216, 177, 0.3)",
            boxShadow: "0 15px 40px rgba(150, 216, 177, 0.3)",
            backdropFilter: "blur(4px)",
            maxWidth: "800px",
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ color: "#adebc7", marginBottom: "2rem" }}
          >
            Meine Buchungen
          </Typography>

          {loading && (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {!loading && buchungen.length === 0 && (
            <Typography align="center" sx={{ color: "#c4f1df" }}>
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
              <Paper
                key={b.id}
                sx={{
                  mb: 2,
                  p: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(150, 216, 177, 0.2)",
                  borderRadius: "12px",
                }}
              >
                <Typography sx={{ color: "#fff" }}>
                  <strong>Datum:</strong>{" "}
                  {new Date(b.datum).toLocaleDateString("de-DE")} um {b.uhrzeit}
                </Typography>
                <Typography sx={{ color: "#c4f1df" }}>
                  <strong>Leistung:</strong> {b.angebot}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#888", display: "block", mb: 1 }}
                >
                  Erstellt am: {new Date(b.erstellt_am).toLocaleString("de-DE")}
                </Typography>

                <Button
                  variant="contained"
                  onClick={() => handleStorno(b.id)}
                  disabled={!stornierbar}
                  sx={{
                    backgroundColor: stornierbar ? "#ff6666" : "#999",
                    "&:hover": {
                      backgroundColor: stornierbar ? "#cc0000" : "#999",
                    },
                    color: "#fff",
                    mt: 1,
                  }}
                >
                  {stornierbar
                    ? "Buchung stornieren"
                    : "❌ Stornierung nicht mehr möglich"}
                </Button>
              </Paper>
            );
          })}
        </Paper>
      </Box>
    </>
  );
}
