import React, { useState } from "react";
import "../styles/Kontakt.css";

export default function Kontakt({ kontaktRef }) {
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Werte aus dem Formular extrahieren
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const nachricht = formData.get("nachricht");

    try {
      const response = await fetch("http://localhost:3001/kontakt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, nachricht }),
      });

      if (!response.ok) {
        throw new Error("Serverantwort war nicht OK");
      }

      // Erfolgsmeldung anzeigen
      setSuccess(true);
      e.target.reset();

      // Erfolgsmeldung nach 4 Sekunden ausblenden
      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error("Fehler beim Senden:", error);
      alert("Beim Senden ist ein Fehler aufgetreten. Bitte später erneut versuchen.");
    }
  };

  return (
    <section id="kontakt" className="kontakt-section" ref={kontaktRef}>
      <div className="kontakt-wrapper">
        <h2>Kontakt</h2>
        <form className="kontakt-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="E-Mail" required />
          <textarea name="nachricht" placeholder="Ihre Nachricht..." rows="5" required />
          <button type="submit">Absenden</button>
        </form>

        {success && (
          <div className="success-message">
            Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.
          </div>
        )}
      </div>

      <div className="map-container">
        <iframe
          title="Google Maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2658.9337212167356!2d14.243909776410144!3d48.207892546263295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477395ba49001cb5%3A0x5f33398d24e7aca8!2sKremstalstra%C3%9Fe%203%2C%204053%20Ansfelden!5e0!3m2!1sde!2sat!4v1749072086450!5m2!1sde!2sat"
          width="100%" height="450"  style={{ border: 0 }} allowFullScreen=""  loading="lazy"  referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </section>
  );
}
