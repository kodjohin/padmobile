import React, { useState } from "react";
import Button from "@mui/material/Button";

import { LABELS } from "../messages";
import useStyles from "../styles";

const BookButton = ({ onBookTrip, id }) => {
	const classes = useStyles();
	const [booked, setBooked] = useState(false);

	return (
		<Button
			className={classes.button}
			disabled={booked}
			variant="contained"
			size="small"
			onClick={() => {
				setBooked(true);
				onBookTrip(id);
			}}
		>
			{booked ? LABELS.booked : LABELS.book}
		</Button>
	);
};

export default BookButton;
