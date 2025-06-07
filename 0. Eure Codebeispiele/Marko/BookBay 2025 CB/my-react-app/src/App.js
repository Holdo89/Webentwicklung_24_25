import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BasicTable from "./components/allBookingsField/BookingsField";
import StaticDateTimePickerLandscape from "./components/calendar/Calendar";
import WelcomePage from "./components/welcome/WelcomePage";
import ProfilePage from "./components/profile/ProfilePage";
import AuthPage from "./components/authPage/AuthPage";
import { SnackbarProvider } from "notistack";
import RegisterComponent from "./components/authPage/register/Register";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <Router>
        <Header user={user} setUser={setUser} />
        <div className="background-container">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<AuthPage onLoginSuccess={setUser} />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route
              path="/dashboard"
              element={
                <div className="two-column-layout">
                  <div className="calendar-wrapper">
                    <StaticDateTimePickerLandscape />
                  </div>
                  <div className="table-wrapper">
                    <BasicTable />
                  </div>
                </div>
              }
            />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
