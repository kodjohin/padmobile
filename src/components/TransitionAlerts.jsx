import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

import useStyles from "../styles";

export default function TransitionAlerts({ isOpen, severity, message }) {
	const classes = useStyles();
	return (
		<Box className={classes.box}>
			<Collapse in={isOpen}>
				<Alert severity={severity} sx={{ mb: 2 } } className={classes.alert}>
					{message}
				</Alert>
			</Collapse>
		</Box>
	);
}
