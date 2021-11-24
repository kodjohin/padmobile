import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Divider from "@mui/material/Divider";

import { dateToLocalString } from "../utils";
import useStyles from "../styles";
import BookButton from "./BookButton";

export default function FlexGrid({ data, onBookTrip, loading }) {
	const classes = useStyles();

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
				return <BookButton onBookTrip={onBookTrip} id={params.row.id}/>
			},
		},
	];

	return (
		<div className={classes.dataGridContainer}>
			<div style={{ display: "flex", height: "90%" }}>
				<div style={{ flexGrow: 1 }}>
					<DataGrid
						className={classes.dataGrid}
						rows={data}
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
