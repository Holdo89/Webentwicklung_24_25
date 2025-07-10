import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import './Login.css';

/**
 * Login-Komponente
 * @param onLoginSuccess Callback nach erfolgreichem Login
 * @param onSwitchToRegister Callback zum Wechseln zum Registrierungsformular
 */
export default function Login({ onLoginSuccess, onSwitchToRegister }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  /**
   * Formulareinreichung: Sendet Login-Daten an Backend
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3001/login', credentials);
      localStorage.setItem('user', JSON.stringify(data.user));
      onLoginSuccess?.(data.user);
      navigate('/dashboard');
    } catch {
      enqueueSnackbar('Login fehlgeschlagen. Bitte prüfe deine Eingaben.', {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  /**
   * Aktualisiert Credentials-State bei Eingabeänderung
   */
  const handleChange = ({ target: { name, value } }) => {
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="E-Mail"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Passwort"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Einloggen</button>
      </form>
      <p className="switch-text">
        Noch kein BookBay-Account?
        <span className="switch-link" onClick={onSwitchToRegister}>
          Jetzt registrieren
        </span>
      </p>
    </div>
  );
}
