import connection from "../../dbconn/db";
import dotenv from "dotenv";

dotenv.config();

import checkToken from "../../checkToken";

const doctor_details = async (req, res) => {
    try {
        const decodedData = checkToken(req.query.token);
		if (decodedData == undefined) {
			return res.status(209).send({
				msg: "Token Is Invalid. No such User found.",
			});
		} else{
            var q = connection.query(
                "SELECT doctor_id, first_name, last_name, dob, gender, address, email, phone FROM doctor",
                (err, result, fields) => {
                    if(err){
                        return res.status(210).send({
							msg: err,
						});
                    }

                    return res.status(200).send({
						msg: "Successfully returned Doctors!",
						doctors: result,
					});
                }
            )
        }
    } catch (error){
        console.log(error);
		return res.status(210).send({
			msg: error,
		});
    }
} 

export default doctor_details;