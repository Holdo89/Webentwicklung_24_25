import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Buchung from "./pages/Buchung";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buchung/:datum" element={<Buchung />} />
      </Routes>
    </Router>
  );
}
