import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import "./WelcomePage.css";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <Box className="welcome-root">
      <Container maxWidth="md">
        <Paper className="welcome-card" elevation={8}>
          <Typography variant="h2" className="welcome-title" gutterBottom>
            Willkommen bei{" "}
            <span>
              <span style={{ color: "#006C84", fontWeight: 600 }}>Book</span>
              <span style={{ color: "#b9b0b0", fontWeight: 600 }}>Bay</span>
            </span>
          </Typography>
          <Typography variant="body1" className="welcome-text">
            BookBay ist eine intuitive Buchungs-App, mit der du Termine einfach
            planen, verwalten und organisieren kannst – egal ob für dein
            Unternehmen, deine Dienstleistung oder persönliche Projekte.
            <br />
            <br />
            Biete deinen Kunden flexible Zeitfenster an, reduziere den
            Kommunikationsaufwand und steigere deine Effizienz. Mit einer klaren
            Oberfläche und smarten Funktionen wirst du BookBay nie wieder missen
            wollen.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/dashboard")}
            className="welcome-button"
          >
            Zu deinem Dashboard
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default WelcomePage;
