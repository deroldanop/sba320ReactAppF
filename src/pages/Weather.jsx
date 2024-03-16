import React, { useState, useEffect } from 'react';
//import { useParams } from 'react-router-dom';
//import { lat, lon } from "./FourDaysWeather"

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
      console.log(`'This is the data' ${data.coord}`);
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

/////////////////
// .then(response => response.json())
//       .then(data => {
//         setData(data);
//       });

//     // Clean-up function (optional)
//     return () => {
//       console.log('Component unmounted');
//       // Perform any clean-up here
//     };
//   }, []);


//////////////////

  return (
    
    <div className='secondContainer'>
      
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
      </ul>
      <p>Temperature: {Math.round(weather.main.temp - 273)}°C,   </p>
      <p>Feels like: {Math.round(weather.main.feels_like - 273)}°C,   </p>
      <p>{weather.weather[0].description},</p>
      <img src={getIconURL(weather.weather[0].icon)} />
      <p>Humidity: {weather.main.humidity}%,</p>
      <p>Sunrise: {toLocalTime(weather.sys.sunrise)}</p>
      <p>Sunset: {toLocalTime(weather.sys.sunset)}</p>
      <p>Latitude: {weather.coord.lat}°</p>
      <p>Longitude: {weather.coord.lon}°</p>

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




// const paramsString = "coord";
// const searchParams = new URLSearchParams(API_KEY);
// for (const p of searchParams) {
//   console.log(p);
// }




export default Weather;
export { API_KEY };
