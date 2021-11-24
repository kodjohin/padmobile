
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FlexGrid from './components/FlexGrid';
import Typography from '@mui/material/Typography';

import useStyles from "./styles";
import {LABELS, ERRORS, SUCCESS} from "./messages";
import TransitionAlerts from './components/TransitionAlerts';

// Api URLS to call
const STOPS_URL = "https://6130d11c8066ca0017fdaa97.mockapi.io/stops";
const TRIPS_URL = "https://6130d11c8066ca0017fdaa97.mockapi.io/trips";
const BOOK_BASE_URL = "https://6130d11c8066ca0017fdaa97.mockapi.io/book/";

let [success, message] = [false, ""];

const App = () => {
    const classes = useStyles();
    const [options, setOptions] = useState([]);
    const [gridData, setGridData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const showAlert = function(){
        setOpen(true);
        setTimeout(() => setOpen(false), 4000);
    }
    
    useEffect(() => {
        (async () => {
            console.log("**** Getting Stops ****");
			try {
                const res = await fetch(STOPS_URL);
                const data = await res.json();
                if(data === "Not found"){
                    message = ERRORS.technical_error;
                    showAlert();
                }
                else{
                    setOptions(data);
                    getTrips();
                }
            } catch (error) {
                // console.log(error);
                message = ERRORS.technical_error;
                showAlert();
            }
		})();
	}, []);

    const getTrips = async (value="") => {
		console.log("Value to get Trips: ", value);
        setLoading(true);
        try {
            const res = await fetch(`${TRIPS_URL}${value ? `?departureStop=${value}` : ""}`);
            if(res.status === 404){
                message = ERRORS.technical_error;
                setOpen(true);
                setTimeout(() => setOpen(false), 4000);
                setLoading(false)
            }
            else{
                setGridData(await res.json());
                setLoading(false)
            }
        } catch (error) {
            // console.log(error);
            message = ERRORS.technical_error;
        }
	}

    const bookTrip = async (tripId) => { 
        try {
            const res = await fetch(`${BOOK_BASE_URL}${tripId}`, {
                method: "PUT",
                headers:{
                    "Content-type": "application/json",
                }
            });
            const data = (await res.json());
            // console.log(data);
            success = data && data.success;
            message = success ? SUCCESS.booking_success : ERRORS.technical_error + ", " + ERRORS.booking_fail;
            
            showAlert();
            
        } catch (error) {
            // console.log(error);
            message = ERRORS.technical_error + ", " + ERRORS.booking_fail;
            showAlert();
        }
	}
    
    return (
        <div className={classes.container}>
            <Typography variant="h4" className={classes.appTitle}>{LABELS.app_title}</Typography>
            <Autocomplete
                id="autocomplete"
                className={classes.selector}
                classes={{ 
                    paper: classes.paper, 
                    listbox: classes.listbox,
                    popper: classes.popper,
                }}
                sx={{ width: 300, marginBottom:3}}
                options={options}
                onChange={(e, value) => getTrips(value)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={LABELS.choose_stop}
                    />
                )}
            />
            <TransitionAlerts isOpen={open} severity={success ? "success" : "error"} message={message}/>
            <FlexGrid data={gridData} onBookTrip={bookTrip} loading={loading} classes=""/>
        </div>
    )
}

export default App
