import React, { useState } from "react";
import { Form, Row, Col, Modal, Button } from "react-bootstrap";
import signupAPI from "../../../api/signupAPI";
import verifyAPI from "../../../api/verifyAPI";
import { useHistory } from "react-router";
import DatePicker from "react-datepicker";
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";
import "react-datepicker/dist/react-datepicker.css";
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Navigation from "../../Navigation";
function Signup(props) {
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [dob, setDob] = useState(new Date());
	const [gender, setGender] = useState("PreferNotToSay");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [code, setCode] = useState("");
	const [openPopup, setopenPopup] = useState(props.openPopup);
	const handleClose = () => setopenPopup(false);
	const handleShow = () => setopenPopup(true);

	const history = useHistory();
	const validateForm = () => {
		return first_name.length > 0 && email.length > 0 && password.length > 0;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// setopenPopup(true);
		// console.log("true");
		if (validateForm() && password === confirmPassword) {
			const dobSend = format(dob, "yyyy-MM-dd");
			signupAPI({
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
					setopenPopup(true);
					// history.push("/home");
				} else {
					alert(res.data.msg);
				}
			});
		} else if (password !== confirmPassword) {
			alert("Password and Confirm Password should match.");
		}
	};

	const handleOTPSubmit = (event) => {
		event.preventDefault();
		// setopenPopup(true);
		// console.log("true");
		if (validateForm() && password === confirmPassword) {
			const dobSend = format(dob, "yyyy-MM-dd");
			verifyAPI({
				first_name,
				last_name,
				dob: dobSend,
				gender,
				address,
				email,
				phone,
				password,
				code,
			}).then((res) => {
				if (res.reply) {
					if (res.status === 200) {
						setopenPopup(false);
						alert("Registered Successfully!");
						history.push("/login");
					} else {
						alert("Please check your OTP and phone number.");
					}
				} else {
					alert(res.data.msg);
				}
			});
		} else if (password !== confirmPassword) {
			alert("Password and Confirm Password should match.");
		}
	};

	return (
		<div>
			<Navigation />
			<div>
				<Form onSubmit={handleSubmit} className='signup'>
					<div id='signupform'>
						<h2 id='headerTitle'>Signup</h2>
						<div>
							<div style={{ width: "100%", overflow: "hidden" }}>
								<div className='row' style={{ width: "50%", float: "left" }}>
									<label>First Name</label>
									<input
										type='text'
										value={first_name}
										// placeholder="Enter your First Name"
										onChange={(e) => setFirstName(e.target.value)}
									/>
								</div>
								<div className='row' style={{ float: "right", width: "50%" }}>
									<label>Last Name</label>
									<input
										// placeholder="Enter your Last Name"
										type='text'
										value={last_name}
										onChange={(e) => setLastName(e.target.value)}
									/>
								</div>
							</div>
							<div className='row'>
								<label>Phone Number</label>
								<PhoneInput
									// placeholder="Enter phone number"
									defaultCountry='IN'
									value={phone}
									style={{ width: "85%" }}
									onChange={setPhone}
								/>
							</div>
							<div className='row'>
								<label>Email</label>
								<input
									// placeholder="Enter your Last Name"

									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className='row'>
								<label>Password</label>
								<input
									// placeholder="Enter your Last Name"
									type='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className='row'>
								<label>Confirm Password</label>
								<input
									// placeholder="Enter your Last Name"
									type='password'
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
							</div>
							<div className='row'>
								<label>Date Of Birth</label>
							</div>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									style={{ width: "73%", alignItems: "center" }}
									autoOk
									variant='inline'
									inputVariant='outlined'
									format='dd/MM/yyyy'
									value={dob}
									onChange={(date) => setDob(date)}
									InputAdornmentProps={{ position: "start" }}
								/>
							</MuiPickersUtilsProvider>
							<div className='row'>
								<label>Gender</label>
								<Form.Control
									as='select'
									custom
									onChange={(e) => setGender(e.target.value)}
									style={{ width: "80%" }}
								>
									<option value='PreferNotToSay'>Prefer Not To Say</option>
									<option value='Male'>Male</option>
									<option value='Female'>Female</option>
								</Form.Control>
							</div>
							<div className='row'>
								<label>Address</label>
								<input
									// placeholder="Enter your Last Name"
									type='text'
									value={address}
									onChange={(e) => setAddress(e.target.value)}
								/>
							</div>
							<div id='button' class='row'>
								<button
									style={{ width: "45%", fontSize: "15px" }}
									type='submit'
									disabled={!validateForm()}
								>
									Get OTP
								</button>
							</div>
							<Modal show={openPopup} onHide={handleClose}>
								<Modal.Header closeButton className='modal-header'>
									<Modal.Body className='modal-body'>
										<div className='row'>
											<label style={{ color: "black", fontSize: "30px" }}>
												Enter OTP
											</label>
											<input
												type='text'
												value={code}
												onChange={(e) => setCode(e.target.value)}
											/>
										</div>
										<div className='row'>
											<label style={{ color: "black" }}>
												OTP sent to phone number {phone}
											</label>
										</div>
										<div id='button' class='row'>
											<button
												style={{ width: "45%", fontSize: "15px" }}
												onClick={handleOTPSubmit}
											>
												Submit
											</button>
										</div>
									</Modal.Body>
								</Modal.Header>
							</Modal>
							{/* <Button block size='lg' type='submit' disabled={!validateForm()}>
								Submit
							</Button> */}
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default Signup;
