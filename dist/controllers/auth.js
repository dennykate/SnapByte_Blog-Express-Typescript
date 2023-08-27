"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../models/auth"));
const functions_1 = require("../utils/functions");
dotenv_1.default.config();
const SECRET = process.env.SECRET;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return (0, functions_1.returnErrorMessage)(res, { errors: errors.array() });
    }
    try {
        const { name, email, password, password_confirmation, profile } = req.body;
        if (password != password_confirmation) {
            return (0, functions_1.returnErrorMessage)(res, { message: "passwords doesn't match" });
        }
        const isExistEmail = yield auth_1.default.findOne({ email });
        if (isExistEmail) {
            return (0, functions_1.returnErrorMessage)(res, { message: "email  already taken" });
        }
        const hashedPassword = crypto_1.default
            .createHash("md5")
            .update(req.body.password)
            .digest("hex");
        yield auth_1.default.create({
            name,
            email,
            password: hashedPassword,
            profile,
        });
        return (0, functions_1.returnSuccessMessage)(res, { message: "register successful" }, 201);
    }
    catch (error) {
        return (0, functions_1.returnErrorMessage)(res, { message: "server error" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return (0, functions_1.returnErrorMessage)(res, { errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const hashedPassword = crypto_1.default
            .createHash("md5")
            .update(password)
            .digest("hex");
        const user = yield auth_1.default.findOne({ email, password: hashedPassword });
        if (!user) {
            return (0, functions_1.returnErrorMessage)(res, { message: "user not found" });
        }
        jsonwebtoken_1.default.sign({
            id: user._id,
            name: user.name,
            email: user.email,
            password: hashedPassword,
        }, SECRET, { expiresIn: 60 * 24 }, (err, token) => {
            if (err) {
                return (0, functions_1.returnErrorMessage)(res, { message: "user not found" });
            }
            return (0, functions_1.returnSuccessMessage)(res, {
                message: "login successful",
                token,
                user: {
                    name: user.name,
                    email: user.email,
                    profile: user.profile,
                    id: user._id,
                },
            }, 201);
        });
    }
    catch (error) {
        return (0, functions_1.returnErrorMessage)(res, { message: "server error" });
    }
});
exports.login = login;
