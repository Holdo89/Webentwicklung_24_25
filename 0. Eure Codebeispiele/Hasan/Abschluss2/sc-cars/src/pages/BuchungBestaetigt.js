// src/pages/BuchungBestaetigt.js
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // 🔝 Navigation oben
import { Box, Paper, Typography, Button } from "@mui/material";

export default function BuchungBestaetigt() {
  const location = useLocation();
  const navigate = useNavigate();

  // 📦 Übergabedaten von vorheriger Seite (z. B. /buchung)
  const { datum, angebot, uhrzeit } = location.state || {};

  // ❌ Wenn keine Daten vorhanden, zurück zur Startseite
  useEffect(() => {
    if (!datum || !angebot || !uhrzeit) {
      navigate("/");
    }
  }, [datum, angebot, uhrzeit, navigate]);

  // ⛔ Schutz, um kein leeres Layout anzuzeigen
  if (!datum || !angebot || !uhrzeit) return null;

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #2b2b2b, #1a1a1a)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 4,
            maxWidth: 500,
            width: "100%",
            borderRadius: "16px",
            textAlign: "center",
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(150, 216, 177, 0.3)",
            boxShadow: "0 15px 30px rgba(150, 216, 177, 0.3)",
            backdropFilter: "blur(6px)",
          }}
        >
          <Typography variant="h5" sx={{ color: "#adebc7", mb: 2 }}>
            Buchung bestätigt 🎉
          </Typography>

          <Typography sx={{ color: "#c4f1df", mb: 1 }}>
            Vielen Dank für Ihre Buchung!
          </Typography>

          <Typography sx={{ color: "#fff", mb: 1 }}>
            <strong>Datum:</strong>{" "}
            {new Date(datum).toLocaleDateString("de-DE")}
          </Typography>
          <Typography sx={{ color: "#fff", mb: 1 }}>
            <strong>Leistung:</strong> {angebot}
          </Typography>
          <Typography sx={{ color: "#fff", mb: 3 }}>
            <strong>Uhrzeit:</strong> {uhrzeit} Uhr
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#8cd3ad",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#68b893" },
              px: 3,
              py: 1.5,
              fontSize: "1.05rem",
              borderRadius: "8px",
            }}
            onClick={() => navigate("/")}
          >
            Zurück zur Startseite
          </Button>
        </Paper>
      </Box>
    </>
  );
}
