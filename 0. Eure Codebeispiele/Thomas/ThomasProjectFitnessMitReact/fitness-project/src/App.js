import React from "react";
import Landing from './Pages/Landingpage/Landing';
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Cards from "./Pages/Cards/Cards";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Hauptseite1 from "./Pages/Hauptseite/Hauptseite1";
import Sidebar from "./components/Hauptseite/Sidebar";




function App() {
  return (
    <>
    <BrowserRouter>
    <Sidebar/>
    <Routes>
      <Route path="/"element={<Landing/>}/>
      <Route path= "login" element={<Login/>}/>
      <Route path= "register"element={<Register/>}/>
      <Route path= "cards"element={<Cards/>}/>
      <Route path="hauptseite"element={<Hauptseite1/>}/>
       </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
