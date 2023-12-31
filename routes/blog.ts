import express from "express";
import { body } from "express-validator";

import {
  destroy,
  dislike,
  index,
  like,
  related,
  show,
  store,
  update,
  profile,
} from "../controllers/blog";

const router = express.Router();

router.post(
  "/",
  [
    body("title").notEmpty().withMessage("title is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("thumbnail").notEmpty().withMessage("thumbnail is required"),
    body("upload_by").notEmpty().withMessage("user is required"),
  ],
  store
);
router.get("/", index);
router.get("/detail/:slug", show);
router.get("/profile/:id", profile);
router.get("/related", related);
router.put("/:slug", update);
router.delete("/:slug", destroy);
router.post(
  "/like",
  [body("slug").notEmpty().withMessage("slug is required")],
  like
);
router.post(
  "/dislike",
  [body("slug").notEmpty().withMessage("slug is required")],
  dislike
);

export default router;
