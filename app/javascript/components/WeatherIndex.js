import React from "react";
import PropTypes from "prop-types";

const WeatherIndex = (props) => {
	return <React.Fragment>Greeting: {props.greeting}</React.Fragment>;
};

WeatherIndex.propTypes = {
	greeting: PropTypes.string,
};

export default WeatherIndex;
