import React from "react";
import '../../styles/hauptseite.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export default function Body() {
const navigate=useNavigate();

useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Kein Token vorhanden? Weiterleiten zur Login-Seite
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="content">
      <h2>Dein Weg zu mehr Fitness beginnt hier</h2>
      <p>
        Starte jetzt mit deinem individuell angepassten Trainingsplan
        und erreiche deine Ziele Schritt für Schritt!
      </p>

      <a href="trainingsplan.html" className="button" id="button1">
        Trainingsplan starten
      </a>

      <div className="cards">
        <div className="card-hauptseite">
          <h3>Schritt 1</h3>
          <p>Leichte Übungen zur Gewöhnung und Aktivierung der Muskulatur.</p>
        </div>
        <div className="card-hauptseite">
          <h3>Schritt 2</h3>
          <p>Mehr Fokus auf Ausdauer und Koordination.</p>
        </div>
        <div className="card-hauptseite">
          <h3>Schritt 3</h3>
          <p>Steigere deine Kraft und halte durch!</p>
        </div>
      </div>
    </div>
  );
}
