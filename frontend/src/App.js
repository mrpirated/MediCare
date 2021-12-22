import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import PatientLogin from "./components/PATIENT/Login/Login";
import AdminLogin from "./components/ADMIN/Login/Login";
import PatientSignup from "./components/PATIENT/Signup/Signup";
import PatientRoute from "./components/PATIENT/PatientRoute";
import DoctorRoute from "./components/DOCTOR/DoctorRoute";
import AdminRoute from "./components/ADMIN/AdminRoute";
import Home from "./components/HOME/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import tokenAPI from "./api/tokenAPI";
import { loggedWithToken } from "./store/auth";
import { useSelector } from "react-redux";
import "./App.css";
function App() {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const history = useHistory();
	useEffect(() => {
		const checktoken = async () => {
			if (!auth.isauth && localStorage.getItem("token")) {
				console.log("called");
				await tokenAPI(JSON.parse(localStorage.getItem("token"))).then(
					(res) => {
						if (res.type === 2) {
							res.user = { ...res.user, first_name: "Admin" };
						}
						dispatch(
							loggedWithToken({
								user: res.user,
								token: JSON.parse(localStorage.getItem("token")),
								type: res.type,
							})
						);
						//console.log(browserHistory.);
						if (res.type === 0) {
							if (
								sessionStorage.getItem("lastPage") &&
								sessionStorage.getItem("lastPage").includes("/patient")
							) {
								console.log(sessionStorage.getItem("lastPage"));
								history.push(sessionStorage.getItem("lastPage"));
							} else history.push("/patient");
						} else if (res.type === 1) history.push("/doctor");
						else if (res.type === 2) {
							if (
								sessionStorage.getItem("lastPage") &&
								sessionStorage.getItem("lastPage").includes("/admin")
							) {
								console.log(sessionStorage.getItem("lastPage"));
								history.push(sessionStorage.getItem("lastPage"));
							} else history.push("/admin");
						}
					}
				);
			}
		};
		checktoken();
	}, []);

	// useEffect(()=>{
	//     if()
	// },[])
	return (
		<div>
			<Switch>
				<Route
					exact
					path='/'
					render={() => {
						history.push("/home");
					}}
				/>
				<Route exact path='/login' component={PatientLogin} />
				<Route exact path='/admin/login' component={AdminLogin} />
				<Route exact path='/signup' component={PatientSignup} />
				<Route exact path='/home' component={Home} />
				<Route path='/patient' component={PatientRoute} />
				<Route path='/admin' component={AdminRoute} />
				<Route path='/doctor' component={DoctorRoute} />
			</Switch>
		</div>
	);
}

export default App;
