import { Router } from "express";
import passport from "passport";
import registerValidator from "../validators/authValidator.js";
import authController from "../controllers/authController.js";

const authRouter = Router();

function requireAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/login");
  }

  next();
}

authRouter.get("/register", authController.getRegistrationForm);
authRouter.post("/register", registerValidator, authController.register);

authRouter.get("/login", authController.getLoginForm);
authRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "auth/login",
    successRedirect: "/",
  }),
);

authRouter.post("/logout", authController.logout);

authRouter.post("/join", requireAuth, authController.joinClub);

export default authRouter;
