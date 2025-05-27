import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyParentComponent from './components/MyParentComponent';
import PageNotFound from './components/PageNotFound'; // Diese Komponente musst du noch erstellen

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyParentComponent />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}
