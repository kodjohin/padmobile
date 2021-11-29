import React, { useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Divider from "@mui/material/Divider";

import { dateToLocalString } from "../utils";
import useStyles from "../styles";
import BookButton from "./BookButton";
import { useFetch } from "../hooks/useFetch";
import { StopContext } from "../App";

import { ERRORS } from "../messages";

export default function FlexGrid({ onBookTrip }) {
	const classes = useStyles();

	const stop = useContext(StopContext);

	let TRIPS_URL = "https://6130d11c8066ca0017fdaa97.mockapi.io/trips";
	TRIPS_URL = `${TRIPS_URL}${stop ? `?departureStop=${stop}` : ""}`;

	const { data, error, loading } = useFetch(TRIPS_URL);
	if (error) {
		// console.log("****  Error ****", error);
		const message = ERRORS.technical_error;
		// showAlert();
	}

	// define grid headers
	const columns = [
		{
			field: "departureStop",
			headerName: "Arrêt de départ",
			width: 200,
			marginLeft: 20,
		},
		{
			field: "departureTime",
			headerName: "Horaire de départ",
			width: 200,
			align: "center",
			renderCell: (params) => {
				const [date, time] = dateToLocalString(params.value);
				return (
					<>
						<small>{date}</small>
						<Divider
							sx={{
								marginLeft: "5px",
								marginRight: "5px",
							}}
							orientation="vertical"
							variant="middle"
							flexItem
							light
						/>
						<h3 className={classes.h3}>{time}</h3>
					</>
				);
			},
		},
		{
			field: "arrivalStop",
			headerName: "Arrêt d'arrivée",
			width: 200,
			align: "center",
		},
		{
			field: "arrivalTime",
			headerName: "Horaire d'arrivée",
			width: 200,
			align: "center",
			renderCell: (params) => {
				const [date, time] = dateToLocalString(params.value);
				return (
					<>
						<small>{date}</small>
						<Divider
							sx={{
								marginLeft: "5px",
								marginRight: "5px",
							}}
							orientation="vertical"
							variant="middle"
							flexItem
							light
						/>
						<h3 className={classes.h3}>{time}</h3>
					</>
				);
			},
		},
		{
			field: "action",
			headerName: "Action",
			width: 150,
			align: "right",
			renderCell: (params) => {
				// TODO: if booked set highlight row background
				return <BookButton onBookTrip={onBookTrip} id={params.row.id} />;
			},
		},
	];

	return (
		<div className={classes.dataGridContainer}>
			<div style={{ display: "flex", height: "90%" }}>
				<div style={{ flexGrow: 1 }}>
					<DataGrid
						className={classes.dataGrid}
						rows={!data ? [] : data}
						columns={columns}
						disableSelectionOnClick
						loading={loading}
						rowHeight={60}
					/>
				</div>
			</div>
		</div>
	);
}
