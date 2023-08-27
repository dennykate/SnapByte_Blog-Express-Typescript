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
exports.profile = exports.dislike = exports.like = exports.related = exports.destroy = exports.update = exports.show = exports.index = exports.store = void 0;
const express_validator_1 = require("express-validator");
const blog_1 = __importDefault(require("../models/blog"));
const functions_1 = require("../utils/functions");
const blog_resource_1 = __importDefault(require("../resources/blog-resource"));
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return (0, functions_1.returnErrorMessage)(res, { errors: errors.array() });
    }
    try {
        const { title, description, thumbnail, upload_by } = req.body;
        const slug = (0, functions_1.createSlug)(title);
        const created_at = (0, functions_1.getCurrentTime)();
        const newBlog = yield blog_1.default.create({
            title,
            description,
            thumbnail,
            slug,
            upload_by,
            created_at,
        });
        const blogResource = new blog_resource_1.default(newBlog, req);
        return (0, functions_1.returnSuccessMessage)(res, {
            data: blogResource.show(),
            message: "blog is created successfully",
        });
    }
    catch (error) {
        return (0, functions_1.returnErrorMessage)(res, { message: "fail to create blog" });
    }
});
exports.store = store;
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = req.query;
    const filter = options.filter || {};
    const page = options.page || 1;
    const limit = 9;
    const skip = (page - 1) * limit;
    const search = options.search || "";
    try {
        let totalBlogs;
        let blogs = [];
        if (search) {
            totalBlogs = yield blog_1.default.find({
                $or: [
                    {
                        title: { $regex: search, $options: "i" },
                    },
                    {
                        description: { $regex: search, $options: "i" },
                    },
                ],
            });
            blogs = yield blog_1.default.find({
                $or: [
                    {
                        title: { $regex: search, $options: "i" },
                    },
                    {
                        description: { $regex: search, $options: "i" },
                    },
                ],
            })
                .sort({ _id: -1 })
                .skip(skip)
                .limit(limit);
        }
        else {
            totalBlogs = yield blog_1.default.find();
            blogs = yield blog_1.default.find(filter).sort({ _id: -1 }).skip(skip).limit(limit);
        }
        const blogResource = new blog_resource_1.default({}, req);
        yield blogResource.setLikedUser();
        return (0, functions_1.returnSuccessMessage)(res, {
            meta: {
                filter,
                page,
                limit,
                skip,
                total: totalBlogs.length,
            },
            data: blogResource.all(blogs),
        });
    }
    catch (error) {
        return (0, functions_1.returnErrorMessage)(res, { message: "server error" }, 500);
    }
});
exports.index = index;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const blog = yield blog_1.default.findOne({ slug });
    if (!blog) {
        return (0, functions_1.returnErrorMessage)(res, { message: "not found" });
    }
    const views = blog.views == undefined ? 0 : blog.views + 1;
    yield blog_1.default.findOneAndUpdate({ slug }, { views: views + 1 }, { new: true });
    const blogResource = new blog_resource_1.default(blog, req);
    yield blogResource.setLikedUser();
    return (0, functions_1.returnSuccessMessage)(res, { data: blogResource.show() });
});
exports.show = show;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const isExistedBlog = yield blog_1.default.findOne({ slug });
    if (!isExistedBlog) {
        return (0, functions_1.returnErrorMessage)(res, { message: "not found" });
    }
    try {
        const blog = yield blog_1.default.findOneAndUpdate({ slug }, req.body, {
            new: true,
        });
        const blogResource = new blog_resource_1.default(blog, req);
        return (0, functions_1.returnSuccessMessage)(res, {
            message: "blog is successfully updated",
            data: blogResource.update(),
        });
    }
    catch (error) {
        return (0, functions_1.returnErrorMessage)(res, { message: "fail to update" });
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const slug = req.params.slug;
    const isExistedBlog = yield blog_1.default.findOne({ slug });
    if (!isExistedBlog) {
        return (0, functions_1.returnErrorMessage)(res, { message: "not found" }, 400);
    }
    const Auth = new AuthMiddleware_1.default(req);
    const user = yield Auth.isAuthenticatedUser();
    const isAuthorizedUser = Auth.isAuthorizedUser((_a = isExistedBlog.upload_by) === null || _a === void 0 ? void 0 : _a.id);
    if (!isAuthorizedUser) {
        return (0, functions_1.returnErrorMessage)(res, { message: "you're unauthorized" }, 400);
    }
    try {
        yield blog_1.default.findOneAndDelete({ slug });
        return (0, functions_1.returnSuccessMessage)(res, {
            message: "blog is successfully deleted",
        });
    }
    catch (error) {
        return (0, functions_1.returnErrorMessage)(res, { message: "fail to delete" }, 500);
    }
});
exports.destroy = destroy;
const related = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const relatedBlogs = yield blog_1.default.find().sort({ _id: -1 }).limit(3);
    const blogResource = new blog_resource_1.default({}, req);
    yield blogResource.setLikedUser();
    return (0, functions_1.returnSuccessMessage)(res, {
        data: blogResource.all(relatedBlogs),
    });
});
exports.related = related;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.body;
    const Auth = new AuthMiddleware_1.default(req);
    const user = yield Auth.isAuthenticatedUser();
    const blog = yield blog_1.default.findOne({ slug });
    if (!blog) {
        return (0, functions_1.returnErrorMessage)(res, { message: "blog not found" }, 400);
    }
    try {
        const likes = blog.likes ? [...blog.likes, user.id] : [];
        yield blog_1.default.findOneAndUpdate({ slug }, {
            likes,
        }, { new: true });
        return (0, functions_1.returnSuccessMessage)(res, { message: "blog is successfully liked" }, 201);
    }
    catch (error) {
        return (0, functions_1.returnErrorMessage)(res, { message: "fail to like" });
    }
});
exports.like = like;
const dislike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { slug } = req.body;
    const Auth = new AuthMiddleware_1.default(req);
    const user = yield Auth.isAuthenticatedUser();
    const blog = yield blog_1.default.findOne({ slug });
    if (!blog) {
        return (0, functions_1.returnErrorMessage)(res, { message: "blog not found" }, 400);
    }
    try {
        const likes = blog.likes
            ? (_b = blog.likes) === null || _b === void 0 ? void 0 : _b.filter((like) => like.toString() != user.id)
            : [];
        yield blog_1.default.findOneAndUpdate({ slug }, {
            likes,
        }, { new: true });
        return (0, functions_1.returnSuccessMessage)(res, { message: "blog is successfully disliked" }, 201);
    }
    catch (error) {
        return (0, functions_1.returnErrorMessage)(res, { message: "fail to like" });
    }
});
exports.dislike = dislike;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const options = req.query;
    const page = options.page || 1;
    const limit = 9;
    const skip = (page - 1) * limit;
    try {
        const totalBlogs = yield blog_1.default.find({
            "upload_by.id": id,
        });
        const blogs = yield blog_1.default.find({
            "upload_by.id": id,
        })
            .skip(skip)
            .limit(limit);
        const blogResource = new blog_resource_1.default({}, req);
        return (0, functions_1.returnSuccessMessage)(res, {
            meta: { total: totalBlogs.length, page, limit, skip },
            data: blogResource.all(blogs),
        });
    }
    catch (error) {
        return (0, functions_1.returnErrorMessage)(res, { message: "server error" }, 500);
    }
});
exports.profile = profile;
