import connection from "../../dbconn/db";
import dotenv from "dotenv";
import moment from "moment-timezone";
import { scheduleAppointment } from "../helpers";
dotenv.config();

import checkToken from "../../checkToken";
export const MyAppointment = async (req, res) => {
	try {
		//console.log(req.query.token, req.query.case_id);
		const decodedData = checkToken(req.query.token);
		if (decodedData == undefined) {
			return res.status(209).send({
				msg: "Token Is Invalid. No such User found.",
			});
		} else {
			const user = decodedData.user;
			console.log(user.patient_id, req.body.case_id);
			var q = connection.query(
				"SELECT case_id FROM cases WHERE patient_id = ? AND case_id = ?",
				[user.patient_id, req.query.case_id],
				(err, result, fields) => {
					//console.log("HELLO" + result);
					//console.log(result);
					if (err) {
						return res.status(210).send({
							msg: err,
						});
					} else if (result.length) {
						var q1 = connection.query(
							'SELECT\
							a.appointment_id,\
							a.case_id,\
							a.doctor_id,\
							CONCAT(d.first_name," ", d.last_name) AS doctor_name,\
							a.end_time,\
							a.meeting_link,\
							a.start_time\
						  FROM\
							appointment a\
							JOIN doctor d ON a.doctor_id = d.doctor_id\
						  WHERE\
							a.case_id = ?\
						  ORDER BY\
							start_time DESC',
							req.query.case_id,
							(err, result, fields) => {
								if (err) {
									return res.status(210).send({
										msg: err,
									});
								}
								return res.status(200).send({
									msg: "Successfully returned Appointments!",
									appointments: result,
								});
							}
						);
					} else {
						return res.status(209).send({
							msg: "No Appointments found against this Case.",
						});
					}
				}
			);
		}
	} catch (error) {
		console.log(error);
		return res.status(210).send({
			msg: error,
		});
	}
};
export const NewAppointment = async (req, res) => {
	try {
		const decodedData = checkToken(req.body.token);
		if (!decodedData || decodedData.type != 0) {
			if (!decodedData) {
				return res.status(210).send({
					msg: "Token is invalid",
				});
			}
			return res.status(209).send({
				msg: "Not authorized!!",
			});
		} else {
			var sch;
			connection.query(
				"SELECT \
				start_time, \
				end_time \
				FROM \
				schedule \
				WHERE \
				doctor_id = ? \
				AND end_time > ?\
				ORDER BY start_time",
				[req.body.doctor_id, req.body.preferred_date],
				(err, result, query) => {
					if (err) {
						return res.status(210).send({
							msg: err,
						});
					} else {
						sch = result;
						connection.query(
							"SELECT \
							start_time, \
							end_time \
							FROM \
							appointment \
							WHERE \
							doctor_id = ? \
							AND end_time >?\
							ORDER BY start_time",
							[req.body.doctor_id, req.body.preferred_date],
							(err, result, query) => {
								if (err) {
									return res.status(210).send({
										msg: err,
									});
								} else {
									// console.log(sch);
									// console.log(result);
									var appointment = scheduleAppointment(
										sch,
										result,
										30 * 60 * 1000
									);
									//console.log(appointment);
									const values = {
										case_id: req.body.case_id,

										start_time: appointment.start_time
											? moment(appointment.start_time).format(
													"YYYY-MM-DD HH:mm:ss"
											  )
											: null,
										end_time: appointment.end_time
											? moment(appointment.end_time).format(
													"YYYY-MM-DD HH:mm:ss"
											  )
											: null,
										doctor_id: req.body.doctor_id,
										preferred_date: req.body.preferred_date,
									};
									//console.log(values);
									connection.query(
										"INSERT INTO appointment SET ?",
										values,
										(err, result, query) => {
											if (err) {
												console.log(err);
												return res.status(210).send({
													msg: err,
												});
											} else {
												return res.status(200).send({
													msg: "Appointment saved successfuly",
													appointment: {
														start_time: values.start_time,
														end_time: values.end_time,
													},
												});
											}
										}
									);
									// return res.status(200).send({
									// 	msg: "Successfully returned Schedule!",

									// })
								}
							}
						);
					}
				}
			);
		}
	} catch (error) {
		console.log(error);
		return res.status(210).send({
			msg: error,
		});
	}
};

export const NewCase = async (req, res) => {
	try {
		const decodedData = checkToken(req.body.token);
		if (!decodedData || decodedData.type != 0) {
			if (!decodedData) {
				return res.status(210).send({
					msg: "Token is invalid",
				});
			}
			return res.status(209).send({
				msg: "Not authorized!!",
			});
		} else {
			var values = {
				patient_id: decodedData.user.patient_id,
			};
			console.log(values);
			connection.query(
				"INSERT INTO cases SET ?",
				values,
				(err, result, fields) => {
					if (err) {
						return res.status(210).send({
							msg: err,
						});
					} else {
						console.log(result);
						return res.status(200).send({
							msg: "Entered",
							case_id: result.insertId,
						});
					}
				}
			);
		}
	} catch (error) {
		console.log(error);
		return res.status(210).send({
			msg: error,
		});
	}
};

export const AllAppointments = async (req, res) => {
	try {
		const decodedData = checkToken(req.query.token);
		if (!decodedData || decodedData.type != 0) {
			if (!decodedData) {
				return res.status(210).send({
					msg: "Token is invalid",
				});
			}
			return res.status(209).send({
				msg: "Not authorized!!",
			});
		} else {
			connection.query(
				'SELECT\
				a.*,\
				c.*,\
				CONCAT(d.first_name, " ", d.last_name) AS doctor_name,\
				d.phone\
			  	FROM\
				appointment a\
				JOIN cases c ON a.case_id = c.case_id\
				JOIN doctor d ON a.doctor_id = d.doctor_id\
			  	WHERE c.patient_id=?\
			  	ORDER BY\
				start_time DESC',
				decodedData.user.patient_id,
				(err, result, fields) => {
					if (err) {
						return res.status(210).send({
							msg: err,
						});
					} else {
						//console.log(result);
						return res.status(200).send({
							msg: "Entered",
							appointments: result,
						});
					}
				}
			);
		}
	} catch (error) {
		console.log(error);
		return res.status(210).send({
			msg: error,
		});
	}
};
