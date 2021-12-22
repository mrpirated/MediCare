import { Router } from "express";
const router = Router();
import login from "./patient/login";
import signup from "./patient/signup";
router.use("/patient", login, signup);

export default router;
