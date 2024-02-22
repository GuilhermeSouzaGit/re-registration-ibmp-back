import express from "express";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import { connectDB } from "./db/connectDB";
import { routes } from "./routes";

config();

const app = express();

app.use(cors({ credentials: true, origin: "*" }));

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
	secure: true,
});

app.use(express.json());
app.use(express.static("public"));
app.use(routes);

async function initializeServer() {
	try {
		const db = new connectDB();
		await db.conn();

		app.listen(process.env.PORT, () => {
			console.log(`Server started on port ${process.env.PORT}`);
		});
	} catch (error) {
		console.error("Erro ao inicializar o servidor:", error);
	}
}

initializeServer();
