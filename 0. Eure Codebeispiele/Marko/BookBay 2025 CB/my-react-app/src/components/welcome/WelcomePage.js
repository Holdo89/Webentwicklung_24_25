import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import "./WelcomePage.css";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <Box className="welcome-root">
      <Container maxWidth="md">
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography variant="h2" className="welcome-title" gutterBottom>
            Willkommen bei{" "}
            <span className="gradient-text">
              <span>Book</span>Bay
            </span>
          </Typography>

          <Typography variant="body1" className="welcome-text">
            Die intuitive Buchungs-App, mit der du Termine einfach{" "}
            <strong>planen</strong>, <strong>verwalten</strong> und{" "}
            <strong>organisieren</strong> kannst – für dein Business, deine
            Dienstleistung oder persönliche Projekte.
          </Typography>

          <ul className="welcome-list">
            <li>Flexible Terminfenster für deine Kunden</li>
            <li>Weniger Rückfragen – mehr Klarheit</li>
            <li>Effizienz auf neuem Level</li>
          </ul>

          <Box className="welcome-buttons">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/dashboard")}
              className="welcome-button"
            >
              Dashboard
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
