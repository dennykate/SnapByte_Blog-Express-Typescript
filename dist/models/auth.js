"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AuthSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    password_confirmation: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: true,
    },
});
const Auth = mongoose_1.default.model("auth", AuthSchema);
exports.default = Auth;
