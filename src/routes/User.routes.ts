import { Router } from "express";
import { UserControllers } from "../controllers/User.controller";
import { verifyAuthToken } from "../middlewares/verifyAuthToken";
import { imageUpload } from "../helpers/imageUpload";

const UserRoutes = Router();

const fileUpload = imageUpload();

const UserController = new UserControllers();

UserRoutes.post("/login", UserController.login);
UserRoutes.post("/register", UserController.register);
UserRoutes.get("/get-all-users", verifyAuthToken, UserController.getAllUsers);
UserRoutes.patch(
	"/change-role/:id",
	verifyAuthToken,
	UserController.changeRole,
);

UserRoutes.post(
	"/upload-excel-data",
	verifyAuthToken,
	fileUpload.single("file"),
	UserController.uploadSpreadsheetData,
);

export { UserRoutes };
