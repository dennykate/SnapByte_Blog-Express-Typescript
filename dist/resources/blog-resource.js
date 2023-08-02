"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BlogResource {
    constructor(blog = {}) {
        this.data = {};
        this.data = blog;
    }
    show() {
        var _a;
        return {
            title: this.data.title,
            slug: this.data.slug,
            description: this.data.description,
            thumbnail: this.data.thumbnail,
            upload_by: this.data.upload_by,
            created_at: this.data.created_at,
            views: this.data.views,
            likes: (_a = this.data.likes) === null || _a === void 0 ? void 0 : _a.length,
        };
    }
    showAll(blog) {
        var _a;
        return {
            title: blog.title,
            slug: blog.slug,
            description: blog.description,
            thumbnail: blog.thumbnail,
            upload_by: blog.upload_by,
            created_at: blog.created_at,
            views: blog.views,
            likes: (_a = blog.likes) === null || _a === void 0 ? void 0 : _a.length,
        };
    }
    update() {
        return this.showAll(this.data);
    }
    all(blogs) {
        return blogs.map((blog) => this.showAll(blog));
    }
}
exports.default = BlogResource;
