import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Form, Button, Row, Col, DropdownButton, Dropdown} from "react-bootstrap";
import "./NewCase.css";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import format from "date-fns/format";
import newAppointmentAPI from "../../../api/newAppointmentAPI";
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker , MuiPickersUtilsProvider } from '@material-ui/pickers';
import getDoctorDetailsAPI from "../../../api/getDoctorDetailsAPI";

export default function NewAppointment(props) {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const [caseDetails, setCaseDetails] = useState({});
	const [dateOfAppointment, setDateOfAppointment] = useState(new Date());
	const [startTime, setStartTime] = useState("00:00");
	const [endTime, setEndTime] = useState("00:00");
	const [doctorId, setDoctorId] = useState(undefined);
	const [selectedDoctor, setSelectedDoctor] = useState("SELECT DOCTOR");
	const [doctorDetails, setDoctorDetails] = useState([]);
	useEffect(() => {
		if (
			props.location.state !== undefined &&
			props.location.state.case_details !== undefined
		) {
			setCaseDetails(props.location.state.case_details);
		} else if (props.case_details !== undefined) {
			setCaseDetails(props.case_details);
		} else {
			history.push("/home");
		}

		getDoctorDetailsAPI({
			token: auth.token
		}).then((res) => {
			if (res.reply) {
				console.log(res.doctors);
				setDoctorDetails(res.doctors);
			} else {
				// alert(res.data.msg + "\nYou will be redirected to Home.");
				setTimeout(history.push("/patient/appointment"), 0);
			}
		})

	}, []);

	function validateForm() {
		return true;
		//return email.length > 0 && password.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();
		// const start_time =
		// 	format(dateOfAppointment, "yyyy-MM-dd") + " " + startTime + ":00";
		// const end_time =
		// 	format(dateOfAppointment, "yyyy-MM-dd") + " " + endTime + ":00";
		console.log(dateOfAppointment);
		newAppointmentAPI({
			token: auth.token,
			case_id: caseDetails.case_id,
			doctor_id: doctorId,
			preferred_date: format(dateOfAppointment, "yyyy-MM-dd")
		}).then((res) => {
			if (res.reply) {
				history.push("/patient");
			} else {
				alert(res.data.msg);
			}
		});
		// console.log(start_time);
		// console.log(end_time);
	}

	return (
		<div>
			<div className='NewCase'>
				<h3 className='FormHeading'>Enter Details For Appointment</h3>
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
						<Form.Label>Case ID</Form.Label>
						<Form.Control
							type='text'
							value={caseDetails.case_id}
							disabled={true}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
						<Form.Label>Example textarea</Form.Label>
						<Form.Control as='textarea' rows={3} />
					</Form.Group>
					<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
						<Form.Label>Select Doctor</Form.Label>
						<DropdownButton 
							variant="secondary" 
							id="dropdown-basic-button" 
							title={selectedDoctor}
						>
							{
								doctorDetails.map((dd) => {
									return (
										<Dropdown.Item
												onClick={(e) => {
													console.log(e.target.value);
													setSelectedDoctor(dd.first_name + " " + dd.last_name);
													setDoctorId(dd.doctor_id);
												}}
											>
												<div>
													{dd.first_name + " " + dd.last_name}
												</div>
											</Dropdown.Item>
									);
								})
							}
						</DropdownButton>
						{/* <Form.Control
							type='text'
							value={doctorId}
							onChange={(e) => setDoctorId(e.target.value)}
						/> */}
					</Form.Group>
					<Form.Label>Preferred Date Of Appointment</Form.Label>
					<Form.Group as={Col}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								autoOk
								variant="inline"
								inputVariant="outlined"
								format="dd/MM/yyyy"
								value={dateOfAppointment}
								onChange={(date) => setDateOfAppointment(date)}
								InputAdornmentProps={{ position: "start" }}
								minDate={new Date()}
							/>
						</MuiPickersUtilsProvider>
						{/* <ReactDatePicker
							value={dateOfAppointment}
							onChange={(date) => setDateOfAppointment(date)}
							minDate={new Date()}
						/> */}
					</Form.Group>
					<div className='text-center' style={{ paddingTop: "2rem" }}>
						<Button
							variant='outline-dark'
							block
							size='sm'
							className='NewCaseButton'
							type='submit'
							disabled={!validateForm()}
						>
							Book An Appointment
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
}
