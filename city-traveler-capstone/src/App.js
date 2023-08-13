import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './Login/Login.js';
import { ApplicationViews } from './views/ApplicationViews.js';
import { Authorized } from './views/SignedIn.js';
import "./App.css"
import { List } from './components/SearchPage/DropdownList.js';
import { Navbar } from './components/Navbar.js';
import { Register } from './Login/Register.js';
import { PlanItinerary } from './components/ItineraryPage/Itinerary.js';
import { YourTrips } from './components/YourTrips/YourTrips.js';




export const App = () => {
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
              <ApplicationViews />
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
                <ApplicationViews />
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
                <PlanItinerary userId={JSON.parse(localStorage.getItem("city_traveler_user")).id} />
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
                <YourTrips loggedInUserId={JSON.parse(localStorage.getItem("city_traveler_user")).id} />
              </>
            </Authorized>
          }
        />

      </Routes>
    </div>
  );
};

