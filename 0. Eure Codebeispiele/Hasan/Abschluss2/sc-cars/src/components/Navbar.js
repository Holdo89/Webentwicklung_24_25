import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";

export default function Navbar({ navbarRef }) {
  const [isTop, setIsTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      ref={navbarRef}
      className={`navbar ${menuOpen ? "open" : ""}`}
      style={{
        backgroundColor: isTop
          ? "rgba(50, 48, 48, 0.7)"
          : "rgba(50, 48, 48, 1)",
      }}
    >
      <a href="#intro-split" className="logo" onClick={closeMenu}>
        <img src="/images/logo.png" width="100" alt="Logo" />
      </a>

      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? "active" : ""}`}></div>
        <div className={`bar ${menuOpen ? "active" : ""}`}></div>
        <div className={`bar ${menuOpen ? "active" : ""}`}></div>
      </div>

      <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
        <li><a href="#ueber-mich" onClick={closeMenu}>Über mich</a></li>
        <li><a href="#aufbereitung" onClick={closeMenu}>Aufbereitung</a></li>
        <li><a href="#kontakt" onClick={closeMenu}>Kontakt</a></li>
        <li><a href="#termin" onClick={closeMenu}>Termin</a></li>
      </ul>
    </nav>
  );
}
