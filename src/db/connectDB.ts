import mongoose from "mongoose";
import { config } from "dotenv";

config();

export class connectDB {
	async conn() {
		mongoose.set("strict", true);
		await mongoose
			.connect(
				`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sgy1ws4.mongodb.net/reRegistration?retryWrites=true&w=majority`,
			)
			.then(() => {
				console.log("Conectou ao banco de dados");
			})
			.catch((error) => {
				console.log(error);
			});
	}
}
