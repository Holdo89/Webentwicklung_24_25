// src/App.jsx
import React, { useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const navbarRef = useRef(null);
  const aufbereitungRef = useRef(null);
  const kontaktRef = useRef(null);
  const terminRef = useRef(null);
  const introSplitRef = useRef(null);

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
        <p>Schreib uns eine Nachricht oder ruf uns an.</p>
        <form id="contactForm" onSubmit={handleFormSubmit}>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="E-Mail" required />
          <textarea placeholder="Nachricht" required></textarea>
          <button type="submit" className="button">Senden</button>
        </form>
        <div id="formStatus" style={{ marginTop: "10px" }}></div>
      </section>

      <section id="termin" className="section section-dark" ref={terminRef}>
        <h2>Termin vereinbaren</h2>
        <p>Buche jetzt einen Termin zur Fahrzeugaufbereitung oder Fahrzeugbesichtigung.</p>
        <button className="button">Termin buchen</button>
      </section>
    </>
  );
}
