import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTaskForUser,
  getTasksForUser,
  updateTask,
} from "../controllers/taskController.js";
const routes = Router();

// create new task
routes.post("/", createTask);

// get all tasks for user
routes.get("/", getTasksForUser);

// get single task by id
routes.get("/:id", getTaskForUser);

// delete task by id
routes.delete("/:id", deleteTask);

// update task by id
routes.patch("/:id", updateTask);

export default routes;
