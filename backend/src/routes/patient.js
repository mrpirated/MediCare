import { Router } from "express";
const router = Router();
import login from "./patient/login";
router.use("/patient", login);

export default router;
