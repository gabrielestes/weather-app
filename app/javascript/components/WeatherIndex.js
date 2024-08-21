import React, { useState } from "react";
import PropTypes from "prop-types";

const WeatherIndex = (props) => {
	const [address, setAddress] = useState("");
	console.log("Address is: ", address);

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
				<button type="submit">Submit</button>
			</form>
			<p>{props.weather}</p>
		</React.Fragment>
	);
};

WeatherIndex.propTypes = {
	greeting: PropTypes.string,
};

export default WeatherIndex;
