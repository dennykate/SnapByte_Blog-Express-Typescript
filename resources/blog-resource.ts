import AuthMiddleware from "../middlewares/AuthMiddleware";
import { Request } from "express";
import { ResponseBlogProps, ResponseUserProps } from "../types";
import { ObjectId } from "mongoose";

class BlogResource {
  protected data: ResponseBlogProps = {};
  protected req: Request | any = "";
  protected user: ResponseUserProps = {};

  constructor(blog: ResponseBlogProps = {}, req: Request) {
    this.data = blog;
    this.req = req;
  }

  public show() {
    return this.showData(this.data);
  }

  public update() {
    return this.showData(this.data);
  }

  public all(blogs: ResponseBlogProps[]) {
    return blogs.map((blog) => this.showData(blog));
  }

  private showData(data: ResponseBlogProps) {
    return {
      title: data.title,
      slug: data.slug,
      description: data.description,
      thumbnail: data.thumbnail,
      upload_by: data.upload_by,
      created_at: data.created_at,
      views: data.views,
      likes: data.likes?.length,
      isLikedUser: this.islikedUser(data.likes),
    };
  }

  public async setLikedUser() {
    const Auth = new AuthMiddleware(this.req);
    const user = await Auth.isAuthenticatedUser();

    this.user = user;
  }

  private islikedUser(likes: string[] = []) {
    const isExist = likes.find((like) => {
      if (like) return like.toString() == this.user._id?.toString();
      else return false;
    });

    return isExist ? true : false;
  }
}

export default BlogResource;
