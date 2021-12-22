// import axios from "axios";
// import store from "../store/configureStore";
// import config from "../config/config";
// import { loggedIn } from "../store/auth";

// const loginDoctorAPI = (data) => {
// 	const { email, password } = data;
// 	return axios
// 		.post(config.baseUrl + config.login_doctor, {
// 			email: email,
// 			password: password,
// 		})
// 		.then((res) => {
// 			if (res.status === 200) {
// 				console.log(res.data);
// 				store.dispatch(
// 					loggedIn({
// 						user: res.data.user,
// 						token: res.data.token,
// 						type: 1,
// 					})
// 				);
// 				return true;
// 			}
// 			if (res.status === 209) {
// 				console.log(res.data.msg);
// 			}
// 		})
// 		.catch();
// };
// export default loginDoctorAPI;
