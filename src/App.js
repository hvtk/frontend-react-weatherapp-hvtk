import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import './App.css';



const apiKey = 'a7cd75638653e0e76e1cf755f173d483';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState(false);

useEffect(() => {
  async function fetchData() {
    setError(false);
    try {
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${apiKey}&lang=nl`);
      setWeatherData(result.data);
    } catch (e) {
      console.error(e);
      setError(true);
    }
  }
    if (location) {
     fetchData();
    }
  }, [location]);
  return (
    <>
      <div className="weather-container">

        {/*HEADER -------------------- */}
        <div className="weather-header">
          <SearchBar setLocationHandler={setLocation}/>
          {error && (
              <span className="wrong-location-error">
                Oeps! deze locatie bestaat niet
              </span>
          )}

          <span className="location-details">
            {weatherData &&
              <>
                <h2>{weatherData.weather[0].description}</h2>
                <h3>{weatherData.name} </h3>
                <h1>{weatherData.main.temp} </h1>
              </>
            }
          </span>
        </div>

        {/*CONTENT ------------------ */}
        <div className="weather-content">
          <TabBarMenu/>

          <div className="tab-wrapper">
            Alle inhoud van de tabbladen komt hier!
          </div>
        </div>

        <MetricSlider/>
      </div>
    </>
  );
}

export default App;
