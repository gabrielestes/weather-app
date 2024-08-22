import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import Autocomplete from "react-google-autocomplete";
import WeatherTable from "./WeatherTable";
import LocationHeader from "./LocationHeader";

/**
 * Renders the WeatherIndex component which contains the location search bar and resulting weather data.
 * The search bar is using the Google Places Autocomplete API.
 * When a location is selected, the weather data for that location is fetched.
 * The fetched data is used to render the WeatherTable and LocationHeader components.
 *
 * @param {string} baseUrl - The base URL for the weather API.
 * @param {string} googleApiKey - The Google API key for the autocomplete feature.
 * @return {JSX.Element} The rendered WeatherIndex component.
 */
const WeatherIndex = ({ baseUrl, googleApiKey }) => {
	const [city, setCity] = useState("");
	const [highTemperatures, setHighTemperatures] = useState([]);
	const [lowTemperatures, setLowTemperatures] = useState([]);
	const [currentTemperature, setCurrentTemperature] = useState(0);
	const [cloudCover, setCloudCover] = useState("");
	const [dateSequence, setDateSequence] = useState([]);
	const [dataRetrievedAt, setDataRetrievedAt] = useState(null);

	/**
	 * Handles place selection from Google Places Autocomplete.
	 * Sets city name and fetches weather data for the selected location.
	 *
	 * @param {object} place - Selected place object.
	 * @return {void}
	 */
	const handleSelectPlace = (place) => {
		const newLatitude = place.geometry.location.lat();
		const newLongitude = place.geometry.location.lng();

		place.address_components.forEach((component) => {
			if (component.types.includes("locality")) {
				setCity(component.long_name);
			}
		});

		fetchWeatherData(newLatitude, newLongitude);
	};

	/**
	 * Fetches weather data from the server based on the provided latitude and longitude.
	 *
	 * @param {number} latitude - The latitude of the location.
	 * @param {number} longitude - The longitude of the location.
	 * @returns {void}
	 */
	const fetchWeatherData = (latitude, longitude) => {
		axios
			.get(`${baseUrl}/weather?lat=${latitude}&lon=${longitude}`)
			.then((response) => {
				const weatherData = response.data.weather;
				const cachedAtUtc = response.data.cached_at_utc;

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

	/**
	 * Evaluates the cloud cover based on the given percentage and updates the cloud cover description.
	 * This is intended to be a human-readable description of the cloud cover, similar to Apple's iOS Weather app.
	 * The cloud cover description is used in the LocationHeader component.
	 *
	 * @param {number} percentage - the cloud cover percentage
	 * @return {void}
	 */
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
							className="form-control mb-4 custom-autocomplete-dropdown"
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
