import { Router } from "express";
import { MemberRoute } from "./Members.routes";
import { AdminRoute } from "./Admin.routes";
import { statusRouter } from "./Status.routes";

const routes = Router();

routes.use("/api/status/", statusRouter);
routes.use("/api/members/", MemberRoute);
routes.use("/api/user/", AdminRoute);

export { routes };
