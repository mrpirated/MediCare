import axios from "axios";
import config from "../config/config";

const remaining_appointmentAPI = async (token) => {
	//const token = useSelector((state) => state.auth.token);
	return await axios
		.get(
			config.baseUrl +
				config.admin +
				config.remaining_appointment +
				"?token=" +
				token
		)
		.then((res) => {
			if (res.status === 200) {
				//console.log(res.data);
				return res.data;
			} else return false;
		})
		.catch();
};

export default remaining_appointmentAPI;
