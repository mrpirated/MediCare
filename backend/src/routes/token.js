import { Router } from "express";
const router = Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import videoToken from "../controllers/videoToken";
dotenv.config();
router.post("/token", (req, res) => {
	const token = req.body.token;
	//console.log(req.headers);
	//console.log("called");
	//console.log(token);
	const user = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
		//console.log(decoded);
		if (err) {
			//console.log(err);
			return false;
		}
		//console.log(decoded);
		return decoded;
	});
	//console.log(user);
	if (!user) {
		res.status(201).send("not-verified");
	} else res.status(200).send(user);
});

router.get("/video/token", (req, res) => {
	const identity = req.query.identity;
	const room = req.query.room;
	const token = videoToken(identity, room);
	res.send({
		token: token.toJwt(),
	});
});
router.post("/video/token", (req, res) => {
	console.log("here");
	const identity = req.body.identity;
	const room = req.body.room;
	const token = videoToken(identity, room);
	console.log(token);
	res.send({
		token: token.toJwt(),
	});
});
export default router;
