import React, { useState } from 'react';
import './App.css';
import Layout from './components/Layout'; // Stelle sicher, dass Layout.js existiert
import BookingTable from './components/Tabele';
import DateCalendarFormProps from './components/Calender_Disabled';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route
            path="*"
            element={
              <>
                <Layout />
                <DateCalendarFormProps />
                <BookingTable />
              </>
            }
          />
        ) : (
          <>
            <Route
              path="/login"
              element={<Login onLoginSuccess={handleLoginSuccess} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
