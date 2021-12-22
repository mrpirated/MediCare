import React, {useEffect, useState} from "react";
import getDoctorDetailsAPI from "../../../api/getDoctorDetailsAPI";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { requirePropFactory } from "@material-ui/core";
import bird from './download.jpeg';

function Doctors() {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const [doctorDetails, setDoctorDetails] = useState([]);
	useEffect(() => {
		sessionStorage.setItem("lastPage", "/admin/doctors");
		getDoctorDetailsAPI({
			token: auth.token
		}).then((res) => {
			if (res.reply) {
				console.log(res.doctors);
				setDoctorDetails(res.doctors);
			} else {
				setTimeout(history.push("/admin/doctors"), 0);
			}
		})
	}, []);

	return (
		<div style={{margin: "2rem"}}>
			{doctorDetails.map((d) => (
				<Card
					className='Appointment-AddCard'
					bg='dark'
					text='white'
					style={{ width: "20%", margin: "2rem", display: "inline-grid" }}
				>
					<Card.Body>
						<img src={bird} alt="Bird"/>
						<Card.Title><b>Doctor Name:</b> {d.first_name + " " + d.last_name}</Card.Title>
						<ListGroup>
							<ListGroupItem><b>Specialization:</b> {"Temp Data"}</ListGroupItem>
							<ListGroupItem><b>Qualifications:</b> {"Temp Data"}</ListGroupItem>
							<ListGroupItem>
								<b>Contact Details:</b>
								<ListGroup style={{marginTop:"3%", fontSize: "0.8rem"}}>
									<ListGroupItem><b>Phone Number:</b> {d.phone}</ListGroupItem>
									<ListGroupItem><b>Address:</b> {d.address}</ListGroupItem>
									<ListGroupItem><b>Email ID:</b> {d.email}</ListGroupItem>
								</ListGroup>
							</ListGroupItem>
						</ListGroup>
					</Card.Body>
				</Card>
			))}
		</div>
	);
}

export default Doctors;
