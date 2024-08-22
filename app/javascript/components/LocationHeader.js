import React, { useState, useEffect } from "react";
import { Container, Tooltip, OverlayTrigger } from "react-bootstrap";

/**
 * This component displays location information, including city, current temperature, and cloud cover.
 * It also shows the elapsed time since the data was last updated.
 *
 * @param {string} city - the city name
 * @param {number} currentTemperature - the current temperature
 * @param {string} cloudCover - the cloud cover description
 * @param {string} dataRetrievedAt - the timestamp when the data was last updated
 * @return {JSX.Element} the LocationHeader component
 */
const LocationHeader = ({
	city,
	currentTemperature,
	cloudCover,
	dataRetrievedAt,
}) => {
	const [elapsedTime, setElapsedTime] = useState(0);

	useEffect(() => {
		// The purpose of this is to show the # of minutes since data for this
		// particular location was last updated.
		// The elapsed time is shown in the tooltip next to the city name.
		// The older the data is, the older the cached data.
		if (dataRetrievedAt) {
			const retrievedTime = new Date(dataRetrievedAt).getTime(); // Milliseconds
			const currentTime = Date.now();
			const elapsedMinutes = Math.round(
				(currentTime - retrievedTime) / 1000 / 60
			);
			setElapsedTime(elapsedMinutes);
		}
	}, [dataRetrievedAt]);

	/**
	 * Returns a Tooltip component with a message indicating the elapsed minutes since data was last pulled.
	 *
	 * @param {object} props - props passed to the Tooltip component.
	 * @return {JSX.Element} a Tooltip component.
	 */
	const tooltip = (props) => (
		<Tooltip id="tooltip-right" {...props}>
			Data pulled {elapsedTime} {elapsedTime === 1 ? "minute" : "minutes"} ago.
		</Tooltip>
	);

	return (
		<Container>
			<h2
				className="mb-1 text-light"
				style={{ fontWeight: 200, fontSize: "2rem", color: "#666" }}
			>
				{city}
				<sup>
					<OverlayTrigger
						placement="right"
						delay={{ show: 200, hide: 200 }}
						overlay={tooltip}
					>
						<i className="bi bi-exclamation-circle"></i>
					</OverlayTrigger>
				</sup>
			</h2>
			<h1 style={{ fontWeight: 100 }} className="display-2">
				{currentTemperature}°
			</h1>
			<h5 style={{ fontWeight: 100 }}>{cloudCover}</h5>
		</Container>
	);
};

export default LocationHeader;
