import { validationResult } from "express-validator";
import { Request, Response } from "express";

import Blog from "../models/blog";
import {
  createSlug,
  getCurrentTime,
  returnErrorMessage,
  returnSuccessMessage,
} from "../utils/functions";
import { BlogProps, ResponseBlogProps } from "../types";
import BlogResource from "../resources/blog-resource";

export const store = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return returnErrorMessage(res, { errors: errors.array() });
  }

  try {
    const { title, description, thumbnail, upload_by }: BlogProps = req.body;
    const slug = createSlug(title);
    const created_at = getCurrentTime();

    const newBlog = await Blog.create({
      title,
      description,
      thumbnail,
      slug,
      upload_by,
      created_at,
    });

    const blogResource = new BlogResource(newBlog);

    return returnSuccessMessage(res, {
      data: blogResource.show(),
      message: "blog is created successfully",
    });
  } catch (error) {
    return returnErrorMessage(res, { message: "fail to create blog" });
  }
};

export const index = async (req: Request, res: Response) => {
  const options = req.query;

  const filter = (options.filter as object | undefined) || {};
  const page = (options.page as number | undefined) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const search = (options.search as string | undefined) || "";

  try {
    let totalBlogs;
    let blogs = [];

    if (search) {
      totalBlogs = await Blog.find({
        $or: [
          {
            title: { $regex: search, $options: "i" },
          },
          {
            description: { $regex: search, $options: "i" },
          },
        ],
      });
      blogs = await Blog.find({
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
    } else {
      totalBlogs = await Blog.find();
      blogs = await Blog.find(filter).sort({ _id: -1 }).skip(skip).limit(limit);
    }

    const blogResource = new BlogResource();

    return returnSuccessMessage(res, {
      meta: {
        filter,
        page,
        limit,
        skip,
        total: totalBlogs.length,
      },
      data: blogResource.all(blogs),
    });
  } catch (error) {
    return returnErrorMessage(res, { message: "server error" }, 500);
  }
};

export const show = async (req: Request, res: Response) => {
  const slug = req.params.slug;

  const blog: ResponseBlogProps | null = await Blog.findOne({ slug });
  if (!blog) {
    return returnErrorMessage(res, { message: "not found" });
  }

  const views = blog.views == undefined ? 0 : blog.views + 1;
  await Blog.findOneAndUpdate({ slug }, { views: views + 1 }, { new: true });
  const blogResource = new BlogResource(blog);

  return returnSuccessMessage(res, { data: blogResource.show() });
};

export const update = async (req: Request, res: Response) => {
  const slug = req.params.slug;

  const isExistedBlog: ResponseBlogProps | null = await Blog.findOne({ slug });
  if (!isExistedBlog) {
    return returnErrorMessage(res, { message: "not found" });
  }

  try {
    const blog: any = await Blog.findOneAndUpdate({ slug }, req.body, {
      new: true,
    });

    const blogResource = new BlogResource(blog);

    return returnSuccessMessage(res, {
      message: "blog is successfully updated",
      data: blogResource.update(),
    });
  } catch (error) {
    return returnErrorMessage(res, { message: "fail to update" });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const slug = req.params.slug;

  const isExistedBlog: ResponseBlogProps | null = await Blog.findOne({ slug });
  if (!isExistedBlog) {
    return returnErrorMessage(res, { message: "not found" }, 400);
  }

  try {
    await Blog.findOneAndDelete({ slug });

    return returnSuccessMessage(res, {
      message: "blog is successfully deleted",
    });
  } catch (error) {
    return returnErrorMessage(res, { message: "fail to delete" }, 500);
  }
};

export const related = async (req: Request, res: Response) => {
  const relatedBlogs = await Blog.find().sort({ _id: -1 }).limit(3);

  const blogResource = new BlogResource(relatedBlogs[0]);
  return returnSuccessMessage(res, {
    data: blogResource.all(relatedBlogs),
  });
};

export const like = async (req: Request, res: Response) => {
  const { slug, user } = req.body;

  const blog: ResponseBlogProps | null = await Blog.findOne({ slug });
  if (!blog) {
    return returnErrorMessage(res, { message: "not found" }, 400);
  }

  try {
    const likes = blog.likes ? [...blog.likes, user.id] : [];
    await Blog.findOneAndUpdate(
      { slug },
      {
        likes,
      },
      { new: true }
    );

    return returnSuccessMessage(
      res,
      { message: "Blog is successfully liked" },
      201
    );
  } catch (error) {
    return returnErrorMessage(res, { message: "fail to like" });
  }
};
