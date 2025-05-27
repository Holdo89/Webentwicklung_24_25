import React, { useState } from 'react'
import SubmitButtonLogin from '../../components/Login/SubmitButtonLogin'
import LoginInput from '../../components/Login/LoginInput'
import '../../styles/Login.css';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate=useNavigate();
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [errors, setErrors] = useState({});

    const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'E-Mail darf nicht leer sein.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Ungültige E-Mail.';

    if (!password) newErrors.password = 'Passwort darf nicht leer sein.';
    else if (password.length < 6) newErrors.password = 'Mindestens 6 Zeichen.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
    
    const handleLogin = () => {
    if (validate()) {
      console.log('Login erfolgreich mit:', { email, password });
      // Weiterleitung zur Hauptseite o.ä.
    }
  };
return (
    <div className="login-page">
    <div className="main">
      <h1 className="h1">Login</h1>
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
          <p className="login-link">
          Noch nicht <a href="/register" onClick={()=>navigate("register")}>registriert</a>?
          </p>
          
        </div>
      </div>
    </div>
    </div>
    
  );
}

