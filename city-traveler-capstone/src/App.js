import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
        <h1>City Traveler</h1>
          <Link to="/" className="navbar-logo">
          <i class="fa-solid fa-plane"></i>
          </Link>
        </div>
      </nav>
    </>
  );
}

function App() {
  return (    
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;

/*
function App() {
  return (    
<div className='App'>
  <h1>Yo</h1>
</div>
  );
}
*/

