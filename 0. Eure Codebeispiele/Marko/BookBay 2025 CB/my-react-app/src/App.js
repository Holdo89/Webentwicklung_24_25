import React, { useState } from 'react';
import './App.css';
import Layout from './components/Header';
import BookingTable from './components/Tabele';
import DateCalendarFormProps from './components/Calender_Disabled';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleRegisterClick = () => {
    setIsRegistering(true);
  };

  const handleRegisterSuccess = () => {
    setIsRegistering(false);
  };
  return (
    <>
      {!isAuthenticated ? (
        isRegistering ? (
          <Register onRegisterSuccess={handleRegisterSuccess} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} onRegisterClick={handleRegisterClick} />
        )
      ) : (
        <>
          <Layout />
          <DateCalendarFormProps />
          <BookingTable />
        </>
      )}
    </>
  );
}

export default App;
