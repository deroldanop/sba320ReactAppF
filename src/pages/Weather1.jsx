import React, { useEffect } from 'react';
import { useWeather } from './WeatherContext';
import { API_KEY } from "./Weather";


const API_URL2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;


const Weather1 = () => {
  const { weather, setWeather, error, setError } = useWeather();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const lat = urlParams.get("lat");
  const lon = urlParams.get("lon");

  const fetchWeather = async () => {
    try {
      const response = await fetch(API_URL2);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      fetchWeather(city);
    }
  };

  useEffect(() => {
    fetchWeather(API_URL2);
  }, []); 

  if (error) return <div>Error: {error}</div>;
  if (!weather) return <div>Loading...</div>;

  lat =  weather.coord.lat;
 lon =  weather.coord.lon;
  console.log(weather.coord.lat)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>
      <h2>Weather in {weather.name}</h2>
      <ul className='navElements'>
      <li><a href={`/WeatherForecast/?lon=${weather.coord.lon}&lat=${weather.coord.lat}`}>4 days forecast</a></li>
      <li><a href={`/SixteenDaysWeather/?lon=${weather.coord.lon}&lat=${weather.coord.lat}`}>16 days forecast</a>  </li>
      </ul>
      <p>Temperature: {Math.round(weather.main.temp - 273)}°C,   </p>
      <p>Feels like: {Math.round(weather.main.feels_like - 273)}°C,   </p>
      <p>{weather.weather[0].description},</p>
      <img src={getIconURL(weather.weather[0].icon)} />
      <p>humidity: {weather.main.humidity}%,</p>
      <p>Sunrise: {toLocalTime(weather.sys.sunrise)}</p>
      <p>Sunset: {toLocalTime(weather.sys.sunset)}</p>
    </div>
  );
};

export default Weather1;