import connection from "../../dbconn/db";
import dotenv from "dotenv";
dotenv.config();
import checkToken from "../../checkToken";

const cases = async (req, res) => {
	try {
		//console.log(req.query.token);
		const decodedData = checkToken(req.query.token);
		//console.log(decodedData);
		if (decodedData == undefined) {
			return res.status(209).send({
				msg: "Token Is Invalid. No such User found.",
			});
		} else {
			const user = decodedData.user;
			//console.log(user.patient_id);
			var q = connection.query(
				"SELECT c.case_id,\
				c.case_description\
				FROM cases c\
				LEFT JOIN appointment a\
				ON c.case_id = a.case_id \
				WHERE c.patient_id = ? \
				GROUP BY c.case_id ORDER \
				BY a.start_time DESC",
				user.patient_id,
				(err, result, fields) => {
					if (err) {
						return res.status(210).send({
							msg: err,
						});
					}

					return res.status(200).send({
						msg: "Successfully returned Cases!",
						cases: result,
					});
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
export default cases;
