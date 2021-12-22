import { Router } from "express";
import connection from "../../dbconn/db";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res.status(210).send({
			msg: errors,
		});
	}
	try {
		var value = {
			email: req.body.email,
			password: req.body.password,
		};

		connection.query(
			"SELECT * FROM admin WHERE email = ?",
			value.email,
			async (err, result) => {
				if (result[0]) {
					return res.status(209).send({
						msg: "This username is already in use!",
					});
				} else {
					value.password = await bcrypt.hash(req.body.password, 10);

					//console.log(value.password);
					var patient_id;
					var q = connection.query(
						"INSERT INTO admin SET ?",
						value,
						(err, result, fields) => {
							if (err) {
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
	} catch (error) {
		console.log(error);
		return res.status(210).send({
			msg: error,
		});
	}
};

export default signup;
