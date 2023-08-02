"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const blog_1 = __importDefault(require("./routes/blog"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/blog", blog_1.default);
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "server is running",
        success: true,
    });
});
mongoose_1.default.connect(MONGO_URL).then(() => {
    console.log("mongodb connected");
    app.listen(PORT, () => {
        console.log(`server running at port ${PORT}`);
    });
});
