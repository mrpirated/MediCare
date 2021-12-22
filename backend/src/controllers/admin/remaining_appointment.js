import connection from "../../dbconn/db";
import checkToken from "../../checkToken";
const remaining_appointment = async (req, res) => {
	try {
		//console.log(req.query);
		const decodedData = checkToken(req.query.token);
		//console.log(req.params.token);
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
			connection.query(
				'SELECT\
				a.appointment_id,\
				a.case_id,\
				p.patient_id,\
				CONCAT(p.first_name, " ", p.last_name) AS patient_name,\
				a.doctor_id,\
				CONCAT(d.first_name, " ", d.last_name) AS doctor_name\
			  FROM\
				appointment a\
				LEFT JOIN cases c ON a.case_id = c.case_id\
				LEFT JOIN patient p ON c.patient_id = p.patient_id\
				LEFT JOIN doctor d ON a.doctor_id = d.doctor_id\
			  WHERE\
				a.start_time IS NULL\
				AND a.end_time IS NULL',
				(err, result, fields) => {
					if (err) {
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
		//console.log(error);
		return res.status(210).send({
			msg: error,
		});
	}
};

export default remaining_appointment;
