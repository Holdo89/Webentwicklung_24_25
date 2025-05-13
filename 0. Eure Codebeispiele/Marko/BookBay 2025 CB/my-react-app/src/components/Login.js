import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3001/login', {
        email,
        password
      });

      console.log(res.data);
      onLoginSuccess(); // Auth state hochsetzen
    } catch (err) {
      setError(err.response?.data || 'Login fehlgeschlagen');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Einloggen</button>
      </form>
    </div>
  );
};

export default Login;
