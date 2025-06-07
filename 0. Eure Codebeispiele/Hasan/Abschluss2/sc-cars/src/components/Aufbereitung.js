import React, { useState } from "react";
import "../styles/Aufbereitung.css";

export default function Aufbereitung({ aufbereitungRef }) {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section id="aufbereitung" className="aufbereitung-section" ref={aufbereitungRef}>
      <h2>Unsere Aufbereitung</h2>
      <div className="aufbereitung-content">
        <div className="aufbereitung-text">
          <p>
            Wir bieten professionelle Autoaufbereitung, Polierung und Lackierung
            mit höchster Sorgfalt und modernster Technik.  
            Ihre Zufriedenheit und die Schönheit Ihres Fahrzeugs stehen bei uns an erster Stelle.
          </p>
          <p>
            Vertrauen Sie auf unsere Erfahrung und Leidenschaft – für ein Fahrzeug,
            das glänzt und überzeugt.
          </p>
        </div>
        <div className="image-stack">
          <img
            src="/images/interior.jpg"
            alt="Autoaufbereitung 1"
            className={`image image-left ${activeImage === 'left' ? 'active' : ''}`}
            onMouseEnter={() => setActiveImage('left')}
          />
          <img
            src="/images/wachen.jpg"
            alt="Autoaufbereitung 2"
            className={`image image-right ${activeImage === 'right' ? 'active' : ''}`}
            onMouseEnter={() => setActiveImage('right')}
          />
        </div>
      </div>
      <div className="aufbereitung-boxes">
    <div className="box">
    <h4>Innenraumreinigung</h4>
    <p>Gründliche Pflege aller Innenflächen – von Polstern bis Teppich.</p>
    </div>
    <div className="box">
    <h4>Handwäsche</h4>
    <p>Schonende Reinigung von Hand für einen strahlenden Lack.</p>
   </div>
    <div className="box">
    <h4>Felgenreinigung</h4>
    <p>Tiefe Reinigung und Aufbereitung von Felgen & Reifen.</p>
   </div>
   <div className="box">
    <h4>Politur</h4>
     <p>Professionelle Politur für brillanten Glanz und Schutz.</p>
   </div>
   <div className="box">
     <h4>Tiefenreinigung Sitze</h4>
        <p>Porentiefe Reinigung für Textil- und Ledersitze.</p>
   </div>
   <div className="box">
    <h4>Cockpit- & Kunststoffversiegelung</h4>
    <p>Langanhaltender Schutz für Armaturen, Kunststoffe und Zierleisten.</p>
  </div>
</div>
    </section>
  );
}