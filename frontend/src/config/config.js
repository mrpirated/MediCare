import dotenv from "dotenv";
dotenv.config();

console.log(process.env);
const config = {
	baseUrl: process.env.REACT_APP_BASE_URL,
	token: "/api/token",
	doctor: "/api/doctor",
	patient: "/api/patient",
	admin: "/api/admin",
	login: "/login",
	signup: "/signup",
	remaining_appointment: "/remaining_appointment",
	cases: "/cases",
	myappointment: "/myappointment",
	newcase: "/newcase",
	newappointment: "/newappointment",
	schedule: "/schedule",
	appointment: "/appointment",
	allappointments: "/allappointments",
	setavailability: "/setavailability",
	doctor_details: "/doctor_details",
	meeting: "/newmeeting",
	video_token: "/api/video/token",
	add_doctor: "/add_doctor",
	verify: "/verify",
};
export default config;
