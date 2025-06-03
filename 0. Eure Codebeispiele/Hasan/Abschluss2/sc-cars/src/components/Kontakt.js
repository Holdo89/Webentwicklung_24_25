// src/components/Kontakt.js
import React from "react";
import "../styles/Kontakt.css";

export default function Kontakt({ kontaktRef, handleFormSubmit }) {
  return (
    <section id="kontakt" className="section section-light" ref={kontaktRef}>
      <h2>Kontakt</h2>
      <p>Schreib uns eine Nachricht..</p>

      <div className="kontakt-container">
        <form className="kontakt-form" id="contactForm" onSubmit={handleFormSubmit}>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="E-Mail" required />
          <textarea placeholder="Nachricht" rows="5" required></textarea>
          <button type="submit" className="button">Senden</button>
          <div id="formStatus" style={{ marginTop: "10px" }}></div>
        </form>

        <div className="kontakt-map">
  <iframe
    src="https://www.google.com/maps/embed?pb=Kremstalstraße 3, 4503 Haid, Österreich"
    width="100%"
    height="300"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Google Maps Standort"
  ></iframe>
    </div>
      </div>
    </section>
  );
}
