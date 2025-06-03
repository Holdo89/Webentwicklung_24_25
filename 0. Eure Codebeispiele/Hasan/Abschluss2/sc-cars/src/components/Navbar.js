// src/components/Navbar.js
import React from "react";
import "../styles/Navbar.css";


export default function Navbar({ navbarRef }) {
  return (
    <nav className="navbar" ref={navbarRef}>
      <a href="#intro-split" className="logo">
        <img src="/images/logo.png" width="100" alt="Logo" />
      </a>
      <ul className="nav-links">
        <li><a href="#ueber-mich">Über mich</a></li>
        <li><a href="#aufbereitung">Aufbereitung</a></li>
        <li><a href="#kontakt">Kontakt</a></li>
        <li><a href="#termin">Termin</a></li>
      </ul>
    </nav>
  );
}
