import React, { useState } from 'react'
import RegisterInput from '../../components/Register/RegisterInput'
import SubmitButton from '../../components/Register/SubmitButton'
import '../../styles/Register.css';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const navigate=useNavigate
const [username,setUsername]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [errors, setErrors] = useState({});

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

const handleRegister = () => {
    if (validate()) {
      console.log('Register-Daten:', { username, email, password });
      
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
        <p id='responseMessage'></p>
            <p className="register-link">
          Schon registriert? <a href="/login" onClick={()=>navigate("login")}>Hier gehts zum Login</a>
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}
