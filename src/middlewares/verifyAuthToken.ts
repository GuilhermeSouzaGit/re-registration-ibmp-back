import jwt from "jsonwebtoken";
import { getToken } from "../helpers/getToken";
import { NextFunction, Request, Response } from "express";

interface TokenPayload {
	id: string;
	iat: number;
}

const verifyAuthToken = (
	request: Request,
	response: Response,
	next: NextFunction,
) => {
	if (!request.headers.authorization) {
		return response.status(401).json({ message: "Acesso Negado!" });
	}

	const token = getToken(request);

	if (!token) {
		return response.status(401).json({ message: "Acesso Negado!" });
	}

	try {
		const verified = jwt.verify(token, `${process.env.JWT_SECRET}`);

		const { id } = verified as TokenPayload;

		request.userId = id;
		next();
	} catch (error) {
		return response.status(400).json({ message: "Token inválido!" });
	}
};

export { verifyAuthToken };
