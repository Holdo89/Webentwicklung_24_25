import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import './Register.css';

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    title: "Herr",
    name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/register", formData);
      enqueueSnackbar(res.data.message || "Registrierung erfolgreich", {
        variant: "success",
        autoHideDuration: 3000,
      });
      onSwitchToLogin();
    } catch (err) {
      enqueueSnackbar(
        err.response?.data?.message || "Registrierung fehlgeschlagen",
        { variant: "error" }
      );
    }
  };

  return (
    <div className="register-container">
      <h2>Registrierung</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Anrede:
          <select 
            name="title" 
            value={formData.title} 

            
            onChange={handleChange}
            required
          >
            <option value="Herr">Herr</option>
            <option value="Frau">Frau</option>
            <option value="Divers">Divers</option>
          </select>
        </label>

        <input
          name="name"
          type="text"
          placeholder="Vorname"
          onChange={handleChange}
          required
        />

        <input
          name="last_name"
          type="text"
          placeholder="Nachname"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="E-Mail"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Passwort"
          onChange={handleChange}
          required
        />

        <button type="submit">Registrieren</button>
      </form>
    </div>
  );
};

export default Register;