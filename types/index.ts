import { ObjectId } from "mongodb";
import { type } from "os";

export interface UploadByProps {
  name: string;
  email: string;
  profile: string;
  id: string;
}

export interface BlogProps {
  title: string;
  description: string;
  thumbnail: string;
  upload_by: UploadByProps;
}

export interface ResponseBlogProps {
  _id?: ObjectId;
  title?: string;
  description?: string;
  thumbnail?: string;
  slug?: string;
  upload_by?: UploadByProps;
  __v?: number;
  created_at?: string;
  views?: number;
  likes?: string[];
}

export interface ResponseUserProps {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  profile?: string;
  __v?: string;
}
