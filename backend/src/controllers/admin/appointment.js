import connection from "../../dbconn/db";
import checkToken from "../../checkToken";

const appointment = async (req, res) => {
	try {
		const decodedData = checkToken(req.body.token);
		if (!decodedData || decodedData.type != 2) {
			if (!decodedData) {
				return res.status(210).send({
					msg: "Token is invalid",
				});
			}
			return res.status(209).send({
				msg: "Not authorized!!",
			});
		} else {
			const mtl = await zoommeeting();
			var values = [
				req.body.start_time,
				req.body.end_time,
				mtl.join_url,
				req.body.appointment_id,
			];
			console.log(values);
			connection.query(
				"UPDATE appointment SET start_time=?,end_time=?,meeting_link=? WHERE appointment_id=?",
				values,
				(err, result, fields) => {
					if (err) {
						console.log(err);
						return res.status(209).send({
							msg: err,
						});
					} else {
						return res.status(200).send(result);
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
export default appointment;
