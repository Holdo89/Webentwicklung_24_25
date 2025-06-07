// Register.js
import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import './Register.css';

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
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

      // 💡 Rufe den Callback auf, um zur Login-Ansicht zu wechseln
      onSwitchToLogin();

    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Diese E-Mail existiert bereits";
      enqueueSnackbar(errorMsg, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <div className="register-container">
      <h2>Registrierung</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Name"
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
