import { Request } from "express";

const getToken = (request: Request) => {
	const authHeader = request.headers.authorization;
	const token = authHeader!.split(" ")[1];

	return token;
};

export { getToken };
