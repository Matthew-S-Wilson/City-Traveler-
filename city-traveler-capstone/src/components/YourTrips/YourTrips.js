import React, { useEffect, useState } from 'react';
import "./YourTrips.css"
export const YourTrips = ({ loggedInUserId }) => {
    const [trips, setTrips] = useState([]);
    const [cities, setCities] = useState([]);
    const [airports, setAirports] = useState([]);
    const [editingTripId, setEditingTripId] = useState(null); 
    const [editedNotes, setEditedNotes] = useState(""); 

    useEffect(() => {
        fetch(`http://localhost:9000/trip?userId=${loggedInUserId}`)
            .then(response => response.json())
            .then(tripsData => {
                setTrips(tripsData);
            });

        fetch('http://localhost:9000/cities')
            .then(response => response.json())
            .then(citiesData => {
                setCities(citiesData);
            });

        fetch('http://localhost:9000/airports')
            .then(response => response.json())
            .then(airportsData => {
                setAirports(airportsData);
            });
    }, [loggedInUserId]);

    const handleEdit = (tripId, currentNotes) => {
        setEditingTripId(tripId);
        setEditedNotes(currentNotes);
    };

    const handleSave = (tripId) => {
        if (editedNotes !== "") {
            const originalTrip = trips.find(trip => trip.id === tripId);
            const updatedTrip = { ...originalTrip, notes: editedNotes };
            setTrips(prevTrips =>
                prevTrips.map(trip =>
                    trip.id === updatedTrip.id ? updatedTrip : trip
                )
            );

            setEditingTripId(null);
            setEditedNotes("");
            fetch(`http://localhost:9000/trip/${tripId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTrip),
            })
                .then(response => response.json())
                .then(responseData => {
                });
        } else {
            setEditingTripId(null);
            setEditedNotes("");
        }
    };



    const findCityName = (cityId) => {
        const city = cities.find(city => city.id === cityId);
        return city ? city.name : "Unknown City";
    };

    const findCityAirports = (cityId) => {
        const cityAirports = airports.filter(airport => airport.cityId === cityId);
        return cityAirports.map(airport => airport.name).join(", ");
    };

    const handleDelete = (tripId) => {
        fetch(`http://localhost:9000/trip/${tripId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(responseData => {
                setTrips(prevTrips =>
                    prevTrips.filter(trip => trip.id !== tripId)
                );
                
            });
    };

    return (
        <div className="your-trips-container">
            <h2>Your Trips</h2>
            <div className="trips-list-container"> 
                <ul className="trips-list">
                    {trips.map(trip => (
                        <li key={trip.id}>
                            <h3>{trip.tripName}</h3>
                            <p>City: {findCityName(trip.cityId)}</p>
                            <p>Airports: {findCityAirports(trip.cityId)}</p>

                            {editingTripId === trip.id ? (
                                <>
                                    <textarea
                                        value={editedNotes}
                                        onChange={e => setEditedNotes(e.target.value)}
                                        placeholder="Edit notes..."
                                    />
                                    <button onClick={() => handleSave(trip.id)}>Save</button>
                                </>
                            ) : (
                                <p>{trip.notes}</p>
                            )}
                            <button onClick={() => handleEdit(trip.id, trip.notes)}>
                                {editingTripId === trip.id ? "Cancel" : "Edit"}
                            </button>
                            <button onClick={() => handleDelete(trip.id)}>Delete</button> 
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
};