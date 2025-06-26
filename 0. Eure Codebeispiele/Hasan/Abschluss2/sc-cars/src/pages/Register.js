import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Register.css";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [passwort2, setPasswort2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (passwort !== passwort2) {
      setError("Passwörter stimmen nicht überein."); return;
    }
    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vorname, nachname, email, passwort }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registrierung fehlgeschlagen");
      setSuccess("Erfolgreich registriert! Weiterleitung...");
      setTimeout(() => navigate(`/login?redirect=${redirect}`), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <div className="register-card">
          <h2 className="register-title">Konto erstellen</h2>
          <form onSubmit={handleRegister} className="register-form">
            <label>
              Vorname
              <input value={vorname} onChange={(e) => setVorname(e.target.value)} required />
            </label>

            <label>
              Nachname
              <input value={nachname} onChange={(e) => setNachname(e.target.value)} required />
            </label>

            <label>
              E‑Mail
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>

            <label>
              Passwort
              <input type="password" value={passwort} onChange={(e) => setPasswort(e.target.value)} required />
            </label>

            <label>
              Passwort wiederholen
              <input type="password" value={passwort2} onChange={(e) => setPasswort2(e.target.value)} required />
            </label>

            {error && <div className="error-msg">{error}</div>}
            {success && <div className="success-msg">{success}</div>}

            <button type="submit" className="submit-btn">Registrieren</button>

            <p className="alt-link">
              Bereits registriert? <Link to={`/login?redirect=${redirect}`}>Zum Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
