// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ NEU
import "../styles/Navbar.css";

export default function Navbar({ navbarRef }) {
  const [isTop, setIsTop] = useState(true);  // Navbar-Hintergrund abhängig vom Scroll
  const [menuOpen, setMenuOpen] = useState(false); // Menü offen/zu
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ✅ Zugriff auf Auth

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  // Scroll-Funktion zu Ankerpunkten
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  // Navigiert ggf. zuerst zur Startseite, dann scrollen
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
      className={`navbar ${menuOpen ? "open" : ""}`}
      style={{
        backgroundColor: isTop ? "rgba(50, 48, 48, 0.7)" : "rgba(50, 48, 48, 1)",
      }}
    >
      <button
        className="logo"
        onClick={() => handleNavClick("intro-split")}
        style={{ border: "none", background: "none", cursor: "pointer" }}
      >
        <img src="/images/logo.png" width="100" alt="Logo" style={{ pointerEvents: "none" }} />
      </button>

      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? "active" : ""}`}></div>
        <div className={`bar ${menuOpen ? "active" : ""}`}></div>
        <div className={`bar ${menuOpen ? "active" : ""}`}></div>
      </div>

      <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
        <li><button onClick={() => handleNavClick("ueber-mich")} className="nav-button">Über Uns</button></li>
        <li><button onClick={() => handleNavClick("aufbereitung")} className="nav-button">Aufbereitung</button></li>
        <li><button onClick={() => handleNavClick("kontakt")} className="nav-button">Kontakt</button></li>
        <li><button onClick={() => handleNavClick("termin")} className="nav-button">Termin</button></li>

        {/* ✅ Benutzer-Status anzeigen */}
        {user ? (
          <>
            <li style={{ color: "#adebc7", marginLeft: "1rem" }}>👤 {user.name}</li>
            <li><button onClick={logout} className="nav-button">Logout</button></li>
          </>
        ) : (
          <li><button onClick={() => navigate("/login")} className="nav-button">Login</button></li>
        )}
      </ul>
    </nav>
  );
}
