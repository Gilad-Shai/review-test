import { useState, useCallback } from 'react';

const useFlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const searchFlights = useCallback(async (searchParams) => {
    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Authentication required. Please log in to search flights.');
      }

      const queryParams = new URLSearchParams({
        origin: searchParams.origin,
        destination: searchParams.destination,
        date: searchParams.date,
        ...(searchParams.passengers && { passengers: searchParams.passengers }),
        ...(searchParams.cabinClass && { cabinClass: searchParams.cabinClass }),
      });

      const response = await fetch(`/api/flights/search?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error('Session expired. Please log in again.');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch flights. Please try again.');
      }

      const data = await response.json();
      setFlights(data.flights || data || []);
    } catch (err) {
      setError(err.message);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setFlights([]);
    setError(null);
    setSearched(false);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    flights,
    loading,
    error,
    searched,
    searchFlights,
    clearResults,
    clearError,
  };
};

export default useFlightSearch;