import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import "./Signup.css";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";
import "react-datepicker/dist/react-datepicker.css";
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import addDoctorAPI from "../../../api/addDoctorAPI";
import { useSelector } from "react-redux";

function AddDoctor() {
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [dob, setDob] = useState(new Date());
	const [gender, setGender] = useState("PreferNotToSay");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [flag, setFlag] = useState(false);
	const history = useHistory();
	const auth = useSelector((state) => state.auth);

	const validateForm = () => {
		return (
			first_name.length > 0 &&
			email.length > 0 &&
			phone.length === 10 &&
			password.length > 0
		);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (validateForm() && password === confirmPassword) {
			setFlag(false);
			const dobSend = format(dob, "yyyy-MM-dd");
			addDoctorAPI({
				token: auth.token,
				first_name,
				last_name,
				dob: dobSend,
				gender,
				address,
				email,
				phone,
				password,
			}).then((res) => {
				if (res.reply) {
					alert("Doctor Added Successfully!");
					history.push("/home");
				} else {
					alert(res.data.msg);
				}
			});
		} else if (password !== confirmPassword) {
			setFlag(true);
		}
	};

	return (
		<div>
			<div className='Signup'>
				<h3 className='FormHeading'>Enter Details of Doctor</h3>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>First Name</Form.Label>
						<Form.Control
							type='text'
							value={first_name}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							type='text'
							value={last_name}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</Form.Group>

					<Form.Group size='lg' controlId='email'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							autoFocus
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size='lg' controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size='lg' controlId='password'>
						<Form.Label>
							Confirm Password
							{flag ? "*Password and Confirm Password should match" : ""}
						</Form.Label>
						<Form.Control
							type='password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size='lg'>
						<Form.Label>Date Of Birth</Form.Label>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								autoOk
								variant='inline'
								inputVariant='outlined'
								format='dd/MM/yyyy'
								value={dob}
								onChange={(date) => setDob(date)}
								InputAdornmentProps={{ position: "start" }}
							/>
						</MuiPickersUtilsProvider>

						{/* <DatePicker selected={dob} onChange={(date) => setDob(date)} /> */}
					</Form.Group>
					<Form.Group size='lg'>
						<Form.Label>Gender</Form.Label>
						<Form.Control
							as='select'
							custom
							onChange={(e) => setGender(e.target.value)}
						>
							<option value='PreferNotToSay'>Prefer Not To Say</option>
							<option value='Male'>Male</option>
							<option value='Female'>Female</option>
						</Form.Control>
					</Form.Group>
					<Form.Group size='lg'>
						<Form.Label>Address</Form.Label>
						<Form.Control
							type='text'
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size='lg'>
						<Form.Label>Phone</Form.Label>
						<Form.Control
							type='text'
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</Form.Group>
					<Button block size='lg' type='submit' disabled={!validateForm()}>
						Signup
					</Button>
				</Form>
			</div>
		</div>
	);
}

export default AddDoctor;
