import React from "react";
import PropTypes from "prop-types";

const WeatherIndex = (props) => {
	return (
		<React.Fragment>
			<div>
				<h1>Weather</h1>
			</div>
			<h2>Greeting: {props.greeting}</h2>
			<p>{props.weather}</p>
		</React.Fragment>
	);
};

WeatherIndex.propTypes = {
	greeting: PropTypes.string,
};

export default WeatherIndex;
