import "./index.css";
import React from 'react';
import Weather from "./pages/Weather";
import NavBar from "./components/NavBar";

import { Route, Routes } from 'react-router-dom';
import FourDaysWeather from "./pages/FourDaysWeather";



//Here is your key: 97e9bb6a
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Weather />} />
        <Route path='/WeatherForecast' element={<FourDaysWeather />} />
        {/* <Route path='/SixteenDaysWeather' element={<SixteenDaysWeather />} /> */}
       
      </Routes>
    </>
  );
  
}

export default App;

