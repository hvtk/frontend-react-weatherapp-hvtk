import React, {useEffect, useState} from 'react';
import './TodayTab.css';
import axios from "axios";
import WeatherDetail from "../../components/weatherDetail/WeatherDetail";
import createTimeString from "../../helpers/createTimeString";

const apiKey = 'a7cd75638653e0e76e1cf755f173d483';

function TodayTab({coordinates}) {

	const [forecasts, setForecasts] = useState(null);
	const [loading, toggleLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		async function fetchData() {
			setError(false);
			toggleLoading(true);

			try {
				const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,daily&appid=${apiKey}&lang=nl`);
				setForecasts([result.data.hourly[3], result.data.hourly[5], result.data.hourly[7],]);
				console.log(result.data);
			} catch (e) {
				console.error(e);
				setError(true);
			}
			toggleLoading(false);
		}

		if (coordinates) {
			fetchData();
		}

	}, [coordinates]);

	return(
		<div className="tab-wrapper">
			{forecasts &&
			<>
				<div className="chart">
					{forecasts && forecasts.map((forecast) => {
						return <WeatherDetail
							key={forecast.dt}
							temp={forecast.temp}
							type={forecast.weather[0].main}
							description={forecast.weather[0].description}
						/>
					})}
				</div>
				<div className="legend">
					{forecasts && forecasts.map((forecast) => {
						return <span>{forecast.dt}</span>
					})}
				</div>
			</>
		}
		{error && <span>Er is iets misgegaav met het ophalen van de data.</span>}
		{loading && (<span>Loading... </span>)}
	</div>
  );
}

export default TodayTab;
