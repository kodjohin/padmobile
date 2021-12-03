import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

import useStyles from "../styles";
import { LABELS, ERRORS, SUCCESS } from "../messages";

const BOOK_BASE_URL = "https://6130d11c8066ca0017fdaa97.mockapi.io/book/";

const BookButton = ({ id, showAlert, setStatus, setMessage }) => {
	const classes = useStyles();
	const [booked, setBooked] = useState(false);
	const [loading, setLoading] = useState(false);

	const bookTrip = async (tripId) => {
		console.log(tripId)
		setLoading(true);
		try {
			const res = await fetch(`${BOOK_BASE_URL}${tripId}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
			});
			const data = await res.json();
			if (data && data.success) {
				setStatus("success");
				setMessage(SUCCESS.booking_success);
				setBooked(true);
			} else {
				setStatus("error");
				setMessage(ERRORS.technical_error + ", " + ERRORS.booking_fail);
			}
		} catch (error) {
			setStatus("error");
			setMessage(ERRORS.technical_error + ", " + ERRORS.booking_fail);
		}
		setLoading(false);
		showAlert();
	};

	return (
		<LoadingButton
			className={classes.button}
			disabled={booked}
			variant="contained"
			size="small"
			loading={loading}
			onClick={() => bookTrip(id)}
		>
			{booked ? LABELS.booked : LABELS.book}
		</LoadingButton>
	);
};

export default BookButton;
