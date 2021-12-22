import axios from "axios";
import config from "../config/config";

const getDoctorDetailsAPI = async (data) => {
	const { token } = data;

	return await axios
		.get(
			config.baseUrl +
				config.patient +
				config.doctor_details +
				"?" +
				"token=" +
				token
		)
		.then((res) => {
			if (res.status === 200) {
				console.log(res.data.msg);
				//console.log(res.data.cases);
				return {
					reply: true,
					doctors: res.data.doctors,
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
		});
};

export default getDoctorDetailsAPI;
