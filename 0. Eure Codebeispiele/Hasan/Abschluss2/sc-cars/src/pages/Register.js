import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

export default function Register() {
  const navigate = useNavigate();

  // 🌱 Lokaler Zustand für Eingabefelder
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [passwortWiederholen, setPasswortWiederholen] = useState("");

  // 🌱 Statusmeldungen
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Formular absenden
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ❌ Passwortvergleich prüfen
    if (passwort !== passwortWiederholen) {
      return setError("Passwörter stimmen nicht überein.");
    }

    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vorname, nachname, email, passwort }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registrierung fehlgeschlagen.");

      // ✅ Erfolgreich
      setSuccess("Registrierung erfolgreich! Du kannst dich jetzt einloggen.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("❌ Fehler bei Registrierung:", err);
      setError(err.message);
    }
  };

  return (
    <>
      {/* 🔝 Navbar oben */}
      <Navbar />

      {/* 🧾 Seite + Formular */}
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #2b2b2b, #1a1a1a)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 4,
            maxWidth: 450,
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(150, 216, 177, 0.3)",
            boxShadow: "0 15px 30px rgba(150, 216, 177, 0.3)",
            borderRadius: "16px",
            backdropFilter: "blur(6px)",
          }}
        >
          <Typography variant="h5" align="center" sx={{ color: "#adebc7", mb: 3 }}>
            Registrierung
          </Typography>

          {/* 🧾 Formularfelder */}
          <form onSubmit={handleRegister}>
            <TextField
              fullWidth
              label="Vorname"
              value={vorname}
              onChange={(e) => setVorname(e.target.value)}
              required
              sx={{ mb: 2 }}
              InputLabelProps={{ style: { color: "#adebc7" } }}
              InputProps={{ style: { color: "#adebc7" } }}
            />
            <TextField
              fullWidth
              label="Nachname"
              value={nachname}
              onChange={(e) => setNachname(e.target.value)}
              required
              sx={{ mb: 2 }}
              InputLabelProps={{ style: { color: "#adebc7" } }}
              InputProps={{ style: { color: "#adebc7" } }}
            />
            <TextField
              fullWidth
              label="E-Mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
              InputLabelProps={{ style: { color: "#adebc7" } }}
              InputProps={{ style: { color: "#adebc7" } }}
            />
            <TextField
              fullWidth
              label="Passwort"
              type="password"
              value={passwort}
              onChange={(e) => setPasswort(e.target.value)}
              required
              sx={{ mb: 2 }}
              InputLabelProps={{ style: { color: "#adebc7" } }}
              InputProps={{ style: { color: "#adebc7" } }}
            />
            <TextField
              fullWidth
              label="Passwort wiederholen"
              type="password"
              value={passwortWiederholen}
              onChange={(e) => setPasswortWiederholen(e.target.value)}
              required
              sx={{ mb: 3 }}
              InputLabelProps={{ style: { color: "#adebc7" } }}
              InputProps={{ style: { color: "#adebc7" } }}
            />

            {/* ⚠️ Fehlermeldung */}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {/* ✅ Erfolgsmeldung */}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#8cd3ad",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#68b893" },
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: "8px",
              }}
            >
              Registrieren
            </Button>
          </form>

          {/* 🔁 Bereits registriert? */}
          <Typography align="center" sx={{ mt: 3, color: "#adebc7" }}>
            Bereits registriert?{" "}
            <Link
              to="/login"
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              Jetzt einloggen
            </Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
}
