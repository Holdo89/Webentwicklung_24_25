// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🔐 AuthProvider verwaltet Login-Zustand (Benutzer ist eingeloggt?)
import { AuthProvider } from "./context/AuthContext";

// 📄 Seitenkomponenten (Pages)
import Home from "./pages/Home";                         // Startseite
import Buchung from "./pages/Buchung";                   // Buchungsformular
import BuchungBestaetigt from "./pages/BuchungBestaetigt"; // Bestätigung
import Login from "./pages/Login";                       // Login-Seite
import Register from "./pages/Register";                 // Registrierung

export default function App() {
  return (
    // ✅ AuthProvider muss außen stehen, damit alle Routen Zugriff haben
    <AuthProvider>
      <Router>
        {/* 🌐 Navigation zwischen den Seiten */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buchung/:datum" element={<Buchung />} />
          <Route path="/bestaetigt" element={<BuchungBestaetigt />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
