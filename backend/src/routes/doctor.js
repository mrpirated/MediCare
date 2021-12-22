import { Router } from "express";
const router = Router();
import login from "./doctor/login";
import signup from "./doctor/signup";
router.use("/doctor", login, signup);

export default router;
