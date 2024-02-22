import { Router } from "express";
import { MemberRoute } from "./Members.routes";
import { UserRoutes } from "./User.routes";
import { statusRouter } from "./Status.routes";

const routes = Router();

routes.use("/api/status/", statusRouter);
routes.use("/api/members/", MemberRoute);
routes.use("/api/user/", UserRoutes);

export { routes };
