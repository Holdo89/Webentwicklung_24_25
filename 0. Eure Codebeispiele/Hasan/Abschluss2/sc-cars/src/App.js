import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// 📄 Seiten
import Home from "./pages/Home";
import Buchung from "./pages/Buchung";
import BuchungBestaetigt from "./pages/BuchungBestaetigt";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MeineBuchungen from "./pages/MeineBuchungen"; // ✅ NEU

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buchung/:datum" element={<Buchung />} />
          <Route path="/bestaetigt" element={<BuchungBestaetigt />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/meine-buchungen" element={<MeineBuchungen />} /> {/* ✅ NEU */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}
