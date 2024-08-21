import React, { useState } from "react";
import { Container, Row, Col, Table, Card, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";
import Autocomplete from "react-google-autocomplete";

const WeatherIndex = (props) => {
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const [city, setCity] = useState("");
	const [highTemperatures, setHighTemperatures] = useState([]);
	const [lowTemperatures, setLowTemperatures] = useState([]);
	const [dateSequence, setDateSequence] = useState([]);

	console.log(props.baseUrl);

	const getDayOfWeek = (date) => {
		const daysOfWeek = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];
		return daysOfWeek[new Date(date).getDay()];
	};

	const handleSelectPlace = (place) => {
		setLatitude(place.geometry.location.lat());
		setLongitude(place.geometry.location.lng());

		place.address_components.forEach((component) => {
			if (component.types.includes("locality")) {
				setCity(component.long_name);
			}
		});

		axios
			.get(`${props.baseUrl}/weather?lat=${latitude}&lon=${longitude}`)
			.then((response) => {
				console.log(response.data);
				setLowTemperatures(response.data.daily.temperature_2m_min);
				setHighTemperatures(response.data.daily.temperature_2m_max);
				setDateSequence(response.data.daily.time);
				console.log(response.data.daily.time);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Container className="mt-5">
			<Row className="justify-content-center">
				<Col md={8} lg={6} className="text-center">
					<h1 className="display-4 mb-4">Weather View</h1>
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col md={8} lg={6} className="text-center">
					<Form.Group>
						<Autocomplete
							apiKey={props.googleApiKey}
							onPlaceSelected={(place) => handleSelectPlace(place)}
							className="form-control mb-4"
							placeholder="Search for a city"
							style={{
								padding: "0.75rem",
								fontSize: "1rem",
								borderRadius: "50px",
								border: "1px solid #ddd",
								boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
							}}
						/>
					</Form.Group>
					<h2
						className="mb-4"
						style={{ fontWeight: 200, fontSize: "2rem", color: "#666" }}
					>
						{city}
					</h2>
				</Col>
			</Row>
			<Row className="justify-content-center mt-5">
				<Col md={8} lg={6}>
					<Table borderless hover responsive>
						<thead>
							<tr>
								<th
									style={{ fontWeight: 300, fontSize: "1.2rem", color: "#555" }}
								>
									Day
								</th>
								<th
									style={{ fontWeight: 300, fontSize: "1.2rem", color: "#555" }}
								>
									Low
								</th>
								<th
									style={{ fontWeight: 300, fontSize: "1.2rem", color: "#555" }}
								>
									High
								</th>
							</tr>
						</thead>
						<tbody>
							{highTemperatures.map((temperature, index) => (
								<tr key={index} style={{ fontSize: "1rem", color: "#333" }}>
									<td>
										{index === 0 ? "Today" : getDayOfWeek(dateSequence[index])}
									</td>
									<td>{lowTemperatures[index]}°</td>
									<td>{highTemperatures[index]}°</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	);
};

WeatherIndex.propTypes = {
	baseUrl: PropTypes.string,
	googleApiKey: PropTypes.string,
};

export default WeatherIndex;
