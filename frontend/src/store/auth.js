import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	isloading: false,
	error: "",
	type: 0,
	user: {},
	token: "",
	isauth: false,
};
const slice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loggedIn: (auth, action) => {
			auth.user = action.payload.user;
			auth.token = action.payload.token;
			auth.type = action.payload.type;
			localStorage.setItem("token", JSON.stringify(auth.token));
			auth.isauth = true;
		},
		loggedWithToken: (auth, action) => {
			auth.user = action.payload.user;
			auth.token = action.payload.token;
			auth.isauth = true;
			auth.type = action.payload.type;
		},
		loggedOut: (auth, action) => {
			auth.user = {};
			auth.token = "";
			auth.isauth = false;
			auth.type = undefined;
			localStorage.clear();
		},
		setLoading: (auth, action) => {
			auth.isloading = action.payload.loading;
		},
	},
});

export const { loggedIn, loggedOut, loggedWithToken, setLoading } =
	slice.actions;

export default slice.reducer;
