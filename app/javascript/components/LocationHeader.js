import React from "react";
import { Container, Tooltip, OverlayTrigger } from "react-bootstrap";

const LocationHeader = ({ city, currentTemperature, cloudCover }) => {
	const tooltip = (props) => (
		<Tooltip id="tooltip-right" {...props}>
			Information about the cached data.
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
