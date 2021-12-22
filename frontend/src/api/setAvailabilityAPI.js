import axios from "axios";
import config from "../config/config";

const setAvailabilityAPI = async (data) => {
	const { token, start_time, end_time } = data;
	console.log(data);
	return await axios
		.post(config.baseUrl + config.doctor + config.setavailability, {
			token: token,
			start_time: start_time,
			end_time: end_time,
		})
		.then((res) => {
			console.log(res.data);
			if ((res.status = 200)) {
				return {
					reply: true,
					msg: res.data,
				};
			} else console.log(res.data);
			return {
				reply: false,
				msg: "failed",
			};
		});
};
export default setAvailabilityAPI;
