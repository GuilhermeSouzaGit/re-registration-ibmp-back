import { Router } from "express";
import { verifyAuthToken } from "../middlewares/verifyAuthToken";
import { MembersController } from "../controllers/Members.controller";
import { imageUpload } from "../helpers/imageUpload";

const MemberRoute = Router();

const MemberController = new MembersController();
const upload = imageUpload();

//Middlewares

MemberRoute.post(
	"/register",
	upload.single("image"),
	verifyAuthToken,
	MemberController.register,
);
MemberRoute.get(
	"/get-all-members",
	verifyAuthToken,
	MemberController.getAllMembers,
);

export { MemberRoute };
