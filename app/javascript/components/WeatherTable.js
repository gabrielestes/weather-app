import React from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";

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
		<Table borderless hover responsive>
			<thead>
				<tr>
					<th style={{ fontWeight: 300, fontSize: "1.2rem", color: "#555" }}>
						Day
					</th>
					<th style={{ fontWeight: 300, fontSize: "1.2rem", color: "#555" }}>
						Low
					</th>
					<th style={{ fontWeight: 300, fontSize: "1.2rem", color: "#555" }}>
						High
					</th>
				</tr>
			</thead>
			<tbody>
				{highTemperatures.map((temperature, index) => (
					<tr key={index} style={{ fontSize: "1rem", color: "#333" }}>
						<td>{index === 0 ? "Today" : getDayOfWeek(dateSequence[index])}</td>
						<td>{lowTemperatures[index]}°</td>
						<td>{highTemperatures[index]}°</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

WeatherTable.propTypes = {
	dateSequence: PropTypes.array,
	lowTemperatures: PropTypes.array,
	highTemperatures: PropTypes.array,
};

export default WeatherTable;
