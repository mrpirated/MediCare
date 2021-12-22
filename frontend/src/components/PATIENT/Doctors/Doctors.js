import React, { useEffect, useState } from "react";
import getDoctorDetailsAPI from "../../../api/getDoctorDetailsAPI";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Card, ListGroup, ListGroupItem, Image } from "react-bootstrap";
import { requirePropFactory } from "@material-ui/core";
import doctor_image from "./doctor.jpg";

function Doctors() {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const [doctorDetails, setDoctorDetails] = useState([]);
	useEffect(() => {
		sessionStorage.setItem("lastPage", "/patient/doctors");

		getDoctorDetailsAPI({
			token: auth.token,
		}).then((res) => {
			if (res.reply) {
				console.log(res.doctors);
				setDoctorDetails(res.doctors);
			} else {
				setTimeout(history.push("/patient/doctors"), 0);
			}
		});
	}, []);

	return (
		<div>
			{doctorDetails.map((d) => (
				<div id='card'>
					<Card
						className='doctor'

						// style={{
						// 	width: "18rem",
						// 	margin: "2rem",
						// 	display: "inline-grid",
						// 	backgroundColor: "#5CDB95",
						// }}
					>
						<Card.Body>
							{/* <div style={{ display: "inline" }}>
							<img src={bird} alt='Bird' width='100' height='100' />
						</div> */}

							<Card.Title>
								<span>
									<Card.Img
										as={Image}
										src={doctor_image}
										variant='left'
										width='50'
										roundedCircle
									/>{" "}
								</span>
								<span>{d.first_name + " " + d.last_name}</span>
							</Card.Title>

							<ListGroup
								style={{
									fontSize: "0.8rem",
								}}
							>
								<ListGroupItem>
									<b>Specialization:</b> {"Temp Data"}
								</ListGroupItem>
								<ListGroupItem>
									<b>Qualifications:</b> {"Temp Data"}
								</ListGroupItem>
								<ListGroupItem>
									<b>Contact Details:</b>
									<ListGroup style={{ marginTop: "3%", fontSize: "0.6rem" }}>
										<ListGroupItem>
											<b>Phone Number:</b> {d.phone}
										</ListGroupItem>
										<ListGroupItem>
											<b>Address:</b> {d.address}
										</ListGroupItem>
										<ListGroupItem>
											<b>Email ID:</b> {d.email}
										</ListGroupItem>
									</ListGroup>
								</ListGroupItem>
							</ListGroup>
						</Card.Body>
					</Card>
				</div>
			))}
		</div>
	);
}

export default Doctors;
