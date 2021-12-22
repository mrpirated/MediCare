import { Router } from "express";
const router = Router();
import login from "./login";
import signup from "./signup";
import schedule from "./schedule";
import appointment from "./appointment";
import add_doctor from "./add_doctor";

router.use(
	"/admin",
	login,
	signup,
	schedule,

	appointment,
	add_doctor
);

export default router;
