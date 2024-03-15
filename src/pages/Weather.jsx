import React, { useState, useEffect } from 'react';

const API_KEY = '55e8d754236986a9379f468abce6a3d6';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q={CITY_NAME}&appid=${API_KEY}`;




const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(API_URL.replace('{CITY_NAME}', cityName));
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
    fetchWeather('Seattle');
  }, []); 

  if (error) return <div>Error: {error}</div>;
  if (!weather) return <div>Loading...</div>;

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
      <p>Temperature: {Math.round(weather.main.temp - 273)}°C,  {weather.weather[0].description}, 
      <img src={getIconURL(weather.weather[0].icon)} /></p>
      <p>Description: {weather.weather[0].description}</p>
      <p>Sunrise: {toLocalTime(weather.sys.sunrise)}</p>
      <p>Sunset: {toLocalTime(weather.sys.sunset)}</p>

    </div>
  );
  
};



function toLocalTime(apiTime){
const unixTimestamp = apiTime; // Example Unix timestamp

//Create a new Date object using the Unix timestamp (multiply by 1000 to convert from seconds to milliseconds)
const date = new Date(apiTime * 1000);

// Convert the date to a human-readable format
const formattedDate = date.toLocaleString(); // You can pass options to toLocaleString() for a specific format

 console.log(formattedDate); // Output: "4/10/2024, 6:21:12 AM" (example)
return formattedDate;
}

// function secondsToHoursMinutes(seconds) {
//     var hours = Math.floor(seconds / 3600000);
//     var minutes = Math.floor((seconds % 3600000) / 60);
// let time 
//    if(hours < 12){
//     time = hours + ':' + minutes +"AM"
//    } else{
//     time = (hours - 12) + ':' + minutes +"PM"
//    }
//     return time;
// }{
function getIconURL(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png` 
}


export default Weather;

