import React, { useState } from 'react'
import RegisterInput from '../../components/Register/RegisterInput'
import SubmitButton from '../../components/Register/SubmitButton'
import '../../styles/Register.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export default function Register() {
  const navigate=useNavigate();
const [username,setUsername]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [errors, setErrors] = useState({});
const [responseMessage, setResponseMessage] = useState("");

const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Benutzername darf nicht leer sein.';
    if (!email) newErrors.email = 'E-Mail darf nicht leer sein.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Ungültige E-Mail-Adresse.';

    if (!password) newErrors.password = 'Passwort darf nicht leer sein.';
    else if (password.length < 6) newErrors.password = 'Mindestens 6 Zeichen.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleRegister = async () => {
  if (validate()) {
    try {
      const response = await axios.post('http://localhost:3001/register', {
        username,
        email,
        password
      });
      setResponseMessage("Registrierung erfolgreich! Du wirst weitergeleitet...");
      console.log(response.data);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      const message = error.response?.data || error.message || "Registrierung fehlgeschlagen";
      setResponseMessage(message);
      console.error('Registrierung fehlgeschlagen:', message);
    }
  }
};




  return (
    <div className="register-background">
    <div className='main'>
      <h1 className='h1'>Imperial-Fitness</h1>
      <div className='container'>
        <div className='register-box'>
        <RegisterInput type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          {errors.username && <p className="error">{errors.username}</p>}
        <RegisterInput type="email" placeholder="Email-Adresse" value={email} onChange={(e) => setEmail(e.target.value)}/>
          {errors.email && <p className="error">{errors.email}</p>}
        <RegisterInput type="password" placeholder="Password" value={password}onChange={(e) => setPassword(e.target.value)}/>
          {errors.password && <p className="error">{errors.password}</p>}

        <SubmitButton label="Registrieren" onClick={handleRegister}/>
        <p id='responseMessage'>{responseMessage}</p>
            <p className="register-link">
          Schon registriert? <a href="/login" onClick={()=>navigate("login")}>Hier gehts zum Login</a>
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}
