import { Router } from "express";
const router = Router();
import dotenv from "dotenv";
dotenv.config();
import {
	get_doctor_schedule,
	post_doctor_schedule,
} from "../../controllers/doctor/schedule";

router.get("/schedule", get_doctor_schedule);
router.post("/schedule", post_doctor_schedule);

export default router;
