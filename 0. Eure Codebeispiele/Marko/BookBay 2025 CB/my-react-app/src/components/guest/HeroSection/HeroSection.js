import React, { useState } from "react";
import "./HeroSection.css";
import ContactPopup from "../Contact/ContactPopup";

export default function HeroSection() {
  const [openContact, setOpenContact] = useState(false);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Termin ausgebucht?</h1>
          <p>
            Der gewünschte Termin ist bereits voll? Kein Problem – kontaktieren
            Sie einfach direkt den Veranstalter, um Ihre Anfrage zu besprechen.
          </p>
          <button
            className="hero-btn"
            onClick={() => setOpenContact(true)}
          >
            Veranstalter kontaktieren
          </button>
        </div>
      </section>

      <ContactPopup
        open={openContact}
        onClose={() => setOpenContact(false)}
      />
    </>
  );
}
