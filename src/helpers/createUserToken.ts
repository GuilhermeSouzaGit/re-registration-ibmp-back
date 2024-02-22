import { config } from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../types/User";

config();

const createUserToken = async (
	user: IUser,
	request: Request,
	response: Response,
) => {
	const token = jwt.sign(
		{
			name: user.name,
			id: user._id,
			role: user.role,
		},
		`${process.env.JWT_SECRET}`,
	);

	response.status(200).json({
		message: "Você está autenticado",
		token: token,
		userId: user._id,
		role: user.role,
	});
};

export { createUserToken };
