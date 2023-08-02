"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const blog_1 = require("../controllers/blog");
const router = express_1.default.Router();
router.post("/", [
    (0, express_validator_1.body)("title").notEmpty().withMessage("title is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("description is required"),
    (0, express_validator_1.body)("thumbnail").notEmpty().withMessage("thumbnail is required"),
    (0, express_validator_1.body)("upload_by").notEmpty().withMessage("user is required"),
], blog_1.store);
router.get("/", blog_1.index);
router.get("/detail/:slug", blog_1.show);
router.get("/related", blog_1.related);
router.put("/:slug", blog_1.update);
router.delete("/:slug", blog_1.destroy);
router.post("/like", [
    (0, express_validator_1.body)("slug").notEmpty().withMessage("slug is required"),
    (0, express_validator_1.body)("user").notEmpty().withMessage("user is required"),
], blog_1.like);
exports.default = router;
