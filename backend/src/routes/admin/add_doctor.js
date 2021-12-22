import { Router } from "express";
const router = Router();
import { check, validationResult } from "express-validator";
import connection from "../../dbconn/db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import add_doctor from "../../controllers/admin/add_doctor";
dotenv.config();
const bcrypt = require("bcrypt");

router.post(
	"/add_doctor",
	[
		check("first_name", "Name is required").not().isEmpty(),
		check("email", "Valid Email required").isEmail(),
		check(
			"password",
			"Please enter a password with 6 or more characters"
		).isLength({
			min: 6,
		}),
	],
	add_doctor
);

export default router;