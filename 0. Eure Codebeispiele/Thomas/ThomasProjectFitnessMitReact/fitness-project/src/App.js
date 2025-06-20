import React from "react";
import Landing from './Pages/Landingpage/Landing';
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Cards from "./Pages/Cards/Cards";
import {BrowserRouter,Routes,Route, useLocation} from "react-router-dom"
import Hauptseite1 from "./Pages/Hauptseite/Hauptseite1";
import Sidebar from "./components/Hauptseite/Sidebar";
import LevelDisplay from "./components/Hauptseite/LevelAuswahl";
import Trainingsplan from "./Pages/Trainingsplan/Trainingsplan";

function LayoutWithSidebar({ children }) {
  const location = useLocation();
  const showSidebar = ["/cards", "/hauptseite","/trainingsplan"].includes(location.pathname);
  const level =["/hauptseite"].includes(location.pathname)

  return (
    <>
      {showSidebar && <Sidebar />}
      {level && <LevelDisplay />}
      {children}
    </>
  );
}


function App() {
  return (
    <>
    <BrowserRouter>
    <LayoutWithSidebar/>
    <Routes>
      <Route path="/"element={<Landing/>}/>
      <Route path= "login" element={<Login/>}/>
      <Route path= "register"element={<Register/>}/>
      <Route path= "cards"element={<Cards/>}/>
      <Route path="hauptseite"element={<Hauptseite1/>}/>
      <Route path="trainingsplan"element={<Trainingsplan/>}/>
       </Routes>
       <LayoutWithSidebar/>
    </BrowserRouter>
    </>
  );
}

export default App;
