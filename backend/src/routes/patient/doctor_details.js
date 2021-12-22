import { Router } from "express";
const router = Router();
import dotenv from "dotenv";
dotenv.config();
import doctor_details from "../../controllers/patient/doctor_details";

router.get("/doctor_details", doctor_details);

export default router;