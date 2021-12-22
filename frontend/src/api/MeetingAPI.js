import axios from "axios";
import config from "../config/config";

const MeetingAPI = async (data) => {
	return await axios
		.post(config.baseUrl + config.admin + config.meeting, data)
		.then((res) => {
			const url =
				res.data.join_url.replaceAll(
					"https://us04web.zoom.us/j/",
					"http://localhost:9996/?"
				) + `?role=1?name=${username}`;

			console.log(url);
			return url;
		});
};
export default MeetingAPI;
