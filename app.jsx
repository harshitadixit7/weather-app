import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = 'e0be89a1ea004e35bb394958241906'; 
  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${e0be89a1ea004e35bb394958241906}&q=${city}&aqi=no`);
      console.log(response.data); // Log the response to check its structure
      setWeatherData(response.data);
      setError('');
    } catch (error) {
      setError('Error fetching weather data. Please try again later.');
      console.error('Error fetching weather:', error);
      setWeatherData(null);
    }
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city.trim() !== '') {
      fetchWeather();
    } else {
      setError('Please enter a city name.');
    }
  };

  return (
    <div className="weather-container">
      <h2>Weather App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div className="weather-info">
          <h3>{weatherData.location.name}, {weatherData.location.country}</h3>
          <p>Temperature: {weatherData.current.temp_c} °C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Weather;
