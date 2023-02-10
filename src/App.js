import LocationWeather from "./components/LocationWeather";
import WeatherDisplay from "./components/WeatherDisplay";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import AppBar from "@mui/material/AppBar";
import Fab from "@mui/material/Fab";
import { useState } from "react";
import "./App.css";

function App() {
	const [locations, setLocations] = useState(
		localStorage.getItem("locations")
			? JSON.parse(localStorage.getItem("locations"))
			: []
	);
	const [showForm, setShowForm] = useState(false);

	const fabStyle = {
		position: "fixed",
		bottom: 16,
		right: 16,
	};

	return (
		<div className="App">
			<AppBar position="static">
				<Typography variant="h3">Weather App</Typography>
			</AppBar>
			<div className="display-wrapper">
				{showForm ? (
					<LocationWeather locations={locations} closeAction={setShowForm} />
				) : (
					<WeatherDisplay
						locations={locations}
						updateLocations={setLocations}
					/>
				)}
			</div>
			<Fab
				disabled={showForm}
				size="large"
				sx={fabStyle}
				onClick={() => setShowForm(true)}
				color="error">
				<AddIcon />
			</Fab>
		</div>
	);
}

export default App;
