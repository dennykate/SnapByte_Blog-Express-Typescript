import express from "express";
import { body } from "express-validator";

import { login, register } from "../controllers/auth";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("name is required"),
    body("email").notEmpty().withMessage("email is required"),
    body("profile").notEmpty().withMessage("profile is required"),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8, max: 20 })
      .withMessage(
        "password must greater than 8 characters & less than 20 characters"
      ),
    body("password_confirmation")
      .notEmpty()
      .withMessage("password_confirmation is required"),
  ],
  register
);
router.post(
  "/login",
  [
    body("email").notEmpty().withMessage("email is required"),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8, max: 20 })
      .withMessage(
        "password must greater than 8 characters & less than 20 characters"
      ),
  ],
  login
);

export default router;
