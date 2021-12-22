import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { Switch, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import patientCaseAPI from "../../../api/patientCaseAPI";
import { Card } from "react-bootstrap";
//import "./Appointment.css";

export default function Appointment(props) {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const [cases, setCases] = useState([]);

	useEffect(() => {
		sessionStorage.setItem("lastPage", "/patient/appointment");
		// if (!(auth.isauth && auth.type === 0)) {
		// 	history.push("/home");
		// }
		const patientFunc = async () => {
			const tokenNow = auth.token ? auth.token : localStorage.getItem("token");
			//console.log(tokenNow);
			await patientCaseAPI({
				token: tokenNow,
			}).then((res) => {
				if (res.reply) {
					//console.log(res.cases);
					setCases(res.cases);
				} else {
					// alert(res.data.msg + "\nYou will be redirected to Home.");
					setTimeout(history.push("/patient/appointment"), 0);
				}
			});
		};
		setTimeout(patientFunc(), 100);
	}, []);

	return (
		<div>
			<div id='card'>
				<Card
					className='appointment-addcard'
					onClick={() => {
						history.push("/patient/new-case");
					}}
				>
					<Card.Body>
						<Card.Title style={{ fontSize: "140%" }}>
							Create New Case
						</Card.Title>
						<Card.Text></Card.Text>
					</Card.Body>
				</Card>
			</div>
			{cases.map((c) => (
				<div id='card'>
					<Card
						className='appointment'
						onClick={() => {
							history.push("/patient/myappointment", { case_details: c });
						}}
					>
						<Card.Body>
							<Card.Title>Case Id: {c.case_id}</Card.Title>
							<Card.Text>{c.case_description}</Card.Text>
						</Card.Body>
					</Card>
				</div>
			))}
		</div>
	);
}
