// src/App.jsx

import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import "./App.css";

export default function App() {
  const navbarRef = useRef(null);
  const aufbereitungRef = useRef(null);
  const kontaktRef = useRef(null);
  const terminRef = useRef(null);
  const introSplitRef = useRef(null);

  const [date, setDate] = useState(new Date()); // Kalender-Zustand
  const [confirmationMessage, setConfirmationMessage] = useState(""); // Bestätigung

  useEffect(() => {
    const navbar = navbarRef.current;
    const sections = [aufbereitungRef.current, kontaktRef.current, terminRef.current];
    const introSplit = introSplitRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === introSplit) {
            navbar.classList.toggle("visible", !entry.isIntersecting);
          }
        });
      },
      { threshold: 0.1 }
    );

    [...sections, introSplit].forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const status = document.getElementById("formStatus");
    status.textContent = "Vielen Dank für Ihre Nachricht!";
    status.style.color = "green";
    e.target.reset();
  };

  const handleTerminBestätigen = () => {
    setConfirmationMessage(`Termin am ${date.toLocaleDateString("de-DE")} wurde bestätigt.`);
  };

  return (
    <>
      <nav className="navbar" ref={navbarRef}>
        <a href="#intro-split" className="logo">
          <img src="/images/logo.png" width="100" alt="Logo" />
        </a>
        <ul className="nav-links">
          <li><a href="#aufbereitung">Aufbereitung</a></li>
          <li><a href="#kontakt">Kontakt</a></li>
          <li><a href="#termin">Termin</a></li>
        </ul>
      </nav>

      <section id="intro-split" className="intro-split" ref={introSplitRef}>
        <a href="#aufbereitung" className="split half right">
          <div className="overlay"></div>
          <img src="/images/Detailing.jpg" alt="Aufbereitung" className="split-image" />
          <div className="overlay-text">Willkommen bei<b> SC-Cars</b></div>
        </a>
      </section>

      <section id="aufbereitung" className="section section-dark" ref={aufbereitungRef}>
        <h2>Fahrzeugaufbereitung</h2>
        <p>Professionelle Innen- und Außenreinigung für höchste Ansprüche.</p>

        <div className="aufbereitung-container">
          <div className="aufbereitung-item">
            <h3>Innenreinigung</h3>
            <ul>
              <li>Basispflege, zusätzlich:</li>
              <li>Reinigung und Pflege der Kunststoffteile</li>
              <li>Reinigung A-B-C-Säulen und Dachhimmel</li>
              <li>Shampoonieren der Sitze und Teppiche</li>
              <li>Reinigen der Türeinstiege</li>
              <li>Entfernen von groben Verschmutzungen</li>
            </ul>
            <p>ab € 250,-</p>
          </div>

          <div className="aufbereitung-item">
            <h3>Basispflege</h3>
            <ul>
              <li>Außenwäsche</li>
              <li>Reinigung der Kunststoffteile</li>
              <li>Reinigung des Armaturenbrettes</li>
              <li>Saugen des Innenraumes inkl. Kofferraum</li>
              <li>Scheibenreinigung innen und außen</li>
              <li>Reifenpflege</li>
            </ul>
            <p>ab € 89,-</p>
            <p>Autopflege Gruber</p>
          </div>

          <div className="aufbereitung-item">
            <h3>Politur</h3>
            <ul>
              <li>Außenwäsche</li>
              <li>Reinigung und Pflege der Felgen/Reifen</li>
              <li>Reinigung und Pflege der Türeinstiege</li>
              <li>Entfernen von Teer, Baumharz, Flugrost…</li>
              <li>Entfernen von Kratzern</li>
              <li>Lackversiegelung mit Wachs</li>
            </ul>
            <p>ab € 250,-</p>
          </div>
        </div>
      </section>

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
              title="SC Cars Standort"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2644.181414301986!2d16.3738183!3d48.2081742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d07f5c5d1a9d1%3A0xb36acbfc54b06ef5!2sStephansplatz%2C%201010%20Wien!5e0!3m2!1sde!2sat!4v1689954322345!5m2!1sde!2sat"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "12px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <p className="map-caption">Hier findest du uns.</p>
          </div>
        </div>
      </section>

      <section id="termin" className="section section-dark" ref={terminRef}>
        <h2>Termin vereinbaren</h2>
        <p>Buche jetzt einen Termin zur Fahrzeugaufbereitung oder Fahrzeugbesichtigung.</p>

        <div className="calendar-wrapper" style={{ maxWidth: "400px", margin: "2rem auto" }}>
          <Calendar
            onChange={(newDate) => setDate(newDate)}
            value={date}
            minDate={new Date()}
            locale="de-DE"
          />
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            Ausgewähltes Datum: <strong>{date.toLocaleDateString("de-DE")}</strong>
          </p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
            <button className="button" onClick={handleTerminBestätigen}>Termin bestätigen</button>
          </div>
          {confirmationMessage && (
            <p style={{ textAlign: "center", color: "green", marginTop: "1rem" }}>
              {confirmationMessage}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
