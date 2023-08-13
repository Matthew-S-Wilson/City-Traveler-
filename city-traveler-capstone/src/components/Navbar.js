import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';


export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link
          className="navbar__link"
          to="/"
          onClick={() => {
            localStorage.removeItem("city_traveler_user");
            navigate("/");
          }}
        >
          <h1>City Traveler</h1>
        </Link>

        <Link to="/" className="navbar-logo">
          <i className="fa-solid fa-plane"></i>
        </Link>
        <div className="icon-menu">
          <Link
            className="navbar__link"
            to="/register"
            onClick={() => {
              localStorage.removeItem("city_traveler_user");
              navigate("/register");
            }}
          >
            <button className="register-button">Register</button>
          </Link>
          {localStorage.getItem("city_traveler_user") ? (
            <>
              <li className="navbar__item navbar__logout">
                <Link
                  className="navbar__link"
                  to=""
                  onClick={() => {
                    localStorage.removeItem("city_traveler_user");
                    navigate("/", { replace: true });
                  }}
                >
                  <button className="logout-button">Logout</button>
                </Link>
              </li>
              <li className="navbar__item">
                <Link
                  className="navbar__link"
                  to="/your-trips"
                  onClick={() => navigate("/your-trips")}
                >
                  <button className="your-trips-button">Your Trips</button>
                </Link>
              </li>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
};