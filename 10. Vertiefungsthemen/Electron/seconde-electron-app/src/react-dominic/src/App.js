import React from "react";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Counter from "./components/Counter";
import RandomJoke from "./components/RandomJoke";
import MenuComponent from "./components/MenuComponent";
import SpecificJoke from "./components/SpecificJoke";
import FilteredJoke from "./components/FilteredJoke";

export default function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MenuComponent/>} />
      <Route path="counter" element={<Counter />} />
      <Route path="randomjoke" element={<RandomJoke />} />
      <Route path="specificjoke/:id" element={<SpecificJoke />} />
      <Route path="filteredjokes" element={<FilteredJoke />} />
    </Routes>
  </BrowserRouter>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
