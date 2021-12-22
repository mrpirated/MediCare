import React, { useEffect, useState } from "react";
import remaining_appointmentAPI from "../../../api/remaining_appointmentAPI";
import adminDoctorScheduleAPI from "../../../api/adminDoctorScheduleAPI";
import setappointmentAPI from "../../../api/setappointmentAPI";
import format from "date-fns/format";
import {
	Card,
	Modal,
	DropdownButton,
	Dropdown,
	Form,
	Row,
	Col,
	Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import DataTable from "../../DataTable";
import "./Appointment.css";
import { Route, Switch, useRouteMatch, useHistory } from "react-router";
function Appointment() {
	const token = useSelector((state) => state.auth.token);
	const [appointments, setappointments] = useState([]);
	const [doa, setDoa] = useState(new Date());
	const [openPopup, setopenPopup] = useState(false);
	const [selectedAP, setselectedAP] = useState({});
	const [docschedule, setdocschedule] = useState([]);
	const [selectedtime, setselectedtime] = useState("Select Time");
	const col = [
		{
			title: "Start Time",
			field: "start_time",
		},
		{
			title: "End Time",
			field: "end_time",
		},
	];
	//console.log(token);
	const history = useHistory();
	const { path, url } = useRouteMatch();
	useEffect(() => {
		sessionStorage.setItem("lastPage", "/admin/appointment");
		
		const fetchData = async () => {
			await remaining_appointmentAPI(token).then((res) => {
				if(res !== false){
					setappointments(res);
				} else{
					setTimeout(history.push("/admin/appointment"), 0);
				}
				//console.log(res);
			});
		};
		fetchData();
	}, [])
	useEffect(() => {
		setselectedtime("Select Time");

		const fetchData = async () => {
			await remaining_appointmentAPI(token).then((res) => {
				setappointments(res);
				//console.log(res);
			});
		};
		fetchData();
		console.log(appointments);
	}, [openPopup]);
	const getDoctorSchedule = async (data) => {
		await adminDoctorScheduleAPI({
			token: token,
			doctor_id: data.doctor_id,
		}).then((res) => {
			if (res.reply) {
				console.log(res);
				// setDoa(res.schedule.length > 0 ? new Date(res.schedule[0]) : "");
				setdocschedule(res.schedule);
			}
		});
	};
	const onCLickAppointment = async (card) => {
		console.log(1);
		setselectedAP(card);
		//console.log(selectedAP);
		await getDoctorSchedule(card);
		console.log(docschedule);
		setopenPopup(true);
	};
	const onSaveChanges = async () => {
		//var tzoffset = new Date().getTimezoneOffset() * 60000;
		setappointmentAPI({
			start_time:
				format(new Date(selectedtime.start_time), "yyyy-MM-dd") +
				" " +
				format(new Date(selectedtime.start_time), "HH:mm:ss"),
			end_time:
				format(new Date(selectedtime.end_time), "yyyy-MM-dd") +
				" " +
				format(new Date(selectedtime.end_time), "HH:mm:ss"),
			token: token,
			appointment_id: selectedAP.appointment_id,
		});
		setopenPopup(false);
	};
	const handleClose = () => setopenPopup(false);
	return (
		<div>
			{appointments.map((ap) => (
				<Card
					className='Appointment-Card'
					bg='dark'
					text='white'
					style={{ width: "20rem", margin: "2rem", display: "inline-grid" }}
					onClick={() => onCLickAppointment(ap)}
				>
					<Card.Body>
						{/* <Card.Text>Appointment ID: {ap.appointment_id}</Card.Text>
						<Card.Text>Case ID: {ap.case_id}</Card.Text> */}
						<Card.Text>Name: {ap.patient_name}</Card.Text>
						<Card.Text>Doctor: {ap.doctor_name}</Card.Text>
					</Card.Body>
				</Card>
			))}
			<Modal
				size='lg'
				aria-labelledby='example-custom-modal-styling-title'
				show={openPopup}
				onHide={handleClose}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id='example-custom-modal-styling-title'>
						Appointment Details
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Row style={{ margin: "1rem" }}>
							<Form.Group as={Col}>
								<Form.Label>Case ID:</Form.Label>
								<Form.Control
									type='text'
									value={selectedAP.case_id}
									disabled={true}
									// onChange={(e) => setFirstName(e.target.value)}
								/>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>Appointment ID:</Form.Label>
								<Form.Control
									type='text'
									value={selectedAP.appointment_id}
									disabled={true}
									// onChange={(e) => setLastName(e.target.value)}
								/>
							</Form.Group>
						</Row>
						<Row style={{ margin: "1rem" }}>
							<Form.Group as={Col}>
								<Form.Label>Patient ID:</Form.Label>
								<Form.Control
									type='text'
									value={selectedAP.patient_id}
									disabled={true}
								/>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>Patient Name:</Form.Label>
								<Form.Control
									type='text'
									value={selectedAP.patient_name}
									disabled={true}
								/>
							</Form.Group>
						</Row>
						<Row style={{ margin: "1rem" }}>
							<Form.Group as={Col}>
								<Form.Label>Doctor ID:</Form.Label>
								<Form.Control
									type='text'
									value={selectedAP.doctor_id}
									disabled={true}
								/>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>Doctor Name:</Form.Label>
								<Form.Control
									type='text'
									value={selectedAP.doctor_name}
									disabled={true}
								/>
							</Form.Group>
						</Row>
						<Row style={{ margin: "1rem" }}>
							<Form.Group as={Col}>
								<Form.Label>Appointment Time:</Form.Label>
								<DropdownButton
									menuVariant='dark'
									size='sm'
									variant='secondary'
									title={
										selectedtime != "Select Time"
											? "From :" +
											  selectedtime.start_time.substr(0, 28) +
											  " To: " +
											  selectedtime.end_time.substr(0, 28)
											: selectedtime
									}
								>
									{docschedule.map((ds) => {
										var st = new Date(ds.start_time);
										var et = new Date(ds.end_time);
										return (
											<Dropdown.Item
												onClick={(e) => {
													console.log(e.target.value);
													setselectedtime(ds);
												}}
											>
												<div>
													From: {st.toDateString()}{" "}
													{st.toTimeString().substring(0, 12)}
												</div>
												<div>
													To :{et.toDateString()}{" "}
													{et.toTimeString().substring(0, 12)}
												</div>
											</Dropdown.Item>
										);
									})}
								</DropdownButton>
							</Form.Group>
						</Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='outline-dark' onClick={onSaveChanges}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default Appointment;
