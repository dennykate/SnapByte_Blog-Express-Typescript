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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.SECRET;
class AuthMiddleware {
    constructor(request) {
        this.token = "";
        this.user = {};
        const header = request.headers["authorization"];
        if (!header)
            return;
        const [type, token] = header.split(" ");
        if (type !== "Bearer")
            return;
        this.token = token;
    }
    getToken(request) {
        const header = request.headers["authorization"];
        if (!header)
            return undefined;
        const [type, token] = header.split(" ");
        if (type !== "Bearer")
            return undefined;
        return token;
    }
    isAuthenticatedUser() {
        return jsonwebtoken_1.default.verify(this.token, SECRET, (err, data) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return undefined;
            }
            this.user = data;
            return data;
        }));
    }
    isAuthorizedUser(id) {
        if (id == this.user.id)
            return true;
        else
            return false;
    }
}
exports.default = AuthMiddleware;
