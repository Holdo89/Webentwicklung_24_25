import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

<<<<<<< HEAD
  const handleLogin = (event) => {
    e.preventDefault();
=======
  const handleBasicLogin = (event) => {
    event.preventDefault()
>>>>>>> 29ffc7ca17f93c7173a577ca69e975aa19f21d16
    loginBasicAuth(username, password);
  };

  const handleTokenLogin = (event) => {
    event.preventDefault()
    loginJWTToken(username, password);
  };

  async function loginBasicAuth(username, password) {
    try {
      const response = await fetch("/loginBasicAuth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate("../userwelcome");
    } catch (error) {
      setError("Login not successful");
    }
  }

  async function loginJWTToken(username, password) {
    try {
      const response = await fetch("/loginTokenAuth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const token = data.token;

      localStorage.setItem("jwtToken", token);
      navigate("../userwelcometoken");
    } catch (error) {
      setError("Login not successful");
    }
  }

  return (
    <div className="container">
      <form>
        <h2>Login</h2>
        <div className="inputGroup">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button onClick={handleBasicLogin}>Basic Login</button>       
        <button onClick={handleTokenLogin}>Token Login</button>
        Signup new user{" "}
        <Link to={"../signup"}>here</Link>
        {error && <p className="message">{error}</p>}
      </form>
    </div>
  );
}
