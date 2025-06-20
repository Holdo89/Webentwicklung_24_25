// src/pages/Buchung.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

function BuchungErfolgDialog({ open, onClose, datum, angebot, uhrzeit }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Vielen Dank für Ihre Buchung!</DialogTitle>
      <DialogContent>
        <Typography>
          <strong>Datum:</strong> {new Date(datum).toLocaleDateString("de-DE")}
        </Typography>
        <Typography>
          <strong>Leistung:</strong> {angebot}
        </Typography>
        <Typography>
          <strong>Uhrzeit:</strong> {uhrzeit} Uhr
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Schließen
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Buchung() {
  const { datum } = useParams();
  const navigate = useNavigate();

  const [angebot, setAngebot] = useState("");
  const [verfügbareZeiten, setVerfügbareZeiten] = useState([]);
  const [uhrzeit, setUhrzeit] = useState("");
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

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
          datum: new Date(datum).toISOString().split("T")[0], // YYYY-MM-DD
          angebot,
          uhrzeit,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Fehler bei der Buchung.");

      setError("");
      setDialogOpen(true);
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
              transition: "transform 0.4s ease, box-shadow 0.4s ease",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0 18px 50px rgba(150, 216, 177, 0.4)",
              },
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{ color: "#adebc7", marginBottom: "0.5rem" }}
            >
              Terminbuchung
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              sx={{ color: "#c4f1df", marginBottom: "2rem" }}
            >
              {new Date(datum).toLocaleDateString("de-DE")}
            </Typography>

            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                {angebot === "" && (
                  <InputLabel
                    id="angebot-label"
                    sx={{ color: "#adebc7", fontWeight: "bold" }}
                  >
                    Angebot
                  </InputLabel>
                )}
                <Select
                  labelId="angebot-label"
                  value={angebot}
                  onChange={(e) => setAngebot(e.target.value)}
                  required
                  sx={{
                    color: "#adebc7",
                    border: "3px solid black",
                    borderRadius: "4px",
                    "& .MuiSelect-select": { paddingLeft: "8px" },
                  }}
                  displayEmpty={false}
                >
                  {angebote.map((option, idx) => (
                    <MenuItem key={idx} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {angebot && (
                <FormControl fullWidth sx={{ mb: 3 }}>
                  {uhrzeit === "" && (
                    <InputLabel
                      id="uhrzeit-label"
                      sx={{ color: "#adebc7", fontWeight: "bold" }}
                    >
                      Uhrzeit
                    </InputLabel>
                  )}
                  <Select
                    labelId="uhrzeit-label"
                    value={uhrzeit}
                    onChange={(e) => setUhrzeit(e.target.value)}
                    required
                    sx={{
                      color: "#adebc7",
                      border: "3px solid black",
                      borderRadius: "4px",
                      "& .MuiSelect-select": { paddingLeft: "8px" },
                    }}
                    displayEmpty={false}
                  >
                    {verfügbareZeiten.map((zeit, idx) => (
                      <MenuItem key={idx} value={zeit}>
                        {zeit}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {error && (
                <Typography sx={{ color: "red", fontWeight: 600, mb: 2 }} align="center">
                  {error}
                </Typography>
              )}

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
