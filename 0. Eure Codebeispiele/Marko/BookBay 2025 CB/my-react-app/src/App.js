import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Calendar from "./components/Calendar/Calendar";
import BookingForm from "./components/Booking/BookingForm";
import BookingList from "./components/Booking/BookingList";

import logo from "./images/BookLogo.png";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      <Router>
        <Routes>
          {/* {isAuthenticated ? ( */}
          <>
            <Route
              path="/"
              element={
                <Layout>
                  <Calendar />
                </Layout>
              }
            />
            <Route
              path="/book"
              element={
                <Layout>
                  <BookingForm />
                </Layout>
              }
            />
            <Route
              path="/bookings"
              element={
                <Layout>
                  <BookingList />
                </Layout>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </>
          {/* // ) : (
          //   <>
          //     <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          //     <Route path="/register" element={<Register />} />
          //     <Route path="*" element={<Navigate to="/login" />} />
            </>
          )} */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
