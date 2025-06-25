// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 🔁 Optionales Redirect-Ziel (z.B. wenn jemand zur Buchung wollte)
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

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
      if (!res.ok) throw new Error(data.error || "Login fehlgeschlagen");

      // 🔐 Login speichern & Benutzer umleiten
      login({ token: data.token, id: data.id, name: data.name });
      navigate(redirect);
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
            Kunden-Login
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="E-Mail"
              type="email"
              variant="outlined"
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
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={passwort}
              onChange={(e) => setPasswort(e.target.value)}
              required
              sx={{ mb: 3 }}
              InputLabelProps={{ style: { color: "#adebc7" } }}
              InputProps={{
                style: { color: "#adebc7" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "#adebc7" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

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

          <Typography align="center" sx={{ mt: 3, color: "#adebc7" }}>
            Noch kein Konto?{" "}
            <Link to={`/register?redirect=${redirect}`} style={{ color: "#fff", textDecoration: "underline" }}>
              Jetzt registrieren
            </Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
}
