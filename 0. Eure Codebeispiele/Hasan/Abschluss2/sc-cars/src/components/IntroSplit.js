import React from "react";
import "../styles/IntroSplit.css";

export default function IntroSplit({ introSplitRef }) {
  return (
    <section id="intro-split" className="intro-split" ref={introSplitRef}>
      <a href="#aufbereitung" className="split half right">
        <video
          className="split-video"
          src="/images/video-website.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="overlay"></div>
        <div className="overlay-text">
          Willkommen bei <b>SC-Cars</b>
          <img src="/images/logo.png" alt="Logo" className="intro-logo" />
          <a href="#aufbereitung" className="button intro-button">
            Mehr erfahren
          </a>
        </div>
      </a>
    </section>
  );
}
