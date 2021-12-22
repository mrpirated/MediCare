import { Router } from "express";
const router = Router();
import dotenv from "dotenv";
dotenv.config();
import cases from "../../controllers/patient/cases";

router.get("/cases", cases);

export default router;
