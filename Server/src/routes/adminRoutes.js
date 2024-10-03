import { Router } from "express";
import { getTasksForAdmin } from "../controllers/taskController.js";
import { category, role } from "../controllers/adminController.js";

const routes = Router();

// create category
routes.post("/category", category);

// get all tasks of user
routes.post("/role", role);

// get all tasks of user
routes.get("/allTasks", getTasksForAdmin);

export default routes;
