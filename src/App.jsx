import "./index.css";
import React from 'react';
import Weather from "./pages/Weather";
import NavBar from "./components/NavBar";

import { Route, Routes } from 'react-router-dom';


//Here is your key: 97e9bb6a
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Weather />} />
        {/* <Route path='/MovieDetail/:imdbID' element={<MovieDetail />} />
        <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </>
  );
  
}

export default App;
