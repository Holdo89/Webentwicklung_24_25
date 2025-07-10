// src/App.jsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { useState, useEffect } from "react";

import Header from "./components/header/Header";
import WelcomePage from "./components/welcome/WelcomePage";
import AuthPage from "./components/authPage/AuthPage";
import RegisterComponent from "./components/authPage/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import BookingDetails from "./components/clientField/email/bookingDetails/BookingDetails";
import ProfilePage from "./components/profile/ProfilePage";
import Impressum from "./components/impressum/Impressum";

/* App-Komponente:
 * Setzt das Routing, globales Snackbar-Provider und Header für die gesamte Anwendung auf. */


export default function App() {
  const [user, setUser] = useState(null);

  // Beim ersten Render: Prüfen, ob ein Nutzer im Local Storage gespeichert ist
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Router>
        {/* Globale Navigation und Nutzer-Status */}
        <Header user={user} setUser={setUser} />

        {/* Impressum-Icon */}
        <Impressum />

        {/* Hintergrund-Wrapper für Seitenwechsel */}
        <div className="background-container">
          <Routes>
            {/* Öffentliche Routen */}
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<AuthPage onLoginSuccess={setUser} />} />
            <Route path="/register" element={<RegisterComponent />} />

            {/* Geschützte Routen */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/bookings/:id" element={<BookingDetails />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </Router>
    </SnackbarProvider>
  );
}
