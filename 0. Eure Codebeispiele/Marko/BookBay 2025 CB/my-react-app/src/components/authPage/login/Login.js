import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import "./Login.css";

const Login = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      const user = res.data.user;

      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (onLoginSuccess) onLoginSuccess(user);
      navigate("/dashboard");
    } catch (err) {
      enqueueSnackbar("Login fehlgeschlagen. Bitte überprüfe deine Eingaben.", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Einloggen</button>
      </form>

      <p className="switch-text">
        Noch kein Bookaunt?{" "}
        <span className="switch-link" onClick={onSwitchToRegister}>
          Jetzt registrieren
        </span>
      </p>
    </div>
  );
};

export default Login;
