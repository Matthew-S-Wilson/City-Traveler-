import React, { useState, useEffect } from 'react';
import "./DropdownList.css"
import {Link } from "react-router-dom"

export const List = () => {
    const [cities, setCities] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState(""); 

    useEffect(() => {
        fetch(`http://localhost:9000/cities`)
            .then(response => response.json())
            .then((citiesArray) => {
                setCities(citiesArray);
            });
    }, []);

    const handleCityChange = (e) => {
        setSelectedCityId(e.target.value);
    };

    return (
        <div className="container">
            <select className="dropdown" onChange={handleCityChange}>
                <option value="">Select a city</option>
                {cities.map(city => (
                    <option key={city.id} value={city.id}>
                        {city.name}
                    </option>
                ))}
            </select>

            <Link
  className="pick-city-link"
  to={`/plan-itinerary/${selectedCityId}`}  
>
  <h1>Submit</h1>
</Link>

        </div>
    );
};
