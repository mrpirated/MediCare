import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const checkToken = (token) => {
	//console.log(token);
	const user = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
		if (err) {
			return false;
		}
		//console.log(decoded);
		return decoded;
	});

	if (!user) {
		return undefined;
	} else return user;
};

export default checkToken;
