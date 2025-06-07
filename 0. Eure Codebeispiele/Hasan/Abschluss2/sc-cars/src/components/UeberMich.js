// src/components/UeberMich.js
import React from "react";
import "../styles/UeberMich.css";

export default function UeberMich({ ueberMichRef }) {
  return (
    <section className="ueber-mich-section section-dark" ref={ueberMichRef} id="ueber-mich">
      <div className="image-container">
        <img src="/images/Detailing 2.jpg" alt="Autoaufbereitung" className="ueber-mich-image" />
        <div className="hover-overlay"></div>
      </div>
      <div className="ueber-mich-content">
        <h2>Über uns</h2>
        <p>
          SC-Cars ist ein junges Unternehmen, gegründet im Jahr 2025. Unsere Leidenschaft gilt der professionellen Autoaufbereitung –
          von Politur über Lackpflege bis hin zur hochwertigen Innenreinigung.
        </p>
        <p>
          Neben unserem Kerngeschäft im Bereich Fahrzeugpflege bauen wir zusätzlich unser Standbein im Autohandel auf.
          Qualität, Präzision und Kundenzufriedenheit stehen bei uns an erster Stelle.
        </p>
      </div>
    </section>
  );
}
