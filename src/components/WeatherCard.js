import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	CardActions,
	CardContent,
	Typography,
	Avatar,
	Button,
	Card,
	Box,
	CircularProgress,
} from "@mui/material";
import "../App.css";

const WeatherCard = ({ location, updateLocations }) => {
	const [weatherData, setWeatherData] = useState({});
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const loadingTimeout = setTimeout(() => {
			setIsLoading(true);
		}, 500);
		retrieveDataFromApi();
		return () => {
			setIsLoading(false);
			clearTimeout(loadingTimeout);
		};
	}, [location]);

	const retrieveDataFromApi = () => {
		let responseTwo,
			responseThree = {};

		axios
			.get(
				`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${process.env.REACT_APP_API_KEY}`
			)
			.then((response) => {
				return axios.get(
					`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${process.env.REACT_APP_API_KEY}`
				);
			})
			.then((weatherinfo) => {
				responseTwo = weatherinfo.data;
				return axios.get(
					`https://restcountries.com/v3.1/alpha/${weatherinfo.data.sys.country}?fields=flags`
				);
			})
			.then((flagResponse) => {
				responseThree = flagResponse.data.flags.png;
			})
			.catch((error) => {
				console.log(error);
				setErrorMessage(error.message);
			})
			.finally(() => {
				setErrorMessage("");
				setWeatherData({
					id: responseTwo.id,
					city: responseTwo.name,
					countryCode: responseTwo.sys.country,
					flag: responseThree,
					temperature: Number(responseTwo.main.temp),
					condition: `icons/${responseTwo.weather[0].icon}.png`,
					description: responseTwo.weather[0].description,
					windSpeed: responseTwo.wind.speed,
					windDeg: responseTwo.wind.deg,
				});
			});
	};

	const removeLocation = () => {
		let newLocations = [];
		let locations =
			localStorage.getItem("locations") &&
			JSON.parse(localStorage.getItem("locations"));

		newLocations = locations.filter((loc) => loc !== location.name);

		localStorage.setItem(
			"locations",
			JSON.stringify(locations.filter((loc) => loc !== location.name))
		);

		updateLocations(newLocations);
	};

	console.log(weatherData.condition);
	return (
		<>
			{isLoading ? (
				errorMessage.length === 0 ? (
					<Card
						id={weatherData?.id}
						variant="outlined"
						sx={{
							width: "250px",
							padding: "20px 10px",
						}}>
						<CardContent
							sx={{ display: "flex", justifyContent: "space-between" }}>
							<Typography onClick={() => retrieveDataFromApi()} variant="h5">
								{weatherData?.city}
							</Typography>
							<Avatar alt="flag" src={weatherData?.flag} />
						</CardContent>
						<CardContent
							sx={{ display: "flex", justifyContent: "space-evenly" }}>
							<Typography variant="p">
								{parseInt(weatherData?.temperature)}°C
							</Typography>
							<div className="picture-container">
								<img
									className="condition-picture"
									alt="condition"
									src={weatherData?.condition}
								/>
								<Typography variant="div" className="hovertool">
									{weatherData?.description}
								</Typography>
							</div>
							<Typography variant="p">
								{Math.round(weatherData?.windSpeed)} km/h
							</Typography>
							<ArrowUpwardIcon
								style={{ transform: `rotate(${weatherData?.windDeg}deg)` }}
							/>
						</CardContent>
						<CardActions>
							<Button onClick={() => removeLocation()}>Remove</Button>
						</CardActions>
					</Card>
				) : (
					<Card
						variant="outlined"
						sx={{
							width: "250px",
							padding: "20px 10px",
						}}>
						<CardContent>
							<Typography variant="p">{errorMessage}</Typography>
						</CardContent>
					</Card>
				)
			) : (
				<Card
					variant="outlined"
					sx={{
						width: "250px",
						padding: "20px 10px",
					}}>
					<Box sx={{ display: "flex" }}>
						<CircularProgress />{" "}
					</Box>
				</Card>
			)}
		</>
	);
};

export default WeatherCard;
