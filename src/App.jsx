import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import useFlightSearch from './hooks/useFlightSearch';
import './App.css';

function FlightSearchApp() {
  const {
    origin,
    setOrigin,
    destination,
    setDestination,
    date,
    setDate,
    passengers,
    setPassengers,
    flights,
    loading,
    error,
    searched,
    handleSearch,
    handleReset,
  } = useFlightSearch();

  return (
    <div className="app">
      <NavBar />
      <div className="container">
        <h1 className="title">✈️ Flight Search</h1>
        <div className="search-form">
          <div className="form-group">
            <label htmlFor="origin">From</label>
            <input
              id="origin"
              type="text"
              placeholder="e.g. New York"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="destination">To</label>
            <input
              id="destination"
              type="text"
              placeholder="e.g. London"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passengers">Passengers</label>
            <input
              id="passengers"
              type="number"
              min="1"
              max="10"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
            />
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" onClick={handleSearch} disabled={loading}>
              {loading ? 'Searching...' : 'Search Flights'}
            </button>
            <button className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {searched && !loading && (
          <div className="results">
            {flights.length === 0 ? (
              <p className="no-results">No flights found. Try different search criteria.</p>
            ) : (
              <>
                <h2 className="results-title">{flights.length} Flight{flights.length !== 1 ? 's' : ''} Found</h2>
                <div className="flights-list">
                  {flights.map((flight) => (
                    <div key={flight.id} className="flight-card">
                      <div className="flight-header">
                        <span className="airline">{flight.airline}</span>
                        <span className="flight-number">{flight.flightNumber}</span>
                      </div>
                      <div className="flight-details">
                        <div className="flight-route">
                          <div className="departure">
                            <span className="time">{flight.departureTime}</span>
                            <span className="city">{flight.origin}</span>
                          </div>
                          <div className="flight-duration">
                            <span className="duration">{flight.duration}</span>
                            <div className="flight-line">
                              <span>✈</span>
                            </div>
                            <span className="stops">
                              {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                            </span>
                          </div>
                          <div className="arrival">
                            <span className="time">{flight.arrivalTime}</span>
                            <span className="city">{flight.destination}</span>
                          </div>
                        </div>
                        <div className="flight-price">
                          <span className="price">${flight.price}</span>
                          <span className="per-person">per person</span>
                          <button className="btn btn-book">Select</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <FlightSearchApp />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;