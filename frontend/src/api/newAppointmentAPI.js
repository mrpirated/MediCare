import axios from "axios";
import config from "../config/config";

const newAppointmentAPI = async (data) => {
	const { token, case_id, doctor_id, preferred_date } = data;

	return await axios
		.post(config.baseUrl + config.patient + config.newappointment, {
			token: token,
			case_id: case_id,
			doctor_id: doctor_id,
			preferred_date: preferred_date,
		})
		.then((res) => {
			if (res.status === 200) {
				console.log(res.data);
				//return res.data;
				return {
					reply: true,
					data: res.data,
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
		.catch();
};

export default newAppointmentAPI;
