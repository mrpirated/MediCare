import { Router } from "express";
const router = Router();
import { check, validationResult } from "express-validator";
import connection from "../../dbconn/db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {signup, verify} from "../../controllers/patient/signup";

dotenv.config();
const bcrypt = require("bcrypt");
router.post(
	"/signup",
	signup
);

router.post(
	"/verify",
	verify
);

export default router;
