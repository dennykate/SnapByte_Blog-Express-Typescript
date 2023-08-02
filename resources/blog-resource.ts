import { ResponseBlogProps } from "../types";

class BlogResource {
  public data: ResponseBlogProps = {};

  constructor(blog: ResponseBlogProps = {}) {
    this.data = blog;
  }

  public show() {
    return {
      title: this.data.title,
      slug: this.data.slug,
      description: this.data.description,
      thumbnail: this.data.thumbnail,
      upload_by: this.data.upload_by,
      created_at: this.data.created_at,
      views: this.data.views,
      likes: this.data.likes?.length,
    };
  }

  private showAll(blog: ResponseBlogProps) {
    return {
      title: blog.title,
      slug: blog.slug,
      description: blog.description,
      thumbnail: blog.thumbnail,
      upload_by: blog.upload_by,
      created_at: blog.created_at,
      views: blog.views,
      likes: blog.likes?.length,
    };
  }

  public update() {
    return this.showAll(this.data);
  }

  public all(blogs: ResponseBlogProps[]) {
    return blogs.map((blog) => this.showAll(blog));
  }
}

export default BlogResource;
