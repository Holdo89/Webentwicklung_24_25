import React from "react";
import "../styles/Aufbereitung.css";

export default function Aufbereitung({ aufbereitungRef }) {
  return (
    <section id="aufbereitung" className="section section-dark" ref={aufbereitungRef}>
      <h2>Fahrzeugaufbereitung</h2>
      <p>Professionelle Innen- und Außenreinigung für höchste Ansprüche.</p>

      <div className="aufbereitung-container">
        <div className="aufbereitung-item">
          <h3>Innenreinigung</h3>
          <ul>
            <li>Saugen des Innenraums</li>
            <li>Reinigung von Kunststoffteilen</li>
            <li>Scheibenreinigung innen</li>
          </ul>
          <p>ab 49 €</p>
        </div>

        <div className="aufbereitung-item">
          <h3>Basispflege</h3>
          <ul>
            <li>Außenwäsche</li>
            <li>Felgenreinigung</li>
            <li>Reifenpflege</li>
          </ul>
          <p>ab 39 €</p>
        </div>

        <div className="aufbereitung-item">
          <h3>Politur</h3>
          <ul>
            <li>Maschinelle Politur</li>
            <li>Lackversiegelung</li>
            <li>Entfernung kleiner Kratzer</li>
          </ul>
          <p>ab 89 €</p>
        </div>
      </div>
    </section>
  );
}
