import { Router } from "express";
const router = Router();
import connection from "../../dbconn/db";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import login_doctor from "../../controllers/doctor/login";
const bcrypt = require("bcrypt");

router.post(
	"/login",
	[
		check("email", "Valid Email required").isEmail(),
		check("password", "Please enter a valid password").isLength({
			min: 6,
		}),
	],
	login_doctor
);

export default router;
