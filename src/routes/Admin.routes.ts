import { Router } from "express";
import { AdminControllers } from "../controllers/Admin.controller";

const AdminRoute = Router();

const AdminController = new AdminControllers();

AdminRoute.post("/login", AdminController.login);
AdminRoute.post("/register", AdminController.register);

export { AdminRoute };
