import connection from "../../dbconn/db";
import dotenv from "dotenv";

dotenv.config();

import checkToken from "../../checkToken";

export const get_doctor_schedule = async (req, res) => {
	try {
		const decodedData = checkToken(req.body.token);
		//console.log(decodedData);
		if (decodedData == undefined) {
			return res.status(209).send({
				msg: "Token Is Invalid. No such User found.",
			});
		} else {
			// if(decodedData.type!=2){
			//     return res.status(209).send({
			//         msg:"Not authorized"
			//     })
			// }
			var q = connection.query(
				"SELECT start_time, end_time FROM schedule WHERE doctor_id = ?",
				[decodedData.doctor_id],
				(err, result, fields) => {
					if (err) {
						return res.status(210).send({
							msg: err,
						});
					} else {
						return res.status(200).send({
							msg: "Successfully returned Schedule!",
							schedule: result,
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

export const post_doctor_schedule = async (req, res) => {
	try {
		const decodedData = checkToken(req.body.token);
		if (decodedData == undefined) {
			return res.status(209).send({
				msg: "Token Is Invalid. No such User found.",
			});
		} else {
			// console.log(req.body.doctor_id);
			// console.log(req.body.schedule_date);
			// console.log(req.body.schedule[0].start_time);
			//console.log(req.body.schedule.length);
			var record = [];
			for (let index = 0; index < req.body.schedule.length; index++) {
				var start_time =
					String(req.body.schedule_date) +
					" " +
					String(req.body.schedule[index].start_time);
				var end_time =
					String(req.body.schedule_date) +
					" " +
					String(req.body.schedule[index].end_time);
				record.push([req.body.doctor_id, start_time, end_time]);
			}

			var q = connection.query(
				"INSERT INTO schedule (doctor_id, start_time, end_time) VALUES ?",
				[record],
				(err, result, fields) => {
					if (err) {
						return res.status(210).send({
							msg: err,
						});
					} else {
						return res.status(200).send({
							msg: "Schedule Added Successfully!",
						});
					}
				}
			);
			console.log(record);
		}
	} catch (error) {
		console.log(error);
		return res.status(210).send({
			msg: error,
		});
	}
};
