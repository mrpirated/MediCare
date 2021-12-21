import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql";
import dbg from "debug";
const debug = dbg("database");
const connection = mysql.createConnection({
	host: process.env.DB_HOSTNAME,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
	database: "medicare",
});

connection.connect(function (err) {
	if (err) {
		debug("Database connection failed: " + err.stack);
		return;
	}

	debug("Connected to database.");
});

export default connection;
