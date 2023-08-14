import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './Login/Login.js';
import { Authorized } from './views/SignedIn.js';
import "./App.css"
import { List } from './components/SearchPage/DropdownList.js';
import { Navbar } from './components/Navbar.js';
import { Register } from './Login/Register.js';
import { PlanItinerary } from './components/ItineraryPage/Itinerary.js';
import { YourTrips } from './components/YourTrips/YourTrips.js';




export const App = () => {
  const loggedInUserId = JSON.parse(localStorage.getItem("city_traveler_user"))?.id;
  return (
    <div className="app-container">
      <div className="background-image"></div>
      <Routes>

        <Route
          path="*"
          element={

            <>
              <Navbar />
              <Login />

            </>
          }
        />
        <Route
          path="/register"
          element={

            <>
              <Navbar />
              <Register />
            </>

          }
        />
        <Route
          path="/pick-city/*"
          element={
            <Authorized>
              <>
                <Navbar />
                <List />
              </>
            </Authorized>
          }
        />
        <Route
          path="/plan-itinerary/:cityId"
          element={
            <Authorized>
              <>
                <Navbar />
                <PlanItinerary userId={loggedInUserId} />
              </>
            </Authorized>
          }
        />
        <Route
          path="/your-trips"
          element={
            <Authorized>
              <>
                <Navbar />
                <YourTrips loggedInUserId={loggedInUserId} />
              </>
            </Authorized>
          }
        />
      </Routes>
    </div>
  );
};
