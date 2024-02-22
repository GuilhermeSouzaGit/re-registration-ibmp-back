import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
			default: "membro",
		},
	},
	{ timestamps: true },
);

const User = mongoose.model("User", UserSchema);

export { User };
