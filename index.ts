import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import AuthRoutes from "./routes/auth";
import BlogRoutes from "./routes/blog";

dotenv.config();

const app: Express = express();
const MONGO_URL: string = process.env.MONGO_URL as string;
const PORT: string = process.env.PORT as string;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/blog", BlogRoutes);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "server is running",
    success: true,
  });
});

mongoose.connect(MONGO_URL).then(() => {
  console.log("mongodb connected");
  app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
  });
});
