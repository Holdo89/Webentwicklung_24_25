// src/components/UeberMich.js
import React from "react";
import "../styles/UeberMich.css";

export default function UeberMich({ ueberMichRef, ueberMichVisible }) {
  return (
    <section id="ueber-mich" className="section section-light" ref={ueberMichRef}>
      <div className={`ueber-mich-block ${ueberMichVisible ? "visible" : ""}`}>
        <h3>Ihr professioneller Kfz-Aufbereiter!</h3>
        <p>
          Wenn es um die Reinigung Ihres Autos geht, können Sie sich auf meine Professionalität verlassen...
        </p>
      </div>
    </section>
  );
}
