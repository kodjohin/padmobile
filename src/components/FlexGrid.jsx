import React, { useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Divider from "@mui/material/Divider";

import useStyles from "../styles";
import BookButton from "./BookButton";
import { useFetch } from "../hooks/useFetch";
import { StopContext } from "../App";
import { dateToLocalString } from "../utils";
import { ERRORS } from "../messages";

const TRIPS_URL = "https://6130d11c8066ca0017fdaa97.mockapi.io/trips";

export default function FlexGrid({ showAlert, setStatus, setMessage }) {
	const classes = useStyles();
	const stop = useContext(StopContext);
	const TRIP_URL = `${TRIPS_URL}${stop ? `?departureStop=${stop}` : ""}`;

	const { data, error, loading } = useFetch(TRIP_URL);
	if(!loading && error) {
		setStatus("error");
		setMessage(ERRORS.technical_error);
		showAlert();
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
				return <BookButton id={params.row.id} showAlert={showAlert} setStatus={setStatus} setMessage={setMessage}/>;
			},
		},
	];

	return (
		<div className={classes.dataGridContainer}>
			<div style={{ display: "flex", height: "90%" }}>
				<div style={{ flexGrow: 1 }}>
					<DataGrid
						className={classes.dataGrid}
						rows={!data || data === "Not found" ? [] : data}
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
