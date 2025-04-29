import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/register", formData);
      alert("Registrierung erfolgreich!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Registrierung fehlgeschlagen!");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Registrieren</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-Mail"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Passwort"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Registrieren</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
    backgroundColor: "#f9f9f9"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    margin: "10px 0",
    padding: "10px",
    fontSize: "16px"
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "10px"
  }
};

export default Register;
