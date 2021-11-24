import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "grid",
		gridTemplateColumns: "100vw",
		alignItems: "center",
		justifyItems: "center",
		marginTop: "50px",
		color: "#272F4A",
	},

    dataGridContainer: {
		height: 700,
        width: "950px",
        "@media (max-width: 950px)": {
            width: "100%",
        },
	},

    appTitle: {
        "&.MuiTypography-root": {
            fontFamily: "'Manrope', sans-serif",
			color: "var(--deep-blue)",
		},
		paddingBottom: "20px",
	},

    selector: {
        "&.MuiAutocomplete-root, .MuiInputLabel-root, .MuiAutocomplete-popupIndicator, .MuiAutocomplete-input, .MuiAutocomplete-noOption, .MuiAutocomplete-inputRoot, .MuiAutocomplete-option, .MuiAutocomplete-clearIndicator": {
            fontFamily: "'Manrope', sans-serif",
			color: "var(--deep-blue)",
		},
        "&.MuiAutocomplete-root, .MuiInputLabel-shrink, .MuiAutocomplete-popupIndicator": {
			color: "#076c56",
		},
        
		paddingBottom: "10px",
	},
    listbox: {
        fontFamily: "Manrope, sans-serif",
        // backgroundColor: "seagreen",
        color: "var(--deep-blue)",
        
        "& li:hover": {
            //list item specific styling
            backgroundColor: "rgb(248 245 246)",
            color: "var(--allow-green)",
        },
        "& li:nth-child(even):hover": { backgroundColor: "rgb(248 245 246)" },
        "& li:nth-child(odd):hover": { backgroundColor: "rgb(248 245 246)" }
    },
    popper: {
        
    },
	dataGrid: {
        "@media (max-width: 950px)": {
            width: "90%",
            marginRight: "auto",
            marginLeft: "auto",
        },
		"&.MuiDataGrid-root": {
            fontFamily: "'Manrope', sans-serif",
			color: "var(--deep-blue)",
            // boxShadow: "0em .3em 2em"
		},

        "&.MuiDataGrid-root .MuiDataGrid-cell--textRight.MuiDataGrid-cell--withRenderer,&.MuiDataGrid-root .MuiDataGrid-cell:focus":{
            outline: "none",
        },

        "&&.MuiDataGrid-root .MuiTablePagination-root": {
			color: "var(--deep-blue)",
		},

        "&&.MuiDataGrid-root .MuiTablePagination-actions, .MuiTablePagination-select, .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
            fontFamily: "'Manrope', sans-serif",
			color: "var(--deep-blue)",
		},

        "&.MuiDataGrid-root .MuiDataGrid-columnHeaderTitle": {
            textAlign: "center",
            fontSize: "1.1em",
        },
        
        "&.MuiDataGrid-root .MuiDataGrid-columnHeaders":{
            backgroundColor: "var(--deep-blue)",
            color: "#fff",
            fontSize: "1em",
        },
        
        "&.MuiDataGrid-root .MuiDataGrid-columnHeaderTitleContainer":{
            justifyContent: "center",
        },
        
        "&.MuiDataGrid-root .MuiDataGrid-row:hover":{
            backgroundColor: "rgb(248 245 246)",
            color: "var(--allow-green)",
        },
        "&.MuiButton-root":{
            backgroundColor: "var(--allow-green)",
        },
        "&.MuiDataGrid-root .MuiDataGrid-sortIcon":{
            color: "#fff",
        },
	},

    button: {
        "&.MuiButton-root":{
            fontFamily: "'Manrope', sans-serif",
            borderRadius: "0",
            backgroundColor: "var(--almost-red)",
        },
        "&.MuiButton-root:hover":{
            backgroundColor: "var(--allow-green)",
        }
	},
    bookedButton: {
        "&.MuiButton-root":{
            fontFamily: "'Manrope', sans-serif",
            borderRadius: "0",
            backgroundColor: "var(--allow-green)",
        },
	},

    alert: {
        "&.MuiAlert-root":{
            fontFamily: "'Manrope', sans-serif",
        },
	},

    box: {
        width: "950px",
        "@media (max-width: 950px)": {
            width: "90%",
        },
	},

	row: {
		color: "#272F4A",
	},
	
    h3: {
		color: "#076c56",
	},
}));

export default useStyles;
