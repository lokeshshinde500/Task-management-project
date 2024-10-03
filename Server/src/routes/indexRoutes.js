import { Router } from "express";
import authRoutes from "./authRoutes.js";
import taskRoutes from "./taskRoutes.js";
import adminRoutes from "./adminRoutes.js";
import { authenticate, isAdmin } from "../middleware/authenticate.js";
const routes = Router();

// auth routes
routes.use("/auth", authRoutes);

// auth routes
routes.use("/admin", authenticate, isAdmin, adminRoutes);

// task routes
routes.use("/task", authenticate, taskRoutes);

export default routes;
