// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

// Erstellen des Kontexts
export const AuthContext = createContext();

// Provider-Komponente, die den Kontext bereitstellt
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Beim Start: Benutzer aus localStorage laden (z. B. nach Neuladen der Seite)
  useEffect(() => {
    const gespeicherterUser = localStorage.getItem("user");
    if (gespeicherterUser) {
      setUser(JSON.parse(gespeicherterUser));
    }
  }, []);

  // Login-Funktion – speichert Benutzer im Zustand + localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout-Funktion – entfernt Benutzerinfos
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Benutzerdefinierter Hook für bequemen Zugriff
export const useAuth = () => useContext(AuthContext);
