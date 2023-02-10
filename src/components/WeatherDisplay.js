import WeatherCard from "./WeatherCard";
import { Grid } from "@mui/material";
import React from "react";

const WeatherDisplay = ({ locations, updateLocations }) => {
	return (
		<div>
			<h4>WeatherDisplay</h4>
			<Grid sx={{ flexGrow: 1 }} container spacing={1}>
				{locations &&
					locations.map((location, index) => (
						<Grid key={`weathergrid_${index}`} item>
							<WeatherCard
								location={location.name}
								updateLocations={updateLocations}
								key={`weathercard_${index}`}
							/>
						</Grid>
					))}
			</Grid>
		</div>
	);
};

export default WeatherDisplay;
