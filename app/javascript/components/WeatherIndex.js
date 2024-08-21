import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const WeatherIndex = (props) => {
	const [address, setAddress] = useState("");
	const [weather, setWeather] = useState("");
	console.log("Address is: ", address);

	const handleSubmit = (event) => {
		event.preventDefault();

		// .get(`http://localhost:3000/weather?address=${address}`)
		axios
			.get(`http://localhost:3000/weather`)
			.then((response) => {
				console.log(response);
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
			<form>
				<input
					type="text"
					placeholder="Enter an address"
					value={address}
					onChange={(event) => setAddress(event.target.value)}
				/>
				<button type="submit" onClick={handleSubmit}>
					Submit
				</button>
			</form>
			<p>{props.weather}</p>
		</React.Fragment>
	);
};

WeatherIndex.propTypes = {
	greeting: PropTypes.string,
};

export default WeatherIndex;
