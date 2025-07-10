// src/pages/WelcomePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import './WelcomePage.css';

/**
 * WelcomePage-Komponente:
 * Begrüßt den Nutzer mit animierter Glas-Karte,
 * zeigt je nach Login-Status passende Buttons.
 *
 * @component
 */
export default function WelcomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Prüft beim ersten Render, ob ein Nutzer im Local Storage liegt
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <Box className="welcome-root">
      <Container maxWidth="lg">
        {/* animierte Glas-Karte */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Haupttitel mit gradient-hover */}
          <Typography variant="h1" className="welcome-title" gutterBottom>
            Willkommen bei{' '}
            <motion.span
              className="gradient-text"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              BookBay
            </motion.span>
          </Typography>

          {/* Untertitel */}
          <Typography variant="h5" className="welcome-subtitle" gutterBottom>
            Die smarte Terminbuchung für dein Business & deine Projekte.
          </Typography>

          {/* Beschreibungstext */}
          <Typography variant="body1" className="welcome-text">
            Plane, organisiere und verwalte Termine in Echtzeit – rund um die Uhr.
            <br/>
            Erlebe höchste Flexibilität für dich und deine Kunden.
            <br/>
            <br/>
            <br/>
          </Typography>
          

          {/* CTA-Buttons je nach Login-Status */}
          <Box className="welcome-buttons">
            {user ? (
              <>
                <Button
                  variant="contained"
                  size="large"
                  className="welcome-button"
                  onClick={() => navigate('/dashboard')}
                >
                  Zum Dashboard
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  className="profile-button"
                  onClick={() => navigate('/profile')}
                >
                  Profil anzeigen
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  size="large"
                  className="welcome-button"
                  onClick={() => navigate('/login')}
                >
                  Einloggen
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  className="profile-button"
                  onClick={() => navigate('/dashboard')}
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
