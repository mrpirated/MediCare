import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import "./NewCase.css";
import newCaseAPI from "../../../api/newCaseAPI";

export default function NewCase() {
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const [case_description, setCase_description] = useState("");
	function handleSubmit(event) {
		event.preventDefault();
		console.log(case_description);
		newCaseAPI({
			token: auth.token,
			case_description: case_description,
		}).then((res) => {
			if (res.reply) {
				const case_id = res.data.case_id;
				history.push("/patient/new-appointment", { case_details: { case_id } });
			} else {
				alert(res.data.msg);
			}
		});
	}

	return (
		<div>
			<div className='NewCase'>
				<h3 className='FormHeading'>Enter Details For New Case</h3>
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mb-3'>
						<Form.Label>Case Description</Form.Label>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Enter case details in short'
							onChange={(e) => setCase_description(e.target.value)}
						/>
					</Form.Group>

					<div className='text-center' style={{ paddingTop: "2rem" }}>
						<Button
							variant='outline-dark'
							block
							size='sm'
							className='NewCaseButton'
							type='submit'
						>
							Create Case And Book An Appointment
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
}
