import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import "./WelcomePage.css";

export default function WelcomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <Box className="welcome-root">
      <Container maxWidth="lg">
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography variant="h1" className="welcome-title" gutterBottom>
            Willkommen bei <span className="gradient-text">BookBay</span>
          </Typography>

          <Typography variant="h5" className="welcome-subtitle" gutterBottom>
            Die smarte Terminbuchung für dein Business & deine Projekte.
          </Typography>

          <Typography variant="body1" className="welcome-text">
            Plane, organisiere und verwalte Termine in Echtzeit – rund um die Uhr.
            Erlebe höchste Flexibilität für dich und deine Kunden.
          </Typography>

          <Box className="welcome-buttons">
            {user ? (
              <>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/dashboard")}
                  className="welcome-button"
                >
                  Zum Dashboard
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/profile")}
                  className="profile-button"
                >
                  Profil anzeigen
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/login")}
                  className="welcome-button"
                >
                  Einloggen
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/dashboard")}
                  className="profile-button"
                >
                  Kalender ansehen
                </Button>
              </>
            )}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
