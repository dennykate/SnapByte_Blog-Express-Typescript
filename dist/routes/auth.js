"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const router = express_1.default.Router();
router.post("/register", [
    (0, express_validator_1.body)("name").notEmpty().withMessage("name is required"),
    (0, express_validator_1.body)("email").notEmpty().withMessage("email is required"),
    (0, express_validator_1.body)("profile").notEmpty().withMessage("profile is required"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 8, max: 20 })
        .withMessage("password must greater than 8 characters & less than 20 characters"),
    (0, express_validator_1.body)("password_confirmation")
        .notEmpty()
        .withMessage("password_confirmation is required"),
], auth_1.register);
router.post("/login", [
    (0, express_validator_1.body)("email").notEmpty().withMessage("email is required"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 8, max: 20 })
        .withMessage("password must greater than 8 characters & less than 20 characters"),
], auth_1.login);
exports.default = router;
