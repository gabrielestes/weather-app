import React from "react";
import { Container } from "react-bootstrap";

const LocationHeader = ({ city, currentTemperature, cloudCover }) => {
	return (
		<Container>
			<h2
				className="mb-1 text-light"
				style={{ fontWeight: 200, fontSize: "2rem", color: "#666" }}
			>
				{city}
			</h2>
			<h1 style={{ fontWeight: 100 }} className="display-2">
				{currentTemperature}°
			</h1>
			<h5 style={{ fontWeight: 100 }}>{cloudCover}</h5>
		</Container>
	);
};

export default LocationHeader;
