import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 🔐 Zugriff auf Login-Daten
import "../styles/Navbar.css"; // 🎨 Eigene CSS-Stile

export default function Navbar({ navbarRef }) {
  const [isTop, setIsTop] = useState(true); // 🎯 Position ganz oben auf der Seite?
  const [menuOpen, setMenuOpen] = useState(false); // 📱 Mobil-Menü offen?

  const location = useLocation(); // 🌍 Aktueller Pfad (z. B. /login)
  const navigate = useNavigate(); // 📦 Navigation programmatisch

  const { user, logout } = useAuth(); // 👤 Benutzerinfos & Logout-Funktion

  // 🔁 Scrollverhalten für Hintergrundtransparenz
  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 📱 Menü auf/zu
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  // 📍 Scrollt zu Abschnitt per ID (auf Startseite)
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  // 🔀 Navigiert ggf. zuerst zur Startseite, dann scrollen
  const handleNavClick = (id) => {
    closeMenu();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(id), 100); // Delay nötig, damit DOM geladen
    } else {
      scrollToSection(id);
    }
  };

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
      {/* 🔗 Logo (führt zu Intro-Sektion) */}
      <button
        className="logo"
        onClick={() => handleNavClick("intro-split")}
        style={{ border: "none", background: "none", cursor: "pointer" }}
      >
        <img
          src="/images/logo.png"
          width="100"
          alt="Logo"
          style={{ pointerEvents: "none" }}
        />
      </button>

      {/* 🍔 Hamburger-Icon für mobile Navigation */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? "active" : ""}`}></div>
        <div className={`bar ${menuOpen ? "active" : ""}`}></div>
        <div className={`bar ${menuOpen ? "active" : ""}`}></div>
      </div>

      {/* 📋 Navigationslinks */}
      <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
        <li>
          <button onClick={() => handleNavClick("ueber-mich")} className="nav-button">
            Über Uns
          </button>
        </li>
        <li>
          <button onClick={() => handleNavClick("aufbereitung")} className="nav-button">
            Aufbereitung
          </button>
        </li>
        <li>
          <button onClick={() => handleNavClick("kontakt")} className="nav-button">
            Kontakt
          </button>
        </li>
        <li>
          <button onClick={() => handleNavClick("termin")} className="nav-button">
            Termin
          </button>
        </li>

        {/* 🔐 Benutzerabhängiger Bereich */}
        {user ? (
          <>
            <li>
              <button
                onClick={() => {
                  closeMenu();
                  navigate("/meine-buchungen");
                }}
                className="nav-button"
              >
                Meine Buchungen
              </button>
            </li>
            <li style={{ color: "#adebc7", marginLeft: "1rem" }}>
              👤 {user.name}
            </li>
            <li>
              <button onClick={logout} className="nav-button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={() => {
                closeMenu();
                navigate("/login");
              }}
              className="nav-button"
            >
              Login
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
