import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Autocomplete from "react-google-autocomplete";

const WeatherIndex = (props) => {
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const [weather, setWeather] = useState("");

	console.log(props.baseUrl);

	const handleSelectPlace = (place) => {
		console.log(place);
		console.log("Latitude: " + place.geometry.location.lat());
		console.log("Longitude: " + place.geometry.location.lng());

		setLatitude(place.geometry.location.lat());
		setLongitude(place.geometry.location.lng());

		axios
			.get(`${props.baseUrl}/weather?lat=${latitude}&lon=${longitude}`)
			.then((response) => {
				console.log(response.data);
				// setWeather(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<React.Fragment>
			<div>
				<h1>Weather</h1>
			</div>
			<h2>Greeting: {props.greeting}</h2>
			<Autocomplete
				apiKey={props.googleApiKey}
				onPlaceSelected={(place) => handleSelectPlace(place)}
			/>
			<p>{weather}</p>
		</React.Fragment>
	);
};

WeatherIndex.propTypes = {
	greeting: PropTypes.string,
};

export default WeatherIndex;
