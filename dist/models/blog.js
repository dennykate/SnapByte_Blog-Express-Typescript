"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BlogSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    upload_by: {
        type: Object,
        required: true,
    },
    created_at: {
        type: String,
        required: true,
    },
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
