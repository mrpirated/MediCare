import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import patient from "./routes/patient/patient";
import doctor from "./routes/doctor/doctor";
import dbg from "debug";
import connection from "./dbconn/db";
const debug = dbg("http");
import admin from "./routes/admin/admin";
// console.log(process.env);
const PORT = process.env.PORT;
const HOST_NAME = process.env.HOST_NAME;
const { json } = express;
const app = express();

app.use(express.json());

app.use(cors());

app.use(json({ extended: false }));

app.use("/api", patient, doctor, admin);
app.use("/", (req, res) => {
	res.send("Server is Running");
});
app.listen(PORT, HOST_NAME, () => {
	debug(`✨✨ Server running at http://${HOST_NAME}:${PORT}:`);
});
