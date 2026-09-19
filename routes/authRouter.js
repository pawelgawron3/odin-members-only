import { Router } from "express";
import passport from "passport";
import registerValidator from "../validators/authValidator.js";
import requireAuth from "../utils/requireAuth.js";
import authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/register", authController.getRegistrationForm);
authRouter.post("/register", registerValidator, authController.register);

authRouter.get("/login", authController.getLoginForm);
authRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "login",
    successRedirect: "/",
  }),
);

authRouter.post("/logout", authController.logout);

authRouter.post("/join", requireAuth, authController.joinClub);

authRouter.post("/become-admin", requireAuth, authController.becomeAdmin);

export default authRouter;
