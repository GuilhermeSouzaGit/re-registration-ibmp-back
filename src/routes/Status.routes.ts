import { Request, Response, Router } from "express";

const statusRouter = Router();

statusRouter.get("/", (request: Request, response: Response) => {
	response.status(200).json("server running!");
});

export { statusRouter };
