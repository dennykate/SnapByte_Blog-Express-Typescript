import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  password_confirmation: String,
  profile: String,
});

const Auth = mongoose.model("auth", AuthSchema);

export default Auth;
