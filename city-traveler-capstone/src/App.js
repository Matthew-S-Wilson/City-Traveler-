import React from 'react';
import './App.css';
import Navbar from './components/Navbar.js';
import { useRoutes } from 'react-router-dom';
import { Outlet, Route, Routes, Router } from "react-router-dom"


function App() {
  return (    
  <Router>
    <Routes>
      <Route path="/" element={<Navbar />} />


    </Routes>
  </Router>
);
}

export default App;
