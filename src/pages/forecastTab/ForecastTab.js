import React, { useEffect, useState} from 'react';
import axios from "axios";
import './ForecastTab.css';

const apiKey = 'a7cd75638653e0e76e1cf755f173d483';

function ForecastTab({coordinates}) {

  const [forecasts, setForecasts] = useState(null);
  const [error, setError] = useState(false);


  function createDateString(timestamp) {
    const day = new Date(timestamp * 1000);
    return day.toLocaleDateString('nl-NL', {weekday: 'long'});
  }

  useEffect(() => {
    async function fetchData() {
      setError(false);

      try {
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates?.lat}&lon=${coordinates?.lon}&exclude=minutely,current,hourly&appid=${apiKey}&lang=nl`);
        setForecasts(result.data.daily.slice(1, 6));
      } catch (e) {
        console.error(e);
        setError(true);
      }
    }

    if (coordinates) {
      fetchData();
    }

  }, [coordinates]);

  return (
      <div className="tab-wrapper">
        {forecasts && forecasts.map((forecast) => {
          return (
              <article className="forecast-day" key={forecast.dt}>
                <p className="day-description">
                  {createDateString(forecast.dt)}
                </p>

                <section className="forecast-weather">
              <span>
                {forecast.temp.day}
              </span>
                  <span className="weather-description">
                {forecast.weather[0].description}
              </span>
                </section>
              </article>
          )
        })}

        {!forecasts && !error && (
            <span className="no-forecast">
          Zoek eerst een locatie om het weer voor deze week te bekijken
        </span>
        )}

        {error && <span> Er is iets misgegaan met het ophalen van de data. </span>}
      </div>
  );
}

export default ForecastTab;
