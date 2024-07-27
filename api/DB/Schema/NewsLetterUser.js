import mongoose, { Schema, Types, model } from "mongoose";
const NewsLetterUserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const NewsLetterUser =
  mongoose.models.NewsLetterUser ||
  model("NewsLetterUser", NewsLetterUserSchema);
export default NewsLetterUser;
