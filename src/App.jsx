import { useState, createContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FlexGrid from "./components/FlexGrid";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';

import useStyles from "./styles";
import { LABELS, ERRORS, SUCCESS } from "./messages";
import TransitionAlerts from "./components/TransitionAlerts";
import { useFetch } from "./hooks/useFetch";
export const StopContext = createContext("");

let [success, message] = [false, ""];
const App = () => {
	// Api URLS to call
	const STOPS_URL = "https://6130d11c8066ca0017fdaa97.mockapi.io/stops";
	const BOOK_BASE_URL = "https://6130d11c8066ca0017fdaa97.mockapi.io/book/";

	const classes = useStyles();
	const [stop, setStop] = useState("");
	const [open, setOpen] = useState(false);

	const showAlert = function () {
		setOpen(true);
		setTimeout(() => setOpen(false), 4000);
	};

	const { data, error, loading } = useFetch(STOPS_URL);
	if (!loading) {
		// console.log("**** Getting Stops ****", data);
		if (error) {
			// console.log("****  Error ****", error);
			message = ERRORS.technical_error;
			showAlert();
		}
	}

	const bookTrip = async (tripId) => {
		try {
			const res = await fetch(`${BOOK_BASE_URL}${tripId}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
			});
			const data = await res.json();
			// console.log(data);
			success = data && data.success;
			message = success
				? SUCCESS.booking_success
				: ERRORS.technical_error + ", " + ERRORS.booking_fail;

			showAlert();
		} catch (error) {
			message = ERRORS.technical_error + ", " + ERRORS.booking_fail;
			showAlert();
		}
	};

	return (
		<StopContext.Provider value={stop}>
			<div className={classes.container}>
				<Typography variant="h4" className={classes.appTitle}>
					{LABELS.app_title}
				</Typography>
				<Autocomplete
					id="autocomplete"
					className={classes.selector}
					classes={{
						paper: classes.paper,
						listbox: classes.listbox,
						popper: classes.popper,
					}}
					sx={{ width: 300, marginBottom: 3 }}
					options={!data ? [] : data}
					onChange={(e, value) => setStop(value)}
					renderInput={(params) => (
						<TextField {...params} label={LABELS.choose_stop} 
						InputProps={{
							...params.InputProps,
							endAdornment: (
							  <>
								{loading ? <CircularProgress color="inherit" size={20} /> : null}
								{params.InputProps.endAdornment}
							  </>
							),
						  }}
						/>
					)}
				/>
				<TransitionAlerts
					isOpen={open}
					severity={success ? "success" : "error"}
					message={message}
				/>
				<FlexGrid onBookTrip={bookTrip} />
			</div>
		</StopContext.Provider>
	);
};

export default App;
