import React, { useState, useEffect } from "react";
import Weather from "./Weather";
import web_PhotoWeather from "../images/web_PhotoWeather.jpg"
//import { useParams } from 'react-router-dom';
import { API_KEY } from "./Weather";

//const API_KEY = '55e8d754236986a9379f468abce6a3d6';
//const lat = weather.coord.lat;

// const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   const lat = urlParams.get("lat");
/// let daysForecast = 3;

//const API_URL2 = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${daysForecast}&appid=${API_KEY}`;


const FourDaysWeather = () => {
  const [fDweather, setFDWeather] = useState(null);
  const [error, setError] = useState(null);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const lat = urlParams.get("lat");
  const lon = urlParams.get("lon");

  console.log(`'Esta es la lat vieja'${lat}`);
  console.log(`'Esta es la lon vieja'${lon}`);

  const API_URL2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  const fetchWeatherFD = async () => {
    try {
      const response = await fetch(API_URL2);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setFDWeather(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchWeatherFD(API_URL2);
  }, []); 

  if (error) return <div>Error: {error}</div>;
  if (!fDweather) return <div>Loading...</div>;

  // console.log(`'Here 4 days weather '${fDweather}`);
  //for(let elem = 4; )
//   function getForecacst(array) {
//     let result = [];
//     let index = 4;
    
//     while (index < array.length - 4) {
//         result.push(array[index]);
//         index += 8;
//     }
//     return result;
// }


function getForecacst(array) {
	let tomorrowIndex = 0;
	while (tomorrowIndex < array.length) {
		if (array[++tomorrowIndex].dt_txt.includes('00:00:00')){
			break;
		}
	}
    let result = [];
    let index = tomorrowIndex + 4;
    while (index < array.length && result.length < 4) {
        result.push(array[index]);
        index += 8;
    }
    return result;
}

// function findIndex(array) {
//   let index = 0;
//   result = [];
// //  if (array[index] === array[0]) {
// //   index++
// }else {
//   for (let i = index; i <= (index + 8); i++){
//     for (let j = 0; j < 4; j++){
//       result.push(array[i])++;
//     }
//     return result / 8;
//   }
//   return result
// }
//   return result;
// }


const forecastList = getForecacst(fDweather.list) 

  return (
    <div className='secondContainer'>  
      <img src={web_PhotoWeather} />
      <ul className='navElements'>
      <li><a href={`/`}>Current weather</a></li>
      </ul>
     
      <h2> Four days weather in {fDweather.city.name}</h2>
      
      <ul className="daysWeather">
      {forecastList.map((element) => (
        <li>
        <p>{formatDate(element.dt_txt)}</p>
        <p>Temperature: {Math.round(element.main.temp - 273)}°C, Feels like: {Math.round(element.main.feels_like - 273)}°C,</p>
        <p>Humidity: {element.main.humidity}%,</p>
        <div className="weatherDescription">
        <p>{element.weather[0].description}: ----     </p>
         <img src={getIconURL(element.weather[0].icon)} />
        </div>
      </li>

      ))}
          {/* <li>
          <p>{formatDate(forecastList.dt_txt)}</p>
          <p>Temperatura: {Math.round(forecastList.main.temp - 273)}°C, min: {Math.round(fDweather.list[2].main.temp_min - 273)}°C, max: {Math.round(fDweather.list[2].main.temp_max - 273)}°C</p>
          <p>Feels like: {Math.round(forecastList.main.feels_like - 273)}°C,</p>
          <p>Humidity: {forecastList.main.humidity}%,</p>
          <div className="weatherDescription">
          <p>{forecastList.weather[0].description}: ----     </p>
           <img src={getIconURL(fDweather.list[4].weather[0].icon)} />
          </div>
        </li> */}
       
        {/* <li>
          <p>{formatDate(fDweather.list[4].dt_txt)}</p>
          <p>Temperatura: {Math.round(fDweather.list[4].main.temp - 273)}°C, min: {Math.round(fDweather.list[2].main.temp_min - 273)}°C, max: {Math.round(fDweather.list[2].main.temp_max - 273)}°C</p>
          <p>Feels like: {Math.round(fDweather.list[4].main.feels_like - 273)}°C,</p>
          <p>Humidity: {fDweather.list[4].main.humidity}%,</p>
          <div className="weatherDescription">
          <p>{fDweather.list[4].weather[0].description}: ----     </p>
           <img src={getIconURL(fDweather.list[4].weather[0].icon)} />
          </div>
        </li>
        <li>
          <p>{formatDate(fDweather.list[12].dt_txt)}</p>
          <p>Temperatura: {Math.round(fDweather.list[12].main.temp - 273)}°C, min: {Math.round(fDweather.list[2].main.temp_min - 273)}°C, max: {Math.round(fDweather.list[2].main.temp_max - 273)}°C</p>
          <p>Feels like: {Math.round(fDweather.list[12].main.feels_like - 273)}°C,</p>
          <p>Humidity: {fDweather.list[12].main.humidity}%,</p>
          <div className="weatherDescription">
          <p>{fDweather.list[12].weather[0].description}: ----     </p>
           <img src={getIconURL(fDweather.list[12].weather[0].icon)} />
          </div>
        </li>
        <li>
          <p>{formatDate(fDweather.list[20].dt_txt)}</p>
          <p>Temperatura: {Math.round(fDweather.list[20].main.temp - 273)}°C, min: {Math.round(fDweather.list[2].main.temp_min - 273)}°C, max: {Math.round(fDweather.list[2].main.temp_max - 273)}°C</p>
          <p>Feels like: {Math.round(fDweather.list[20].main.feels_like - 273)}°C,</p>
          <p>Humidity: {fDweather.list[20].main.humidity}%,</p>
          <div className="weatherDescription">
          <p>{fDweather.list[20].weather[0].description}: ----     </p>
          <img src={getIconURL(fDweather.list[20].weather[0].icon)} />
          </div>
        </li>
        <li>
          <p>{formatDate(fDweather.list[28].dt_txt)}</p>
          <p>Temperatura: {Math.round(fDweather.list[28].main.temp - 273)}°C, min: {Math.round(fDweather.list[2].main.temp_min - 273)}°C, max: {Math.round(fDweather.list[2].main.temp_max - 273)}°C</p>
          <p>Feels like: {Math.round(fDweather.list[28].main.feels_like - 273)}°C,</p>
          <p>Humidity: {fDweather.list[28].main.humidity}%,</p>
          <div className="weatherDescription">
          <p>{fDweather.list[28].weather[0].description}: ----     </p>
           <img src={getIconURL(fDweather.list[28].weather[0].icon)} />
          </div>
        </li> */}
        

      </ul>
         </div>
  );
};

function toLocalTime(apiTime) {
  const unixTimestamp = apiTime; // Example Unix timestamp

  //Create a new Date object using the Unix timestamp (multiply by 1000 to convert from seconds to milliseconds)
  const date = new Date(apiTime * 1000);

  // Convert the date to a human-readable format
  const formattedDate = date.toLocaleString(); // You can pass options to toLocaleString() for a specific format

  console.log(formattedDate); // Output: "4/10/2024, 6:21:12 AM" (example)
  return formattedDate;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function getIconURL(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}



export default FourDaysWeather;

