import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
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

const Blog = mongoose.model("blog", BlogSchema);

export default Blog;
