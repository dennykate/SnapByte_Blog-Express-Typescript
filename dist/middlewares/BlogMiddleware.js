"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthMiddleware_1 = __importDefault(require("./AuthMiddleware"));
const functions_1 = require("../utils/functions");
class BlogMiddleware {
    constructor() { }
    static isAuthenticatedUser(req, res, next) {
        const Auth = new AuthMiddleware_1.default(req);
        const user = Auth.isAuthenticatedUser();
        if (user == undefined)
            return (0, functions_1.returnErrorMessage)(res, { message: "you're unauthenticated" });
        else
            next();
    }
}
exports.default = BlogMiddleware;
