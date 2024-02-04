import mongoose from "mongoose";
const { Schema } = mongoose;

const MembersSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		dateOfBirth: {
			type: String,
			required: true,
		},
		memberPhoto: {
			type: String,
		},
		gender: {
			type: String,
			required: true,
		},
		address: {
			type: String,
		},
		phone: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: false,
		},
		maritalStatus: {
			type: String,
			required: true,
		},
		dateOfMarriage: {
			type: String,
			required: false,
		},
		baptismDate: {
			type: String,
			required: false,
		},
		socialMedia: {
			Facebook: {
				type: String,
				required: false,
			},
			Instagram: {
				type: String,
				required: false,
			},
			X: {
				type: String,
				required: false,
			},
			Whatsapp: {
				type: String,
				required: false,
			},
		},
		leavingDate: {
			type: String,
			required: false,
		},
		leavingReason: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true },
);

const Members = mongoose.model("Members", MembersSchema);

export { Members };
