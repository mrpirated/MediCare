import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import moment from "moment";
import { Card, Form, Modal, Row, Col, Button } from "react-bootstrap";
import patientMyAppointmentAPI from "../../../api/patientMyAppointmentAPI";
export default function MyAppointment(props) {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const [appointments, setAppointments] = useState([]);
	const [openPopup, setopenPopup] = useState(false);
	const [selectedAP, setselectedAP] = useState({});
	const case_details = props.location.state.case_details;
	//console.log(props);
	useEffect(() => {
		if (!(auth.isauth && auth.type === 0)) {
			history.push("/home");
		}
		if (props.location.state === undefined) {
			history.push("/home");
		}
		const fetchData = async () => {
			await patientMyAppointmentAPI({
				token: auth.token,
				case_id: case_details.case_id,
			}).then((res) => {
				if (res.reply) {
					setAppointments(res.appointments);
				} else {
					//alert(res.data.msg + "\nYou will be redirected to Home.");
					setTimeout(history.push("/home"), 4000);
				}
			});
		};

		fetchData();
		//console.log(appointments);
	}, []);
	const onSelectAppointment = async (app) => {
		setselectedAP(app);
		console.log(app);
		setopenPopup(true);
	};
	return (
		<div>
			<div id='card'>
				<Card
					className='appointment-addcard'
					onClick={() => {
						history.push("/patient/new-appointment", {
							case_details: case_details,
						});
					}}
				>
					<Card.Body>
						<Card.Title>Create New Appointment</Card.Title>
					</Card.Body>
				</Card>
			</div>
			{appointments.map((c) => (
				<div id='card'>
					<Card className='appointment' onClick={() => onSelectAppointment(c)}>
						<Card.Body>
							<Card.Text>Doctor: {c.doctor_name}</Card.Text>
							<Card.Text>
								Date:{" "}
								{c.start_time !== null
									? new Date(c.start_time).toString().slice(0, 15)
									: "Not Yet Appointed"}
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
			))}

			<Modal
				aria-labelledby='example-custom-modal-styling-title'
				show={openPopup}
				onHide={() => setopenPopup(false)}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id='example-custom-modal-styling-title'>
						Appointment Details
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<span style={{ fontSize: "20px", color: "grey" }}>Doctor: </span>
						<span style={{ fontSize: "22px" }}>{selectedAP.doctor_name}</span>
					</div>
					<div>
						<span style={{ fontSize: "20px", color: "grey" }}>
							Descrption:{" "}
						</span>
						<span style={{ fontSize: "18px" }}>
							{case_details.case_description}
						</span>
					</div>
					<div>
						<span style={{ fontSize: "20px", color: "grey" }}>Date: </span>
						<span style={{ fontSize: "18px" }}>
							{selectedAP.start_time !== null
								? new Date(selectedAP.start_time).toString().slice(0, 15)
								: "NA"}
						</span>
					</div>

					<div>
						<span style={{ fontSize: "20px" }}>
							From:{" "}
							{selectedAP.start_time !== null
								? moment(selectedAP.start_time).format("hh:mm A")
								: "NA"}
						</span>

						<span style={{ fontSize: "20px", float: "right" }}>
							To:{" "}
							{selectedAP.end_time !== null
								? moment(selectedAP.end_time).format("hh:mm A")
								: "NA"}
						</span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}
