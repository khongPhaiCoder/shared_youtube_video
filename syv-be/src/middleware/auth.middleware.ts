import { body } from "express-validator";

const bodySignUpValidation = [
  body("username")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long!"),
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email!")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long!"),
];

const bodyLogInValidation = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email!")
    .normalizeEmail(),
  body("password").isString().withMessage("Password is required!"),
];

const bodyRefreshAccessTokenValidation = [
  body("_id").isMongoId().withMessage("User id is required!"),
];

const bodyLogOutValidation = [
  body("_id").isMongoId().withMessage("User id is required!"),
];

export default {
  bodySignUpValidation,
  bodyLogInValidation,
  bodyRefreshAccessTokenValidation,
  bodyLogOutValidation,
};
