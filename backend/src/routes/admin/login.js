import { Router } from "express";
const router = Router();

import { check } from "express-validator";

import dotenv from "dotenv";
dotenv.config();
import login from "../../controllers/admin/login";

router.post(
	"/login",
	[
		check("email", "Valid Email required").isEmail(),
		check("password", "Please enter a valid password").isLength({
			min: 6,
		}),
	],
	login
);

export default router;
