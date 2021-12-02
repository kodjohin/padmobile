import { useState, createContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FlexGrid from "./components/FlexGrid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import useStyles from "./styles";
import { LABELS, ERRORS } from "./messages";
import TransitionAlerts from "./components/TransitionAlerts";
import { useFetch } from "./hooks/useFetch";
export const StopContext = createContext("");

// Api URLS to call
const STOPS_URL = "https://6130d11c8066ca0017fdaa97.mockapi.io/stops";

const App = () => {
	const classes = useStyles();
	const [stop, setStop] = useState("");
	const [open, setOpen] = useState(false);
	const [status, setStatus] = useState("success");
	const [message, setMessage] = useState("");

	const showAlert = function () {
		setOpen(true);
		setTimeout(() => setOpen(false), 4000);
	};

	const { data, error, loading } = useFetch(STOPS_URL);
	if(!loading && error) {
		setStatus("error");
		setMessage(ERRORS.technical_error);
		showAlert();
	} 

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
						<TextField
							{...params}
							label={LABELS.choose_stop}
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<>
										{loading ? (
											<CircularProgress color="inherit" size={20} />
										) : null}
										{params.InputProps.endAdornment}
									</>
								),
							}}
						/>
					)}
				/>
				<TransitionAlerts isOpen={open} severity={status} message={message} />
				<FlexGrid showAlert={showAlert} setStatus={setStatus} setMessage={setMessage} />
			</div>
		</StopContext.Provider>
	);
};

export default App;
