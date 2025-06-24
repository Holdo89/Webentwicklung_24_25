// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

export default function Login() {
  const { login } = useAuth(); // 🔐 Zugriff auf Login-Funktion aus dem Kontext
  const navigate = useNavigate();
  const location = useLocation();

  // 🔙 Ziel nach erfolgreichem Login (z. B. Buchungsseite)
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  // 📦 Lokale Zustände für Eingaben & Sichtbarkeit
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [passwortSichtbar, setPasswortSichtbar] = useState(false);
  const [error, setError] = useState("");

  // ✅ Login-Handler beim Absenden des Formulars
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, passwort }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login fehlgeschlagen.");

      // ✅ Login im Context speichern + Weiterleitung
      login({ token: data.token, id: data.id, name: data.name });
      navigate(redirect);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {/* 🔝 Navigation einblenden */}
      <Navbar />

      {/* 💠 Zentrierter Seitenbereich */}
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
            maxWidth: 400,
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(150, 216, 177, 0.3)",
            boxShadow: "0 15px 30px rgba(150, 216, 177, 0.3)",
            borderRadius: "16px",
            backdropFilter: "blur(6px)",
          }}
        >
          {/* 🧾 Überschrift */}
          <Typography variant="h5" align="center" sx={{ color: "#adebc7", mb: 3 }}>
            Kunden-Login
          </Typography>

          {/* 🧾 Login-Formular */}
          <form onSubmit={handleLogin}>
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
              type={passwortSichtbar ? "text" : "password"}
              value={passwort}
              onChange={(e) => setPasswort(e.target.value)}
              required
              sx={{ mb: 1 }}
              InputLabelProps={{ style: { color: "#adebc7" } }}
              InputProps={{ style: { color: "#adebc7" } }}
            />

            {/* 👁 Passwort-Anzeige-Umschalter */}
            <Button
              onClick={() => setPasswortSichtbar(!passwortSichtbar)}
              sx={{
                color: "#adebc7",
                textTransform: "none",
                fontSize: "0.85rem",
                padding: 0,
                mb: 2,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {passwortSichtbar ? "Passwort verbergen" : "Passwort anzeigen"}
            </Button>

            {/* ⚠️ Fehleranzeige bei falschem Login */}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* ✅ Login-Button */}
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
              Einloggen
            </Button>
          </form>

          {/* 🔗 Link zur Registrierung */}
          <Typography align="center" sx={{ mt: 3, color: "#adebc7" }}>
            Noch kein Konto?{" "}
            <Link
              to="/register"
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              Jetzt registrieren
            </Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
}
