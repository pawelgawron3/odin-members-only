import { body } from "express-validator";

const registerValidator = [
  body("firstname")
    .trim()
    .notEmpty()
    .withMessage("Firstname is required.")
    .isLength({ max: 50 })
    .withMessage("Firstname cannot be longer than 50 characters."),

  body("lastname")
    .trim()
    .notEmpty()
    .withMessage("Lastname is required.")
    .isLength({ max: 50 })
    .withMessage("Lastname cannot be longer than 50 characters."),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ max: 100 })
    .withMessage("Username cannot be longer than 100 characters.")
    .isAlphanumeric()
    .withMessage("Username can only contain letters and numbers."),

  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Please confirm your password.")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Passwords do not match.");
      }

      return true;
    }),
];

export default registerValidator;
