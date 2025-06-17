import React, { useState } from 'react'
import SubmitButtonLogin from '../../components/Login/SubmitButtonLogin'
import LoginInput from '../../components/Login/LoginInput'
import '../../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Login() {
  const navigate=useNavigate();
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [errors, setErrors] = useState({});
    const [responseMessage, setResponseMessage] = useState("");

    const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'E-Mail darf nicht leer sein.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Ungültige E-Mail.';

    if (!password) newErrors.password = 'Passwort darf nicht leer sein.';
    else if (password.length < 6) newErrors.password = 'Mindestens 6 Zeichen.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
    
    const handleLogin = async () => {
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:3001/login', {
          email,
          password
        });

        // Token aus der Antwort speichern
        const { token, username, level } = response.data;

        // Token speichern 
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('level', level|| '')

        if (!level) {
        navigate('/cards'); // Level noch nicht gesetzt -> zur Auswahlseite
        } else {
         navigate('/hauptseite'); // Level gesetzt -> normale Startseite
        }

      } catch (error) {
        const message = error.response?.data || error.message || "Login fehlgeschlagen";
        setResponseMessage(message);
        console.error('Login fehlgeschlagen:', message);
      }
    }
  };

return (
    <div className="login-page">
      <div className='login-wrapper'>
    <div className="main">
      <h1 className="h1"></h1>
      <div className="container">
        <div className="login-box">
          <LoginInput
            type="email"
            placeholder="Email-Adresse"
            value={email}
            onChange={(e) => {
             setEmail(e.target.value);
             setErrors(prev => ({ ...prev, email: '' })); 
            }} required
          />
          <p className={`error-message ${errors.email ? 'visible' : ''}`}>
          {errors.email || ' '}
          </p>

          <LoginInput
            type="password"
            placeholder="Passwort"
            value={password}
             onChange={(e) => {
              setPassword(e.target.value);
              setErrors(prev => ({ ...prev, password: '' }));
                }}
               required
          />
          <p className={`error-message ${errors.password ? 'visible' : ''}`}>
          {errors.password || ' '}
</p>
          
          <SubmitButtonLogin  label="Login" onClick={handleLogin} />
          <p id="responseMessage">{responseMessage}</p>
          <p className="login-link">
          Noch nicht <a href="/register" onClick={()=>navigate("register")}>registriert?</a>
          </p>
          
        </div>
      </div>
    </div>
    </div>
    </div>
    
  );
}

