import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Itinerary.css';



export const PlanItinerary = ({ userId }) => {
    const { cityId } = useParams();
    const [city, setCity] = useState(null);
    const [airport, setAirport] = useState([]);
    const [tripName, setTripName] = useState('');
    const [notes, setNotes] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`http://localhost:9000/cities/${cityId}`)
            .then(response => response.json())
            .then((cityData) => {
                setCity(cityData);
            });
    }, [cityId]);

    useEffect(() => {
        fetch(`http://localhost:9000/airports`)
            .then(response => response.json())
            .then((airportData) => {
                const airportsForCity = airportData.filter(airport => airport.cityId === parseInt(cityId));
                setAirport(airportsForCity);
            });
    }, [cityId]);

    const handleSave = () => {
        const newTrip = {
            userId: userId,
            cityId: parseInt(cityId),
            tripName: tripName,
            notes: notes,
        };
        fetch('http://localhost:9000/trip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTrip),
        })
            .then(response => response.json())
            .then(data => {
                navigate('/your-trips');
            });
    };

    return (
        <div className="centered-container">
            {city && (
                <div className="text-container">
                    <h2>Selected City: {city.name}</h2>
                    <p>Timezone: {city.timezone}</p>

                    <p>Airports in {city.name}:</p>
                    <ul>
                        {airport.map(airport => (
                            <li key={airport.id}>{airport.name}</li>
                        ))}
                    </ul>

                    <textarea
                        className="text-area"
                        value={tripName}
                        onChange={(e) => setTripName(e.target.value)}
                        placeholder="Enter Trip Name"
                        rows={1}
                    />

                    <textarea
                        className="text-area"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Enter Trip Notes"
                        rows={4}
                    />

                    <button onClick={handleSave}>Save Trip</button>
                </div>
            )}
        </div>
    );
};
