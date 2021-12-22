import connection from "../../dbconn/db";
import dotenv, { parse } from "dotenv";
import { parseDateArray, getAvailableTime } from "../helpers";
dotenv.config();

import checkToken from "../../checkToken";

export const get_doctor_schedule = async (req, res) => {
	try {
		//console.log(req.query);
		//console.log(req);
		const decodedData = checkToken(req.query.token);
		//console.log(decodedData);
		if (decodedData == undefined) {
			return res.status(209).send({
				msg: "Token Is Invalid. No such User found.",
			});
		} else {
			if (decodedData.type != 2) {
				return res.status(209).send({
					msg: "Not authorized",
				});
			}
			var sch;
			var q = connection.query(
				"SELECT \
				start_time, \
				end_time \
			  	FROM \
				schedule \
			 	WHERE \
				doctor_id = ? \
				AND start_time > NOW()\
				ORDER BY start_time",
				[req.query.doctor_id],
				(err, result, fields) => {
					if (err) {
						return res.status(210).send({
							msg: err,
						});
					} else {
						sch = result;
						//console.log(sch);
						var app = connection.query(
							"SELECT \
							start_time, \
							end_time \
						  	FROM \
							appointment \
						 	WHERE \
							doctor_id = ? \
							AND start_time > NOW()\
							ORDER BY start_time",
							[req.query.doctor_id],
							(err, result, fields) => {
								//console.log(result);
								if (err) {
									return res.status(210).send({
										msg: err,
									});
								} else {
									return res.status(200).send({
										msg: "Successfully returned Schedule!",
										schedule: getAvailableTime(sch, result),
									});
								}
							}
						);
						//console.log(app);
						// return res.status(200).send({
						// 	msg: "Successfully returned Schedule!",
						// 	schedule: result,
						// });
					}
				}
			);
			//console.log(sch);
		}
	} catch (error) {
		console.log(error);
		return res.status(210).send({
			msg: error,
		});
	}
};
