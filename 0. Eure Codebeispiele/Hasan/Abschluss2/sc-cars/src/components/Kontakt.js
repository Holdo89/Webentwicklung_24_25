import React, { useState } from "react";
import "../styles/Kontakt.css";

export default function Kontakt({ kontaktRef }) {
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const nachricht = formData.get("nachricht");

    try {
      const response = await fetch("http://localhost:3001/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, nachricht }),
      });

      if (!response.ok) throw new Error("Serverantwort war nicht OK");

      setSuccess(true);
      e.target.reset();
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
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!..."
          width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
