import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "./AppointmentDetails.css";

export default function AppointmentDetails(props) {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();

	useEffect(() => {
		if (!(auth.isauth && auth.type === 1)) {
			history.push("/home");
		}
		if (props.location.state === undefined) {
			history.push("/home");
		} else {
			console.log("Hello");
		}
	}, []);

	return <div>Appointment Details</div>;
}
