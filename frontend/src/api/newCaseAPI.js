import axios from "axios";
import config from "../config/config";

const newCaseAPI = async (data) => {
	const { token, case_description } = data;

	return await axios
		.post(config.baseUrl + config.patient + config.newcase, {
			token: token,
			case_description: case_description,
		})
		.then((res) => {
			if (res.status === 200) {
				//console.log(res.data);
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

export default newCaseAPI;
