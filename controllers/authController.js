import { db } from "../db/queries.js";
import { validationResult } from "express-validator";
import { hashPassword } from "../utils/password.js";

const authController = {
  getRegistrationForm(req, res) {
    res.render("registration-form", { errors: [] });
  },

  async register(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("registration-form", {
        errors: errors.array(),
      });
    }

    const { firstname, lastname, username, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const user = {
      firstname,
      lastname,
      username,
      hashedPassword,
    };

    await db.registerNewAccount(user);

    res.redirect("/auth/login");
  },

  async getLoginForm(req, res) {
    res.render("login-form");
  },

  logout(req, res, next) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }

      res.redirect("/");
    });
  },

  async joinClub(req, res) {
    const userId = req.user.id;
    const { passcode } = req.body;

    if (passcode !== process.env.CLUB_PASSCODE) {
      return res.status(400).send("Invalid passcode");
    }

    await db.updateMembershipStatus(userId);

    res.redirect("/");
  },

  async becomeAdmin(req, res) {
    if (!req.user.membership_status) {
      return res.status(403).send("Membership required!");
    }

    const adminPasscode = req.body.adminPasscode;

    if (adminPasscode !== process.env.ADMIN_PASSCODE) {
      return res.status(403).send("Invalid admin passcode");
    }
    const userId = req.user.id;

    await db.makeUserAdmin(userId);

    res.redirect("/");
  },
};

export default authController;
