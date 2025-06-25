// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
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
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [passwort2, setPasswort2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passwort !== passwort2) {
      setError("Passwörter stimmen nicht überein.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${vorname} ${nachname}`,
          email,
          passwort,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registrierung fehlgeschlagen");

      setSuccess("Registrierung erfolgreich!");
      setTimeout(() => navigate(`/login?redirect=${redirect}`), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

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
          p: 2,
        }}
      >
        <Paper
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
          <Typography variant="h5" align="center" sx={{ color: "#adebc7", mb: 3 }}>
            Konto erstellen
          </Typography>

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
              value={passwort2}
              onChange={(e) => setPasswort2(e.target.value)}
              required
              sx={{ mb: 3 }}
              InputLabelProps={{ style: { color: "#adebc7" } }}
              InputProps={{ style: { color: "#adebc7" } }}
            />

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
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

          <Typography align="center" sx={{ mt: 3, color: "#adebc7" }}>
            Bereits registriert?{" "}
            <Link
              to={`/login?redirect=${redirect}`}
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              Zum Login
            </Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
}
