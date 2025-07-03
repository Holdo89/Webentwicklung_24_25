import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Paper, Typography, Button } from "@mui/material";

export default function BuchungBestaetigt() {
  const location = useLocation();
  const navigate = useNavigate();

  // 📦 Übergabedaten von vorheriger Seite
  const { datum, angebot, uhrzeit } = location.state || {};

  // ⛔ Schutz: Wenn Daten fehlen, zurück zur Startseite
  useEffect(() => {
    if (!datum || !angebot || !uhrzeit) {
      navigate("/");
    }
  }, [datum, angebot, uhrzeit, navigate]);

  // ⏳ Nach 3 Sekunden automatisch zur Startseite
  useEffect(() => {
    if (datum && angebot && uhrzeit) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [datum, angebot, uhrzeit, navigate]);

  // 👻 Falls keine Daten vorhanden (kurzzeitig), nichts anzeigen
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

          <Typography sx={{ color: "#999", fontSize: "0.85rem" }}>
            Du wirst in wenigen Sekunden automatisch zur Startseite weitergeleitet...
          </Typography>
        </Paper>
      </Box>
    </>
  );
}
