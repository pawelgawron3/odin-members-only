import { Router } from "express";
import registerValidator from "../validators/authValidator.js";
import authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/register", authController.getRegistrationForm);
authRouter.post("/register", registerValidator, authController.register);

export default authRouter;
