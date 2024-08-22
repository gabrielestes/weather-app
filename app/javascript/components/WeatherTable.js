import React from "react";
import PropTypes from "prop-types";
import { Table, Card } from "react-bootstrap";

const WeatherTable = (props) => {
	const dateSequence = props.dateSequence;
	const lowTemperatures = props.lowTemperatures;
	const highTemperatures = props.highTemperatures;
	const daysOfWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	const getDayOfWeek = (date) => {
		return daysOfWeek[new Date(date).getDay()];
	};

	return (
		<Card
			className="shadow-sm border-0 rounded-3 p-3"
			style={{ backgroundColor: "#f9f9f9" }}
		>
			<Table responsive borderless>
				<thead>
					<tr>
						<th
							style={{
								fontWeight: 500,
								fontSize: "1.2rem",
								color: "#888",
								textAlign: "left",
							}}
						>
							Daily Forecast
						</th>
						<th
							style={{
								fontWeight: 500,
								fontSize: "1.2rem",
								color: "#888",
								textAlign: "center",
							}}
						>
							Low
						</th>
						<th
							style={{
								fontWeight: 500,
								fontSize: "1.2rem",
								color: "#888",
								textAlign: "center",
							}}
						>
							High
						</th>
					</tr>
				</thead>
				<tbody>
					{highTemperatures.map((temperature, index) => (
						<tr key={index} style={{ fontSize: "1rem", color: "#555" }}>
							<td style={{ padding: "0.75rem 1rem" }}>
								{index === 0 ? "Today" : getDayOfWeek(dateSequence[index])}
							</td>
							<td style={{ padding: "0.75rem 1rem", textAlign: "center" }}>
								{Math.round(lowTemperatures[index])}°
							</td>
							<td style={{ padding: "0.75rem 1rem", textAlign: "center" }}>
								{Math.round(highTemperatures[index])}°
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Card>
	);
};

WeatherTable.propTypes = {
	dateSequence: PropTypes.array,
	lowTemperatures: PropTypes.array,
	highTemperatures: PropTypes.array,
};

export default WeatherTable;
