import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./components/style.css";
import Login from "./components/Login.js";
import SignUp from "./components/SignUp.js";
import UserWelcomeToken from "./components/Token Auth/UserWelcomeToken.js";
import PrivateRoutesToken from "./components/Token Auth/PrivateRoutesToken.js";

const UserWelcome = lazy(() => import("./components/Basic Auth/UserWelcome.js"));
const PrivateRoutes = lazy(() => import("./components/Basic Auth/PrivateRoutes.js"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/userwelcome" element={<UserWelcome />} />
        </Route>

        <Route element={<PrivateRoutesToken />}>
          <Route path="/userwelcometoken" element={<UserWelcomeToken />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
