import React, {useState} from 'react';
import {Link} from 'react-router-dom';


function Navbar() {
  return (
    <>
    <nav className='navbar'>
    <div className='navbar-container'>
    <Link to="/" className="navbar-logo">
    <a href="https://digital.ihg.com/is/image/ihg/Kimpton-destination-Seattle_2880x848">
    </a>
    </Link>
    </div>
        </nav>
    </>
  )
}

export default Navbar