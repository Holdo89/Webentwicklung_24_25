import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3001/register', formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data || 'Registrierung fehlgeschlagen');
    }
  };

  return (
    <div>
      <h2>Registrierung</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="E-Mail" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Passwort" onChange={handleChange} required />
        <button type="submit">Registrieren</button>
      </form>
    </div>
  );
};

export default Register;
