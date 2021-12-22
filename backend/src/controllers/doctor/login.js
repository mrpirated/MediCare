import { Router } from "express";
import connection from "../../dbconn/db";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const bcrypt = require("bcrypt");

const login = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res.status(210).send({
			msg: errors,
		});
	}
	try {
		const { email, password } = req.body;
		var q = connection.query(
			"SELECT * FROM doctor WHERE email = ?",
			email,
			(err, result, fields) => {
				//console.log("jere");
				if (err) {
					return res.status(210).send({
						msg: err,
					});
				}

				if (result[0]) {
					bcrypt.compare(password, result[0].password, (bErr, bResult) => {
						if (bErr) {
							return res.status(209).send({
								msg: "Username or Password is incorrect!",
							});
						}

						if (bResult) {
							const token = jwt.sign(
								{
									user: {
										doctor_id: result[0].doctor_id,
										first_name: result[0].first_name,
										last_name: result[0].last_name,
										dob: result[0].dob,
										gender: result[0].gender,
										address: result[0].address,
										email: result[0].email,
										phone: result[0].phone,
									},
									type: 1,
									//password: result[0].password,
								},
								process.env.SECRET_KEY,
								{
									expiresIn: "30d",
								}
							);

							return res.status(200).send({
								msg: "Logged in!",
								token,
								user: result[0],
								type: 1,
							});
						}
						return res.status(209).send({
							msg: "Username or password is incorrect!",
						});
					});
				} else {
					return res.status(209).send({
						msg: "Username or password is incorrect!",
					});
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

export default login;
