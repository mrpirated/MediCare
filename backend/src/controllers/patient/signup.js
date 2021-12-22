import { Router } from "express";
import connection from "../../dbconn/db";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import dbg from "debug";
dotenv.config();
const bcrypt = require("bcrypt");
const client = require("twilio")(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN
);

const debug = dbg("api:patient/signup");
export const signup = async (req, res) => {
	try {
		console.log("called");
		client.verify
			.services(process.env.TWILIO_SERVICE_ID)
			.verifications.create({
				to: req.body.phone,
				channel: "sms",
			})
			.then((data) =>
				res.status(200).send({
					msg: data,
				})
			);
	} catch {
		console.log(error);
		return res.status(210).send({
			msg: error,
		});
	}
};

export const verify = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res.status(210).send({
			msg: errors,
		});
	}
	try {
		client.verify
			.services(process.env.TWILIO_SERVICE_ID)
			.verificationChecks.create({
				to: req.body.phone,
				code: req.body.code,
			})
			.then((data) => {
				if (data.status === "approved") {
					var value = {
						first_name: req.body.first_name,
						last_name: req.body.last_name,
						dob: req.body.dob,
						gender: req.body.gender,
						address: req.body.address,
						email: req.body.email,
						phone: req.body.phone,
						password: req.body.password,
					};

					connection.query(
						"SELECT * FROM patient WHERE email = ?",
						value.email,
						async (err, result) => {
							if (result[0]) {
								return res.status(209).send({
									msg: "This username is already in use!",
								});
							} else {
								value.password = await bcrypt.hash(req.body.password, 10);

								debug(value);
								var patient_id;
								var q = connection.query(
									"INSERT INTO patient SET ?",
									value,
									(err, result, fields) => {
										if (err) {
											debug(err);
											return res.status(210).send({
												msg: err,
											});
										}
										return res.status(200).send({
											msg: "Registered!",
										});
									}
								);
							}
						}
					);
				} else {
					res.status(204).send({
						msg: "Code is incorrect.",
					});
				}
			});
	} catch {
		console.log(error);
		return res.status(210).send({
			msg: error,
		});
	}
};
