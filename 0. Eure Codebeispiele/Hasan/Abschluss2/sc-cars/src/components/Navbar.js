// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

export default function Navbar({ navbarRef }) {
  const [isTop, setIsTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // 🎯 Beobachte Scrollposition
  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  // 📍 Scroll-Logik oder Navigation zur Startseite
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (id) => {
    closeMenu();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(id), 100);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <nav
      ref={navbarRef}
      className={`navbar ${menuOpen ? "open" : ""} ${isTop ? "" : "scrolled"}`}
    >
      {/* Logo */}
      <button className="logo-button" onClick={() => handleNavClick("intro-split")}>
        <img src="/images/logo.png" alt="Logo" className="logo-image" />
      </button>

      {/* 🍔 Hamburger-Menü */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? "active" : ""}`}></div>
        <div className={`bar ${menuOpen ? "active" : ""}`}></div>
        <div className={`bar ${menuOpen ? "active" : ""}`}></div>
      </div>

      {/* 🔗 Navigationslinks */}
      <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
        <li><button onClick={() => handleNavClick("ueber-mich")} className="nav-button">Über Uns</button></li>
        <li><button onClick={() => handleNavClick("aufbereitung")} className="nav-button">Aufbereitung</button></li>
        <li><button onClick={() => handleNavClick("kontakt")} className="nav-button">Kontakt</button></li>
        <li><button onClick={() => handleNavClick("termin")} className="nav-button">Termin</button></li>

        {user ? (
          <>
            <li><button onClick={() => { closeMenu(); navigate("/meine-buchungen"); }} className="nav-button">Meine Buchungen</button></li>
            <li className="user-info">👤 {user.vorname} {user.nachname}</li>
            <li><button onClick={logout} className="nav-button logout-button">Logout</button></li>
          </>
        ) : (
          <li><button onClick={() => { closeMenu(); navigate("/login"); }} className="nav-button login-button">Login</button></li>
        )}
      </ul>
    </nav>
  );
}
