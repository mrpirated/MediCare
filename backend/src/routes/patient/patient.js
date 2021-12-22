import { Router } from "express";
const router = Router();
import login from "./login";
import signup from "./signup";
import appointment from "./appointment";
import cases from "./cases";
import doctor_details from "./doctor_details";
router.use("/patient", login, signup, appointment, cases, doctor_details);

export default router;
