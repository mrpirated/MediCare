import axios from "axios";
import config from "../config/config";

const patientMyAppointmentAPI = async (data) => {
	const { token, case_id } = data;
	//console.log(token);
	return await axios
		.get(
			config.baseUrl +
				config.patient +
				config.myappointment +
				"?" +
				"token=" +
				token +
				"&&" +
				"case_id=" +
				case_id,
			{
				token: token,
				case_id: case_id,
			}
		)
		.then((res) => {
			if (res.status === 200) {
				console.log(res.data.msg);
				//console.log(res.data.cases);
				return {
					reply: true,
					appointments: res.data.appointments,
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
export default patientMyAppointmentAPI;
