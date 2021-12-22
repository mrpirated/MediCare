import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Switch, useHistory } from "react-router";
import Navitems from "./Navbar/Navitems";
import Navigation from "../Navigation";
import Calendar from "./Calendar/Calendar";
import Appointment from "./Appointment/Appointment";
import AppointmentDetails from "./Appointment/AppointmentDetails";
import Availability from "./Availability/Availability";
export default function PatientRoute() {
	const auth = useSelector((state) => state.auth);
	const isauth = auth.isauth;
	const type = auth.type;
	const history = useHistory();
	//console.log(isauth);
	useEffect(() => {
		if (!(isauth && type === 1)) {
			history.push("/home");
		}
	});

	return (
		<div>
			<Navigation Navitems={Navitems} />
			<Switch>
				<Route path='/doctor/calendar' component={Calendar} />
				<Route path='/doctor/appointment' component={Appointment} />
				<Route
					path='/doctor/appointment-details'
					component={AppointmentDetails}
				/>
				<Route path='/doctor/availability' component={Availability} />
				{/* <Route path='/doctor/doctors' component={Doctors} /> */}
			</Switch>
		</div>
	);
}
