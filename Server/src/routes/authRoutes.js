import { Router } from "express";
import {
  changePassword,
  login,
  register,
  resetPassword,
  sendOTP,
} from "../controllers/authController.js";
import { authenticate } from "../middleware/authenticate.js";
const routes = Router();

// register
routes.post("/register", register);

// login
routes.post("/login", login);

// change password
routes.post("/changePassword", authenticate, changePassword);

// reset or forgot password using nodeMailer
routes.post("/forgotPassword", sendOTP);

// reset or forgot password using nodeMailer
routes.post("/resetPassword", resetPassword);

export default routes;
