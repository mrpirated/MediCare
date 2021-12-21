import { Router } from "express";
import { check } from "express-validator";
const router = Router();
import login from "../../controllers/patient/login";
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
