import { Router } from "express";
const router = Router();
import dotenv from "dotenv";
dotenv.config();
import {
	MyAppointment,
	NewAppointment,
	NewCase,
	AllAppointments
} from "../../controllers/patient/appointment";

router.get("/myappointment", MyAppointment);
router.get("/allappointments", AllAppointments);
router.post("/newappointment", NewAppointment);
router.post("/newcase", NewCase);
export default router;
