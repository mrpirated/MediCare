import axios from "axios";
import config from "../config/config";

const adminDoctorScheduleAPI = async (data) => {
	const { doctor_id, token } = data;
	return await axios
		.get(
			config.baseUrl +
				config.admin +
				config.schedule +
				"?token=" +
				token +
				"&doctor_id=" +
				doctor_id
		)
		.then((res) => {
			console.log(res.data);
			if (res.status === 200) {
				console.log(res.data);
				return {
					reply: true,
					schedule: res.data.schedule,
				};
			} else
				return {
					reply: false,
					msg: res.data,
				};
		})
		.catch((err) => {
			return {
				reply: false,
				msg: err,
			};
		});
};
export default adminDoctorScheduleAPI;
