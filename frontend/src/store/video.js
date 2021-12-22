import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	snackBar: false,
	videoOn: true,
	audioOn: true,
};
const slice = createSlice({
	name: "video",
	initialState,
	reducers: {
		setSnackBar: (video, action) => {
			video.snackBar = action.payload.snackBar;
		},
		setVideo: (video, action) => {
			video.videoOn = action.payload.videoOn;
		},
		setAudio: (video, action) => {
			video.audioOn = action.payload.audioOn;
		},
	},
});

export const { setAudio, setVideo, setSnackBar } = slice.actions;

export default slice.reducer;
