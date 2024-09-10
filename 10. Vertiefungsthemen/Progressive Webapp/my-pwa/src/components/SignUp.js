import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();
    signUp(username, password)
  };

  async function signUp(username, password) {
    try {
      const response = await fetch("/signup", {
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
      navigate("../login")
    } catch (error) {
      setError('User already exists');
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSignUp}>
        <h2>Signup new User</h2>
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
        <button type="submit" >Signup</button>
        {error && <p className="message">{error}</p>}
      </form>
    </div>
  );
}

