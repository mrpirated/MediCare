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
			"SELECT * FROM admin WHERE email = ?",
			email,
			(err, result, fields) => {
				//console.log("jere");
				if (err) {
					return res.status(210).send({
						msg: err,
					});
				}
				console.log(result[0]);
				if (result[0]) {
					bcrypt.compare(password, result[0].password, (bErr, bResult) => {
						//console.log(bErr);
						if (bErr) {
							//console.log(bErr);
							return res.status(209).send({
								msg: "Username or Password is incorrect!",
							});
						}
						//console.log(bResult);
						if (bResult) {
							//console.log(bResult);
							const token = jwt.sign(
								{
									user: {
										admin_id: result[0].admin_id,
										email: result[0].email,
									},
									type: 2,
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
								type: 2,
							});
						}
						return res.status(209).send({
							msg: "Email or password is incorrect!",
						});
					});
				} else {
					return res.status(209).send({
						msg: "Email dosen't exist!",
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
