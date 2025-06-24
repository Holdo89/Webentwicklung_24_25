// React & React Router
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI-Komponenten für Layout und Styling
import { Box, Typography, Button, Container } from "@mui/material";

// Framer Motion für schöne Animation beim Laden
import { motion } from "framer-motion";

// CSS-Styles für diese Seite
import "./WelcomePage.css";

// ------------------------------------------
// Willkommen-Seite mit Animation und Navigation
// ------------------------------------------
function WelcomePage() {
  const navigate = useNavigate();          // Hook zur Navigation
  const [user, setUser] = useState(null);  // Benutzerstatus aus localStorage

  // Prüft beim Laden, ob ein Nutzer im localStorage gespeichert ist
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Box className="welcome-root"> {/* Hauptcontainer für den Hintergrund */}
      <Container maxWidth="md">    {/* Zentrierter Inhalt in mittlerer Breite */}
        
        {/* Animierte Kartenkomponente */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 40 }}       // Startanimation
          animate={{ opacity: 1, y: 0 }}        // Zielzustand
          transition={{ duration: 0.8, ease: "easeOut" }} // Übergang
        >
          {/* Überschrift */}
          <Typography variant="h2" className="welcome-title" gutterBottom>
            Willkommen bei{" "}
            <span className="gradient-text">
              <span>Book</span>Bay
            </span>
          </Typography>

          {/* Beschreibungstext */}
          <Typography variant="body1" className="welcome-text">
            Die intuitive Buchungs-App, mit der du Termine einfach{" "}
            <strong>planen</strong>, <strong>verwalten</strong> und{" "}
            <strong>organisieren</strong> kannst – für dein Business, deine
            Dienstleistung oder persönliche Projekte.
          </Typography>

          {/* Vorteile als Liste */}
          <ul className="welcome-list">
            <li>Flexible Terminfenster für deine Kunden</li>
            <li>Weniger Rückfragen – mehr Klarheit</li>
            <li>Effizienz auf neuem Level</li>
          </ul>

          {/* Navigationsbuttons */}
          <Box className="welcome-buttons">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(user ? "/dashboard" : "/login")}
              className="welcome-button"
            >
              {user ? "Dashboard" : "Einloggen"}  {/* Button-Text je nach Login */}
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/register")}
              className="register-button"
            >
              Registrieren
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default WelcomePage;
