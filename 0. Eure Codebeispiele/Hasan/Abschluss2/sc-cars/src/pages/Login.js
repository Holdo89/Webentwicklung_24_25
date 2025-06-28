import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "../styles/Login.css"; // ← CSS import

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, passwort }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login fehlgeschlagen");
      login({ token: data.token, id: data.id, name: `${data.vorname} ${data.nachname}` });
      navigate(redirect);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Kunden-Login</h2>
          <form onSubmit={handleLogin} className="login-form">
            <label>
              E‑Mail
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Passwort
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwort}
                  onChange={(e) => setPasswort(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="showpass-btn"
                >
                  {showPassword ? "🔒" : "👁️"}
                </button>
              </div>
            </label>

            {error && <div className="error-msg">{error}</div>}

            <button type="submit" className="submit-btn">
              Einloggen
            </button>

            <p className="alt-link">
              Noch kein Konto? <Link to={`/register?redirect=${redirect}`}>Jetzt registrieren</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
