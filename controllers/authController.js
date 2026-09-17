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
};

export default authController;
