import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import './Register.css';

/**
 * Registrierungsformular
 * @param onSwitchToLogin Callback zum Wechseln zurück zum Login
 */
export default function Register({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    title: 'Herr',
    name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const { enqueueSnackbar } = useSnackbar();

  // Eingaben in State übernehmen
  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Formular absenden
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/register', formData);
      enqueueSnackbar(res.data.message || 'Registrierung erfolgreich', { variant: 'success' });
      onSwitchToLogin();
    } catch (err) {
      enqueueSnackbar(err.response?.data?.message || 'Registrierung fehlgeschlagen', { variant: 'error' });
    }
  };

  return (
    <div className="register-container">
      <h2>Registrierung</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Anrede
          <select name="title" value={formData.title} onChange={handleChange} required>
            <option>Herr</option>
            <option>Frau</option>
            <option>Divers</option>
          </select>
        </label>

        <input
          name="name"
          type="text"
          placeholder="Vorname"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="last_name"
          type="text"
          placeholder="Nachname"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="E-Mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Passwort"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Registrieren</button>
      </form>
    </div>
);
}
