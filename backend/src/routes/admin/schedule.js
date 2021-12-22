import { Router } from "express";
const router = Router();
import dotenv from "dotenv";
dotenv.config();
import { get_doctor_schedule } from "../../controllers/admin/schedule";
import remaining_appointment from "../../controllers/admin/remaining_appointment";
router.get("/schedule", get_doctor_schedule);
router.get("/remaining_appointment", remaining_appointment);
export default router;
