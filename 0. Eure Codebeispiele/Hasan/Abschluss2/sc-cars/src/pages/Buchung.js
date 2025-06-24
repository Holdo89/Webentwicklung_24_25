import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 🔐 Zugriff auf eingeloggten Benutzer
import Navbar from "../components/Navbar";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

// ✅ Dialog-Fenster für Buchungserfolg
function BuchungErfolgDialog({ open, onClose, datum, angebot, uhrzeit }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Vielen Dank für Ihre Buchung!</DialogTitle>
      <DialogContent>
        <Typography><strong>Datum:</strong> {new Date(datum).toLocaleDateString("de-DE")}</Typography>
        <Typography><strong>Leistung:</strong> {angebot}</Typography>
        <Typography><strong>Uhrzeit:</strong> {uhrzeit} Uhr</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Schließen</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Buchung() {
  const { datum } = useParams();               // 📅 Datum aus URL
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();      // 🔐 Benutzer aus globalem Login-Zustand

  // ⬇️ States
  const [angebot, setAngebot] = useState("");              // ausgewähltes Angebot
  const [verfügbareZeiten, setVerfügbareZeiten] = useState([]);  // Uhrzeiten für das Angebot
  const [uhrzeit, setUhrzeit] = useState("");              // gewählte Uhrzeit
  const [error, setError] = useState("");                  // Fehlermeldung
  const [dialogOpen, setDialogOpen] = useState(false);     // Erfolg-Dialog

  // 🔐 Wenn Benutzer nicht eingeloggt ist, leite weiter zum Login
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(`/login?redirect=/buchung/${datum}`);
    }
  }, [isLoggedIn, navigate, datum]);

  // ✅ Buchbare Angebote (Frontend-Auswahl)
  const angebote = [
    "Innenreinigung",
    "Außenreinigung",
    "Innen- und Außenreinigung",
    "Politur",
    "Kundenberatung",
    "Tiefenreinigung-Sitze",
    "Felgenreparatur",
    "Sonstiges (Begutachtung)",
  ];

  // 🕘 Errechne verfügbare Zeiten je nach Angebot
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

  // 🔁 Hilfsfunktion für Zeitintervalle
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

  // ✅ Buchung absenden
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!angebot || !uhrzeit) {
      setError("Bitte Angebot und Uhrzeit auswählen.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/buchung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          datum: new Date(datum).toISOString().split("T")[0], // 🔁 zu YYYY-MM-DD
          angebot,
          uhrzeit,
          benutzer_id: user?.id, // ✅ Benutzer-ID mitgeben
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Fehler bei der Buchung.");

      setError("");
      setDialogOpen(true); // 🎉 Erfolg
    } catch (err) {
      console.error("❌ Buchung fehlgeschlagen:", err);
      setError("Die Buchung konnte nicht gespeichert werden.");
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #2b2b2b 0%, #1a1a1a 100%)",
          padding: "3rem 1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Fade in timeout={500}>
          <Paper
            elevation={10}
            sx={{
              padding: "2rem",
              borderRadius: "16px",
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(150, 216, 177, 0.3)",
              boxShadow: "0 15px 40px rgba(150, 216, 177, 0.3)",
              backdropFilter: "blur(4px)",
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <Typography variant="h4" align="center" sx={{ color: "#adebc7", mb: 1 }}>
              Terminbuchung
            </Typography>
            <Typography variant="subtitle1" align="center" sx={{ color: "#c4f1df", mb: 4 }}>
              {new Date(datum).toLocaleDateString("de-DE")}
            </Typography>

            <form onSubmit={handleSubmit}>
              {/* Angebot Auswahl */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="angebot-label" sx={{ color: "#adebc7", fontWeight: "bold" }}>
                  Angebot
                </InputLabel>
                <Select
                  labelId="angebot-label"
                  value={angebot}
                  onChange={(e) => setAngebot(e.target.value)}
                  required
                  sx={{
                    color: "#adebc7",
                    border: "3px solid black",
                    borderRadius: "4px",
                  }}
                >
                  {angebote.map((option, idx) => (
                    <MenuItem key={idx} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Uhrzeit Auswahl */}
              {angebot && (
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="uhrzeit-label" sx={{ color: "#adebc7", fontWeight: "bold" }}>
                    Uhrzeit
                  </InputLabel>
                  <Select
                    labelId="uhrzeit-label"
                    value={uhrzeit}
                    onChange={(e) => setUhrzeit(e.target.value)}
                    required
                    sx={{
                      color: "#adebc7",
                      border: "3px solid black",
                      borderRadius: "4px",
                    }}
                  >
                    {verfügbareZeiten.map((zeit, idx) => (
                      <MenuItem key={idx} value={zeit}>
                        {zeit}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {/* Fehleranzeige */}
              {error && (
                <Typography sx={{ color: "red", fontWeight: 600, mb: 2 }} align="center">
                  {error}
                </Typography>
              )}

              {/* Absenden */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#8cd3ad",
                  fontWeight: 700,
                  "&:hover": { backgroundColor: "#68b893" },
                  padding: "0.75rem",
                  fontSize: "1.1rem",
                  borderRadius: "8px",
                }}
                disabled={!angebot || !uhrzeit}
              >
                Buchung abschließen
              </Button>
            </form>
          </Paper>
        </Fade>
      </Box>

      {/* Erfolgsdialog */}
      <BuchungErfolgDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        datum={datum}
        angebot={angebot}
        uhrzeit={uhrzeit}
      />
    </>
  );
}
