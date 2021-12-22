import React, { useState, useEffect } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
//import TimePicker from "react-time-picker";
import DateFnsUtils from "@date-io/date-fns";
import { useSelector } from "react-redux";
import moment from "moment";
import setAvailabilityAPI from "../../../api/setAvailabilityAPI";
import {
	KeyboardTimePicker,
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
function Availability() {
	const token = useSelector((state) => state.auth.token);
	const [availDate, setavailDate] = useState(new Date());
	const [start_time, setstart_time] = useState(new Date());
	const [end_time, setend_time] = useState(new Date());

	const onSaveChanges = async () => {
		console.log(start_time);
		console.log(end_time);
		console.log(moment(start_time).format("hh:mm"));

		await setAvailabilityAPI({
			token: token,
			start_time:
				moment(availDate).format("yyyy-MM-DD") +
				" " +
				moment(start_time).format("hh:mm") +
				":00",
			end_time:
				moment(availDate).format("yyyy-MM-DD") +
				" " +
				moment(end_time).format("hh:mm") +
				":00",
		}).then((res) => {
			if (res.reply) {
				alert("Availability is Set Successfully!");
			} else {
				alert(res.data.msg);
			}
		});
		// setavailDate(new Date());
		// setstart_time(new Date());
		// setend_time(new Date());
	};
	return (
		<div className='availability'>
			<h1> Give Availability </h1>
			<Form>
				{/* <Row style={{ margin: "1rem" }}>

                </Row> */}
				<Form.Group className='mb-3'>
					<Form.Label>Select Date</Form.Label>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							//dateFormat='dd-MM-yyyy'
							selected={availDate}
							minDate={new Date()}
							onChange={(date) => setavailDate(date)}
							//className='date-picker'
						/>
					</MuiPickersUtilsProvider>
				</Form.Group>
				<span>
					<Form.Group className='mb-3'>
						<Form.Label>Start Time</Form.Label>
						{"  "}
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardTimePicker
								value={start_time}
								// minTime={new Date()}
								//clearIcon={false}
								onChange={(time) => setstart_time(time)}
							/>
						</MuiPickersUtilsProvider>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>End Time</Form.Label>
						{"  "}

						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardTimePicker
								value={end_time}
								// minTime={new Date()}
								//clearIcon={false}
								onChange={(time) => setend_time(time)}
							/>
						</MuiPickersUtilsProvider>
					</Form.Group>
				</span>
				<div className='text-center' style={{ paddingTop: "2rem" }}>
					<Button
						variant='outline-dark'
						block
						size='sm'
						className='NewCaseButton'
						onClick={onSaveChanges}
					>
						Save Changes
					</Button>
				</div>
			</Form>
		</div>
	);
}

export default Availability;
