import { Router } from "express";
const router = Router();
import dotenv from "dotenv";
dotenv.config();
import {
	appointment,
	setAvailability,
} from "../../controllers/doctor/appointment";

router.get("/appointment", appointment);
router.post("/setavailability", setAvailability);

export default router;
