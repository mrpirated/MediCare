import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Switch, useHistory } from "react-router";
import Appointment from "./Appointment/Appointment";
import MyAppointment from "./Appointment/MyAppointment";
import Navitems from "./Navbar/Navitems";
import Navigation from "../Navigation";
import Doctors from "./Doctors/Doctors";
import NewCase from "./Appointment/NewCase";
import NewAppointment from "./Appointment/NewAppointment";
import Records from "./Records/Records";
import Meeting from "./Meeting/Meeting";
import Profile from "./Profile/Profile";
export default function PatientRoute() {
	const auth = useSelector((state) => state.auth);
	const isauth = auth.isauth;
	const type = auth.type;
	const history = useHistory();
	//const { path, url } = useRouteMatch();

	useEffect(() => {
		if (!(isauth && type === 0)) {
			history.push("/home");
		}
	});

	return (
		<div>
			<Navigation Navitems={Navitems} />
			<Switch>
				<Route path='/patient/appointment' component={Appointment} />
				<Route path='/patient/records' component={Records} />
				<Route path='/patient/myappointment' component={MyAppointment} />
				<Route path='/patient/doctors' component={Doctors} />
				<Route path='/patient/new-case' component={NewCase} />
				<Route path='/patient/new-appointment' component={NewAppointment} />
				<Route path='/patient/meeting' component={Meeting} />
				<Route path='/patient/profile' component={Profile} />
			</Switch>
		</div>
	);
}
