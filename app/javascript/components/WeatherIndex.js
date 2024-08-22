import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Card, Form } from "react-bootstrap";
import axios from "axios";
import Autocomplete from "react-google-autocomplete";
import WeatherTable from "./WeatherTable";
import LocationHeader from "./LocationHeader";

const WeatherIndex = ({ baseUrl, googleApiKey }) => {
	const [city, setCity] = useState("");
	const [highTemperatures, setHighTemperatures] = useState([]);
	const [lowTemperatures, setLowTemperatures] = useState([]);
	const [currentTemperature, setCurrentTemperature] = useState(0);
	const [cloudCover, setCloudCover] = useState("");
	const [dateSequence, setDateSequence] = useState([]);
	const [dataRetrievedAt, setDataRetrievedAt] = useState(null);

	const handleSelectPlace = (place) => {
		const newLatitude = place.geometry.location.lat();
		const newLongitude = place.geometry.location.lng();

		place.address_components.forEach((component) => {
			if (component.types.includes("locality")) {
				setCity(component.long_name);
			}
		});

		axios
			.get(`${baseUrl}/weather?lat=${newLatitude}&lon=${newLongitude}`)
			.then((response) => {
				const weatherData = response.data.weather;
				const cachedAtUtc = response.data.cached_at_utc;

				console.log("Weather data: ", weatherData);
				evaluateCloudCover(weatherData.current.cloud_cover);
				setCurrentTemperature(Math.round(weatherData.current.temperature_2m));
				setLowTemperatures(weatherData.daily.temperature_2m_min);
				setHighTemperatures(weatherData.daily.temperature_2m_max);
				setDateSequence(weatherData.daily.time);
				setDataRetrievedAt(cachedAtUtc);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const evaluateCloudCover = (percentage) => {
		let cloudCoverDescription;

		if (percentage < 0.25) {
			cloudCoverDescription = "Clear";
		} else if (percentage < 0.6) {
			cloudCoverDescription = "Partly Cloudy";
		} else if (percentage < 0.8) {
			cloudCoverDescription = "Mostly Cloudy";
		} else {
			cloudCoverDescription = "Cloudy";
		}

		setCloudCover(cloudCoverDescription);
	};

	return (
		<Container className="mt-5 bg-dark text-light" fluid>
			<Row className="justify-content-center">
				<Col md={8} lg={6} className="text-center">
					<h1 className="display-4 mb-4">Weather View</h1>
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col md={8} lg={6} className="text-center">
					<Form.Group>
						<Autocomplete
							apiKey={googleApiKey}
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
					{city ? (
						<LocationHeader
							city={city}
							currentTemperature={currentTemperature}
							cloudCover={cloudCover}
							dataRetrievedAt={dataRetrievedAt}
						/>
					) : null}
				</Col>
			</Row>
			<Row className="justify-content-center mt-5">
				<Col md={8} lg={6}>
					{highTemperatures.length > 0 ? (
						<WeatherTable
							dateSequence={dateSequence}
							lowTemperatures={lowTemperatures}
							highTemperatures={highTemperatures}
						/>
					) : null}
				</Col>
			</Row>
		</Container>
	);
};

export default WeatherIndex;
