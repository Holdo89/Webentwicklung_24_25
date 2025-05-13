import React, { useState } from 'react';
import './App.css';
import Layout from './components/Layout';

import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import logo from "./images/BookLogo.png";
import Calender from './components/Calendar/Calender';

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const handleLoginSuccess = () => {
  //   setIsAuthenticated(true);
  // };

  return (
    <>
      <img src={logo} width={100} alt="Firmenlogo" />
      <Router>
        <Routes>
          {/* {isAuthenticated ? ( */}
            <Route path="*" element={<Layout><Calender /></Layout>} />
          ) : (
            <>
              {/* <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" replace />} /> */}
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
