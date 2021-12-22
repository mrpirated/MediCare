import { Router } from "express";
const router = Router();
import login from "./login";
import signup from "./signup";
import schedule from "./schedule";
import appointment from "./appointment";

router.use("/doctor", login, signup, schedule, appointment);

export default router;
