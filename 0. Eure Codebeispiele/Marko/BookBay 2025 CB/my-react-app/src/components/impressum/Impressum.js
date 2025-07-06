// src/components/Impressum.jsx
import React, { useState } from 'react';
import { ReactComponent as InfoIcon } from '../../assets/impress-icon.svg';
import './Impressum.css';

export default function Impressum() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Icon unten rechts */}
      <button
        className="impress-button"
        aria-label="Impressum öffnen"
        onClick={() => setOpen(true)}
      >
        <InfoIcon className="impress-icon" />
      </button>

      {/* Overlay / Modal */}
      {open && (
        <div className="impress-overlay" onClick={() => setOpen(false)}>
          <div
            className="impress-modal"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="impress-close"
              aria-label="Schließen"
              onClick={() => setOpen(false)}
            >
              &times;
            </button>
            <h2>Impressum</h2>
            <p><strong>Cankovic Marko</strong></p>
            <p>Vittorellistraße 3<br/>4040 Linz<br/>Österreich</p>
            <p>Telefon: +43 66306298619<br/>E-Mail: marko.cankovic00@gmail.com</p>
            <br/>
            <p>Coders.Bay 2025 / Abschlussprojekt</p>
          </div>
        </div>
      )}
    </>
  );
}
