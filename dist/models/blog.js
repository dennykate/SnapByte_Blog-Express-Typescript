"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BlogSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    thumbnail: String,
    slug: String,
    upload_by: Object,
    created_at: String,
    likes: {
        type: Array,
        default: [],
    },
    views: {
        type: Number,
        default: 0,
    },
});
const Blog = mongoose_1.default.model("blog", BlogSchema);
exports.default = Blog;
