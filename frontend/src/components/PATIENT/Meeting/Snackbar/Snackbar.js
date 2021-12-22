import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import { setSnackBar } from "../../../../store/video";
function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function SimpleSnackbar() {
	const snackbarOpen = useSelector((state) => state.video.snackBar);
	//const { snackbarOpen, setSnackbarOpen } = useAppContext();
	const dispatch = useDispatch();
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		dispatch(
			setSnackBar({
				snackBar: false,
			})
		);
	};

	return (
		<div>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
			>
				<Alert onClose={handleClose} severity='success'>
					Meet ID copied!
				</Alert>
			</Snackbar>
		</div>
	);
}
