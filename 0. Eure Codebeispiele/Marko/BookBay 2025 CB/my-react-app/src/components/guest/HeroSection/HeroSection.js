import React, { useState } from 'react';
import ContactPopup from '../Contact/ContactPopup';
import './HeroSection.css';

/**
 * HeroSection-Komponente:
 * Zeigt einen Hinweis bei ausgebuchten Terminen
 * und öffnet ein Kontakt-Popup.
 */
export default function HeroSection() {
  const [isContactOpen, setContactOpen] = useState(false);

  // Öffnet das Kontaktformular
  const openContact = () => setContactOpen(true);

  // Schließt das Kontaktformular
  const closeContact = () => setContactOpen(false);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Termin ausgebucht?</h1>
          <p>
            Der gewünschte Termin ist bereits voll? Kein Problem – kontaktieren
            Sie einfach direkt den Veranstalter, um Ihre Anfrage zu besprechen.
          </p>
          <button className="hero-btn" onClick={openContact}>
            Veranstalter kontaktieren
          </button>
        </div>
      </section>

      <ContactPopup open={isContactOpen} onClose={closeContact} />
    </>
  );
}
