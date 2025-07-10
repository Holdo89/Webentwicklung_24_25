// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { SnackbarProvider } from 'notistack';
import Login from './login/Login';
import Register from './register/Register';

/**
 * Seite für Authentifizierung: zeigt Login oder Registration.
 *
 * @param {function} onLoginSuccess - Wird aufgerufen, wenn der Login erfolgreich war.
 */
export default function AuthPage({ onLoginSuccess }) {
  const [isLoginView, setIsLoginView] = useState(true);

  /**
   * Callback nach erfolgtem Login:
   * - Speichert den Nutzer im Local Storage
   * - Benachrichtigt Parent-Komponente
   *
   * @param {object} user - Der eingeloggte Nutzer
   */
  const handleLoginSuccess = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    onLoginSuccess(user);
  };

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <div className="auth-container">
        {isLoginView ? (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={() => setIsLoginView(false)}
          />
        ) : (
          <Register onSwitchToLogin={() => setIsLoginView(true)} />
        )}
      </div>
    </SnackbarProvider>
  );
}
