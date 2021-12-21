import connection from "../../dbconn/db";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbg from "debug";
const debug = dbg("api:/patient/login");
const login = (req, res) => {
	//debug("here");
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		debug(errors);
		return res.status(210).send({
			msg: errors,
		});
	}
	try {
		const { email, password } = req.body;
		var q = connection.query(
			"SELECT * FROM patient WHERE email = ?",
			email,
			(err, result, fields) => {
				//console.log("jere");
				if (err) {
					debug(err.message);
					return res.status(401).send({
						msg: err,
					});
				}

				if (result[0]) {
					//console.log(result[0]);
					bcrypt.compare(password, result[0].password, (bErr, bResult) => {
						if (bErr) {
							return res.status(401).send({
								msg: "Password is incorrect!",
							});
						}

						if (bResult) {
							const token = jwt.sign(
								{
									user_id: result[0].patient_id,
									type: 0,
									//password: result[0].password,
								},
								process.env.SECRET_KEY,
								{
									expiresIn: "30d",
								}
							);
							//console.log(token);
							return res.status(200).send({
								msg: "Logged in!",
								token,
							});
						}
						return res.status(401).send({
							msg: "Username or password is incorrect!",
						});
					});
				} else {
					return res.status(401).send({
						msg: "Username not found",
					});
				}
			}
		);
	} catch (error) {
		debug(error);
		return res.status(401).send({
			msg: error,
		});
	}
};
export default login;
