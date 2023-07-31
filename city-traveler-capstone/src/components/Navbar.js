import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';


function Navbar() {
    return (
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to="/" className="navbar-logo">
          <i class="fa-solid fa-plane"></i>
          </Link>
        </div>
      </nav>
    );
  }

export default Navbar