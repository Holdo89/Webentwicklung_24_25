import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import './Login.css';

const Login = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3001/login', credentials);
      
      localStorage.setItem('user', JSON.stringify(data.user));
      onLoginSuccess?.(data.user);
      navigate('/dashboard');
    } catch {
      enqueueSnackbar('Login fehlgeschlagen. Bitte überprüfe deine Eingaben.', {
        variant: 'error',
        autoHideDuration: 3000
      });
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
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
        Noch kein Account?{' '}
        <span className="switch-link" onClick={onSwitchToRegister}>
          Jetzt registrieren
        </span>
      </p>
    </div>
  );
};

export default Login;