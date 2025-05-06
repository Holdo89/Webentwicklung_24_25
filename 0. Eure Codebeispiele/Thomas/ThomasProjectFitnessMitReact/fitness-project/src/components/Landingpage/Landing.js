import React from "react";
import "./Landing.css";
import landingpage from "./landingpage.png"

export default function LandingPage() {
    return (
      <div className="container">
        <div className="text">
          <h1>
            Jetzt durchstarten<br />mit <span className="highlight">Imperial Fitness</span>
          </h1>
          <p>Trainiere smarter. Werde stärker. Hol dir deinen Traumkörper.</p>
          <a href="../login/fitness.html" className="button">Starte jetzt</a>
        </div>
        <div className="image">
          <img src={landingpage} alt="Landing" />
        </div>
      </div>
    );
  }