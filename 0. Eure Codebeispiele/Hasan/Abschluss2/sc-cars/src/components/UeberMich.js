import React from "react";
import "../styles/UeberMich.css";

export default function UeberMich({ ueberMichRef, ueberMichVisible }) {
  return (
    <section
      id="ueber-mich"
      className="section section-light ueber-mich-section"
      ref={ueberMichRef}
    >
      {/* Bild oben über gesamte Breite */}
      <div className="ueber-mich-image-container">
        <img
          src="/images/Detailing 2.jpg"
          alt="Hintergrund"
          className="ueber-mich-bg-image"
        />
      </div>

      {/* Textblock darunter */}
      <div className={`ueber-mich-block ${ueberMichVisible ? "visible" : ""}`}>
        <h3>Ihr professioneller Kfz-Aufbereiter!</h3>
        <p>
          Wenn es um die Reinigung Ihres Autos geht, können Sie sich auf meine
          Professionalität verlassen. Ich führe die Außen- und Innenreinigung
          per Hand durch und kann Ihnen somit absolute Präzisionsarbeit
          garantieren. Anschließend trage ich tiefenreinigende Pflegeprodukte
          auf, die den Lack aufbereiten und Ihrem Kfz zu neuem Glanz verhelfen.
        </p>
      </div>
    </section>
  );
}
