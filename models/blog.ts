import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
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

const Blog = mongoose.model("blog", BlogSchema);

export default Blog;
