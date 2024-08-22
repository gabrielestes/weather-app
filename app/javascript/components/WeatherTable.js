import React from "react";
import { Table, Card } from "react-bootstrap";

/**
 * This component displays a table of weather forecasts.
 *
 * @param {Array<string>} dateSequence: Dates for the forecast.
 * @param {Array<number>} lowTemperatures: Low temperatures for each date.
 * @param {Array<number>} highTemperatures: High temperatures for each date.
 * @return {JSX.Element} The WeatherTable component.
 *
 * Example usage:
 * <WeatherTable
 *   dateSequence={["2024-08-21", "2024-08-22"]}
 *   lowTemperatures={[10, 12]}
 *   highTemperatures={[20, 22]}
 * />
 */
const WeatherTable = ({ dateSequence, lowTemperatures, highTemperatures }) => {
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

export default WeatherTable;
