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
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
class BlogResource {
    constructor(blog = {}, req) {
        this.data = {};
        this.req = "";
        this.user = {};
        this.data = blog;
        this.req = req;
    }
    show() {
        return this.showData(this.data);
    }
    update() {
        return this.showData(this.data);
    }
    all(blogs) {
        return blogs.map((blog) => this.showData(blog));
    }
    showData(data) {
        var _a;
        return {
            title: data.title,
            slug: data.slug,
            description: data.description,
            thumbnail: data.thumbnail,
            upload_by: data.upload_by,
            created_at: data.created_at,
            views: data.views,
            likes: (_a = data.likes) === null || _a === void 0 ? void 0 : _a.length,
            isLikedUser: this.islikedUser(data.likes),
        };
    }
    setLikedUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const Auth = new AuthMiddleware_1.default(this.req);
            const user = yield Auth.isAuthenticatedUser();
            this.user = user;
        });
    }
    islikedUser(likes = []) {
        const isExist = likes.find((like) => {
            if (like)
                return like == this.user.id;
            else
                return false;
        });
        return isExist ? true : false;
    }
}
exports.default = BlogResource;
