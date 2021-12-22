import axios from "axios";
import config from "../config/config";
// import loginAPI from "./loginAPI";

const verifyAPI = async (data) => {
	const {
		first_name,
		last_name,
		dob,
		gender,
		address,
		email,
		phone,
		password,
		code,
	} = data;
	return await axios
		.post(config.baseUrl + config.patient + config.verify, {
			first_name,
			last_name,
			dob,
			gender,
			address,
			email,
			phone,
			password,
			code,
		})
		.then((res) => {
			if (res.status === 200 || res.status === 204) {
				//return loginAPI({ email, password });
				return {
					reply: true,
					status: res.status,
					data: res.data.msg,
				};
			} else if (res.status === 210) {
				console.log(res.data.msg);
				return {
					reply: false,
					data: res.data,
				};
			} else {
				console.log(res.data.msg);
				return {
					reply: false,
					data: res.data,
				};
			}
		})
		.catch((err) => {
			//console.log("Error Occured in Signup");
		});
};

export default verifyAPI;
