// src/components/IntroSplit.js
import React from "react";
import "../styles/IntroSplit.css";

export default function IntroSplit({ introSplitRef }) {
  return (
    <section id="intro-split" className="intro-split" ref={introSplitRef}>
      <a href="#aufbereitung" className="split half right">
        <div className="overlay"></div>
        <img src="/images/Detailing.jpg" alt="Aufbereitung" className="split-image" />
        <div className="overlay-text">Willkommen bei<b> SC-Cars</b></div>
      </a>
    </section>
  );
}
