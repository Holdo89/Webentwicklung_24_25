import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/welcome/WelcomePage";
import ProfilePage from "./components/profile/ProfilePage";
import AuthPage from "./components/authPage/AuthPage";
import { SnackbarProvider } from "notistack";
import RegisterComponent from "./components/authPage/register/Register";
import { useState, useEffect } from "react";
import Header from "./components/header/Header";
import Dashboard from "./components/dashboard/Dashboard";
import BookingDetails from "./components/clientField/email/bookingDetails/BookingDetails";
import Impressum from "./components/impressum/Impressum";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Router>
        <Header user={user} setUser={setUser} />
        <Impressum/>
        <div className="background-container">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<AuthPage onLoginSuccess={setUser} />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/bookings/:id" element={<BookingDetails />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
