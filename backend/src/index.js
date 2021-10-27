import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;
const HOST_NAME = process.env.HOST_NAME;
const { json } = express;
const app = express();

app.use(express.json());

app.use(cors());

app.use(json({ extended: false }));
app.use("/", (req, res) => {
	res.send("Server is Running");
});
app.listen(PORT, HOST_NAME, () => {
	console.log(`✨✨ Server running at http://${HOST_NAME}:${PORT}:`);
});
