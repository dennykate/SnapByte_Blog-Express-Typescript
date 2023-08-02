import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  password_confirmation: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
});

const Auth = mongoose.model("auth", AuthSchema);

export default Auth;
