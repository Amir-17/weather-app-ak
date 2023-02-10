import { Button, Card, CardActions, CardContent, Input } from "@mui/material";
import React, { useState } from "react";

const LocationWeather = ({ closeAction }) => {
	const [input, setInput] = useState("");

	const handleInputChange = (e) => {
		e.preventDefault();

		setInput(e.target.value);
	};

	const guid = () => {
		let s4 = () => {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		};
		return (
			s4() +
			s4() +
			"-" +
			s4() +
			"-" +
			s4() +
			"-" +
			s4() +
			"-" +
			s4() +
			s4() +
			s4()
		);
	};

	const addLocationToLocalStorage = (loc) => {
		let locations = localStorage.getItem("locations")
			? JSON.parse(localStorage.getItem("locations"))
			: [];

		locations.push({ id: guid(), name: loc });

		localStorage.setItem("locations", JSON.stringify(locations));
	};

	return (
		<>
			<h3>Location Weather</h3>
			<div>
				<Card
					variant="outlined"
					sx={{
						width: "250px",
						padding: "20px 10px",
					}}>
					<CardContent>
						<form
							id="location-form"
							onSubmit={() => addLocationToLocalStorage(input)}>
							<Input
								onChange={(e) => handleInputChange(e)}
								value={input}
								placeholder="Enter location"
							/>
						</form>
					</CardContent>
					<CardActions>
						<Button onClick={() => closeAction(false)}>Remove</Button>
					</CardActions>
				</Card>
			</div>
		</>
	);
};

export default LocationWeather;
