import { Router } from "express";
const router = Router();
import dotenv from "dotenv";
dotenv.config();
import appointment from "../../controllers/admin/appointment";
router.post("/appointment", appointment);
export default router;
